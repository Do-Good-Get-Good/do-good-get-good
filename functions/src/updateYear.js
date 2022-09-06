const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.updateYear = functions.pubsub
  .schedule("0 0 1 1 *")
  .onRun(async (context) => {
    await admin
      .firestore()
      .collection("Users")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          doc.ref.update({ total_hours_year: 0 });
        });
      });
    return console.log("Successful reset of time for year");
  });
