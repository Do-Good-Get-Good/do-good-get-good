const functions = require("firebase-functions");
const admin = require("firebase-admin");
const dateFns = require("date-fns");
const {
  createNotConfirmedWorksheet,
  createConfirmedWorksheet,
  createRegionWorksheet,
} = require("./worksheetFunctions");
const SENDGRID_API_KEY = functions.config().sendgrid.apikey;

class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "UnauthenticatedError";
  }
}

class NotAnAdminError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "NotAnAdminError";
  }
}

class NoTimeEntriesFound extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "NoTimeEntriesFound";
  }
}

async function getAllDataFromCollection(collectionName) {
  let res = await admin.firestore().collection(collectionName).get();
  if (!res.empty) {
    return res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}

async function getAllDataFromCollectionByDate(collectionName, datePeriod) {
  const { startDate, endDate } = datePeriod;

  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  const start = admin.firestore.Timestamp.fromDate(date1);
  const end = admin.firestore.Timestamp.fromDate(date2);

  let res = await admin
    .firestore()
    .collection(collectionName)
    .orderBy("date", "asc")
    .where("date", ">=", start)
    .where("date", "<=", end)
    .get();

  if (!res.empty) {
    return res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}

async function getAllDatabaseData(datePeriod) {
  let users = await getAllDataFromCollection("Users");
  let activities = await getAllDataFromCollection("Activities");
  let timeEntries = await getAllDataFromCollectionByDate(
    "timeentries",
    datePeriod
  );

  return {
    activities: activities,
    timeEntries: timeEntries,
    users: users,
  };
}

function createExcelFile(excelData) {
  const Excel = require("exceljs");

  var workbook = new Excel.Workbook();
  createNotConfirmedWorksheet(workbook, excelData);
  createConfirmedWorksheet(workbook, excelData);
  createRegionWorksheet(workbook, excelData);

  return workbook;
}

async function saveExcelFileToCloudStorage(path, filename, excelWorkbook) {
  // Save excel file to firebase cloud storage
  const storage = admin.storage();
  const bucket = storage.bucket();
  const storageFile = bucket.file(`${path}/${filename}`);
  const blobStream = storageFile.createWriteStream({
    contentType: "application/ms-excel",
  });

  await excelWorkbook.xlsx.write(blobStream);

  blobStream.end();

  const config = {
    action: "read",
    expires: new Date(new Date().getTime() + 1440 * 60000),
  };

  return await storageFile.getSignedUrl(config);
}

async function createAndSaveExcelFile(excelData) {
  var excelWorkbook = createExcelFile(excelData);
  const fileName = `DGGG-statistik-${dateFns.format(
    new Date(),
    "yyyy-MM-dd"
  )}.xlsx`;
  return await saveExcelFileToCloudStorage("excel", fileName, excelWorkbook);
}

function sendEmail(downloadURL, callerData) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(SENDGRID_API_KEY);

  const msg = {
    to: `${callerData.email}`,
    from: "dggg@technogarden.se",
    templateId: "d-6148a93915934ca9a0c4ed67a8e81416",
    dynamicTemplateData: {
      username: callerData.name,
      downloadURL: downloadURL,
    },
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error(error);
    });
}

exports.downloadData = functions.https.onCall(async (data, context) => {
  try {
    //Checking that the user calling the Cloud Function is authenticated
    if (!context.auth) {
      throw new UnauthenticatedError(
        "The user is not authenticated. Only authenticated Super Admin users can call this function."
      );
    }

    //Checking that the user calling the Cloud Function is an Admin user
    const callerUid = context.auth.uid; //uid of the user calling the Cloud Function

    const callerUserRecord = await admin.auth().getUser(callerUid);

    if (
      !callerUserRecord.customClaims.superadmin ||
      callerUserRecord.customClaims.admin ||
      callerUserRecord.customClaims.user
    ) {
      throw new NotAnAdminError(
        "Only Super Admin users can call this function."
      );
    }

    let callerName = await admin
      .firestore()
      .collection("Users")
      .doc(callerUid)
      .get()
      .then((res) => {
        return `${res.data().first_name} ${res.data().last_name}`;
      });

    let callerData = {
      name: callerName,
      email: callerUserRecord.email,
    };

    let excelData = await getAllDatabaseData(data);

    if (excelData.timeEntries === null || excelData.timeEntries === undefined) {
      throw new NoTimeEntriesFound(
        "Inga tidregistreringar hittades inom det valda tidspannet."
      );
    }

    let excelDownloadURL;
    await createAndSaveExcelFile(excelData).then((res) => {
      excelDownloadURL = res[0];
      sendEmail(excelDownloadURL, callerData);
    });

    return {
      downloadURL: excelDownloadURL,
      message:
        "All user data for the specified date period has been successfully downloaded.",
    };
  } catch (error) {
    if (error.type === "UnauthenticatedError") {
      throw new functions.https.HttpsError("unauthenticated", error.message);
    } else if (
      error.type === "NotAnAdminError" ||
      error.type === "InvalidRoleError" ||
      error.type === "NoTimeEntriesFound"
    ) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        error.message
      );
    } else {
      throw new functions.https.HttpsError("internal", error.message);
    }
  }
});
