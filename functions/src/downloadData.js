const functions = require("firebase-functions");
const admin = require("firebase-admin");
const dateFns = require("date-fns");

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

async function getAllDatabaseData() {
  let users;
  let activities;
  let timeEntries;

  await admin
    .firestore()
    .collection("Activities")
    .get()
    .then((res) => {
      activities = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

  await admin
    .firestore()
    .collection("Users")
    .get()
    .then((res) => {
      users = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

  await admin
    .firestore()
    .collection("timeentries")
    .get()
    .then((res) => {
      timeEntries = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

  return {
    activities: activities,
    timeEntries: timeEntries,
    users: users,
  };
}

function getMonthNames() {
  return [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ];
}

function createNotConfirmedWorksheet(workbook, excelData) {
  let { activities, timeEntries, users } = excelData;

  const worksheet = workbook.addWorksheet("Icke godkända");

  worksheet.columns = [
    { header: "Månad", key: "month", width: 10 },
    { header: "Admin", key: "admin", width: 20 },
    { header: "Användare", key: "user", width: 20 },
    { header: "Aktivitet", key: "activity", width: 20 },
    { header: "Stad", key: "city", width: 15 },
    { header: "Datum", key: "date", width: 15 },
    { header: "Tid (h)", key: "time", width: 10 },
  ];

  users.map((user) => {
    timeEntries.map((timeEntry) => {
      if (user.id === timeEntry.user_id) {
        let admin = users.filter((admin) => {
          if (admin.id === timeEntry.admin_id) {
            return admin;
          }
        });
        let activity = activities.filter((activity) => {
          if (activity.id === timeEntry.activity_id) {
            return activity;
          }
        });
        const months = getMonthNames();
        worksheet.addRow({
          month: months[dateFns.getMonth(timeEntry.date.toDate())],
          admin: `${admin[0].first_name} ${admin[0].last_name}`,
          user: `${user.first_name} ${user.last_name}`,
          activity: activity[0].activity_title,
          city: activity[0].activity_city,
          date: dateFns.format(timeEntry.date.toDate(), "yyyy-MM-dd"),
          time: timeEntry.time,
        });
      }
    });
  });
}

function createExcelFile(excelData) {
  const Excel = require("exceljs");

  var workbook = new Excel.Workbook();
  createNotConfirmedWorksheet(workbook, excelData);

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
    expires: new Date(new Date().getTime() + 30 * 60000),
  };

  return await storageFile.getSignedUrl(config);
}

async function createAndSaveExcelFile(excelData) {
  var excelWorkbook = createExcelFile(excelData);
  const fileName = `DGGG-statistik-${dateFns.format(new Date(), "yyyy-MM-dd")}`;
  return await saveExcelFileToCloudStorage("excel", fileName, excelWorkbook);
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

    let { activities, timeEntries, users } = await getAllDatabaseData();

    let excelData = {
      activities: activities,
      timeEntries: timeEntries,
      users: users,
    };

    let excelTestResponse;
    await createAndSaveExcelFile(excelData).then((res) => {
      excelTestResponse = res;
    });

    return {
      excel: excelTestResponse,
      message:
        "All user data for the specified date period has been successfully downloaded.",
    };
  } catch (error) {
    if (error.type === "UnauthenticatedError") {
      throw new functions.https.HttpsError("unauthenticated", error.message);
    } else if (
      error.type === "NotAnAdminError" ||
      error.type === "InvalidRoleError"
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
