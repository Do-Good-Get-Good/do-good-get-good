const { getStorage } = require("firebase-admin/storage");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const dateFns = require("date-fns");
const {
  createNotConfirmedWorksheet,
  createConfirmedWorksheet,
  createRegionWorksheet,
  createActivityWorksheet,
} = require("./worksheetFunctions");
const Excel = require("exceljs");

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL;

const PRECONDITION_ERROR_TYPE = [
  "NotAnAdminError",
  "InvalidRoleError",
  "NoTimeEntriesFound",
  "UndefinedDatePeriod",
];

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

class UndefinedDatePeriod extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "UndefinedDatePeriod";
  }
}

async function getAllDataFromCollection(collectionName) {
  let res = await getFirestore().collection(collectionName).get();
  if (!res.empty) {
    return res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}

async function getAllTimeEntriesByDate(datePeriod) {
  const { startDate, endDate } = datePeriod;

  const start = Timestamp.fromDate(new Date(startDate));
  const end = Timestamp.fromDate(new Date(endDate));

  let timeEntries = [];
  await getFirestore()
    .collection("timeentries")
    .orderBy("date", "asc")
    .where("date", ">=", start)
    .where("date", "<=", end)
    .get()
    .then((data) => {
      data.docs.map((doc) => {
        timeEntries.push({ id: doc.id, ...doc.data() });
      });
    });

  return timeEntries;
}

async function getAllDatabaseData(datePeriod) {
  if (!datePeriod)
    throw new UndefinedDatePeriod("Tidsperioden som angetts stöds ej!");

  let users = await getAllDataFromCollection("Users");
  let activities = await getAllDataFromCollection("Activities");
  let timeEntries = await getAllTimeEntriesByDate(datePeriod);

  return {
    activities: activities,
    timeEntries: timeEntries,
    users: users,
  };
}

function createExcelFile(excelData) {
  let workbook = new Excel.Workbook();

  createNotConfirmedWorksheet(workbook, excelData);
  createConfirmedWorksheet(workbook, excelData);
  createRegionWorksheet(workbook, excelData);
  createActivityWorksheet(workbook, excelData);

  return workbook;
}

async function saveExcelFileToCloudStorage(path, filename, excelWorkbook) {
  // Save excel file to firebase cloud storage
  const bucket = getStorage().bucket();
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

exports.downloadDataSecondGen = onCall(
  { region: "europe-north1" },
  async (request) => {
    try {
      //Checking that the user calling the Cloud Function is authenticated
      if (!request.auth) {
        throw new UnauthenticatedError("The user is not authenticated.");
      }

      const callerToken = request.auth.token;
      const data = request.data;

      if (!callerToken.superadmin) {
        throw new NotAnAdminError(
          "Only Super Admin users can call this function."
        );
      }

      const callerUid = request.auth.uid;
      const callerEmail = request.auth.token.email;
      const callerFullName = await getUserName(callerUid);

      const excelData = await getAllDatabaseData(data);

      const timeEntriesFound = excelData.timeEntries.length !== 0;

      if (!timeEntriesFound)
        throw new NoTimeEntriesFound(
          "Inga tidregistreringar hittades inom det valda tidspannet."
        );

      let excelDownloadURL;
      await createAndSaveExcelFile(excelData).then((res) => {
        excelDownloadURL = res[0];
        sendEmail(excelDownloadURL, callerFullName, callerEmail);
      });

      return {
        downloadURL: excelDownloadURL,
        message: "All användardata inom det valda tidsspannet har hämtats.",
      };
    } catch (error) {
      if (error.type === "UnauthenticatedError") {
        throw new HttpsError("unauthenticated", error.message);
      } else if (PRECONDITION_ERROR_TYPE.includes(error.type)) {
        throw new HttpsError("failed-precondition", error.message);
      } else {
        throw new HttpsError("internal", error.message);
      }
    }
  }
);

function sendEmail(downloadURL, recipientName, recipientEmail) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(SENDGRID_API_KEY);

  const msg = {
    to: recipientEmail,
    from: {
      name: "Do Good Get Good",
      email: SENDGRID_FROM_EMAIL,
    },
    templateId: "d-5fa6f6655a4f43bd9847a630badb4e2f",
    dynamicTemplateData: {
      name: recipientName,
      downloadUrl: downloadURL,
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

const getUserName = async (callerUid) =>
  await getFirestore()
    .collection("Users")
    .doc(callerUid)
    .get()
    .then((res) => {
      return `${res.data().first_name} ${res.data().last_name}`;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
