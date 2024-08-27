const { onSchedule } = require("firebase-functions/v2/scheduler");
const { getFirestore } = require("firebase-admin/firestore");

// onSchedule don't suport region europe-north1.  More info at README
exports.updateYearSecondGen = onSchedule(
  { schedule: "0 0 1 1 *", region: "europe-west1" },
  async (event) => {
    try {
      await getFirestore()
        .collection("Users")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            doc.ref.update({ total_hours_year: 0 });
          });
        });
      return console.log("Successful reset of time for year");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
);
