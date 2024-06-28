const { onSchedule } = require("firebase-functions/v2/scheduler");
const { getFirestore } = require("firebase-admin/firestore");

// when you deploy onSchedul function, just comment awaty setGlobalOptions({ region: "europe-north1" }); at config file.  More info at README
exports.updateMonthSecondGen = onSchedule("0 0 1 * *", async (event) => {
  await getFirestore()
    .collection("Users")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        doc.ref.update({ total_confirmed_hours: 0, total_hours_month: 0 });
      });
    });
  return console.log("Successful reset of time for month and approvedtimes");
});
