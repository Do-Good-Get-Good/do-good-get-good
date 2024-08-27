const { onSchedule } = require("firebase-functions/v2/scheduler");
const { getFirestore } = require("firebase-admin/firestore");

// onSchedule don't suport region europe-north1.  More info at README
exports.updateMonthSecondGen = onSchedule(
  { schedule: "0 0 1 * *", region: "europe-west1" },
  async (event) => {
    await getFirestore()
      .collection("Users")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          doc.ref.update({ total_confirmed_hours: 0, total_hours_month: 0 });
        });
      });
    return console.log("Successful reset of time for month and approvedtimes");
  }
);
