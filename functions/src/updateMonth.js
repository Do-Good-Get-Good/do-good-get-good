const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.updateMonth = functions.pubsub
  .schedule("0 0 1 * *")
  .onRun(async (context) => {
    await admin
      .firestore()
      .collection("Users")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          doc.ref.update({ total_confirmed_hours: 0, total_hours_month: 0 });
        });
      });
    return console.log("Successful reset of time for month and approvedtimes");
  });
