const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.deletePostAfterOneYear = functions.pubsub
  .schedule("0 0 1 1,4,7,10 *")
  .onRun(async () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    try {
      await admin
        .firestore()
        .collection("UserPosts")
        .where("date", "<", oneYearAgo)
        .get()
        .then((snap) => {
          snap.forEach(async (doc) => {
            const fileName = doc
              .data()
              .image_url.split("/")
              .pop()
              .split("?")[0]
              .replace("chat-images%2F", "")
              .replace(".jpg", "");

            await admin
              .storage()
              .bucket()
              .deleteFiles({
                prefix: `chat-images/${fileName}`,
              });

            await doc.ref.delete();
          });
        });

      return console.log("Successful deleted posts that are older than 1 year");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  });
