const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.deletePostAfterOneYear = functions.pubsub
  .schedule("0 0 1 1,4,7,10 *")
  .onRun(async (context) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    console.log(oneYearAgo);
    try {
      await admin
        .firestore()
        .collection("UserPosts")
        .where("date", "<", oneYearAgo)
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            doc.ref.delete();
          });
        });
      return console.log("Successful deleted posts that are older than 1 year");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  });
