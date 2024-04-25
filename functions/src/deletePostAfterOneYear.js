const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.deletePostAfterOneYear = functions.pubsub
  .schedule("0 0 1 1,4,7,10 *")
  // .schedule("* * * * *")
  .onRun(async () => {
    // const oneYearAgo = new Date();
    // oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const now = new Date();
    const oneYearAgo = new Date(now.getTime() - 2 * 60 * 1000);

    try {
      // await admin
      //   .firestore()
      //   .collection("UserPosts")
      //   .where("date", "<", oneYearAgo)
      //   .get()
      //   .then((snap) => {
      //     snap.forEach(async (doc) => {
      //       doc.ref.delete();
      //     });
      //   });

      // const files = await admin
      //   .storage()
      //   .bucket()
      //   .getFiles({ prefix: "//chat-images" });

      // const deletePromises = files
      //   .filter((file) => file.metadata.timeCreated > oneYearAgo)
      //   .map((file) => {
      //     console.log(file, " ----- file ");
      //     console.log(
      //       file.metadata.timeCreated,
      //       " ----- file.metadata.timeCreated  "
      //     );
      //     console.log(oneYearAgo, " ----- oneYearAgo ");
      //     file.delete();
      //   });

      // await Promise.all(deletePromises);

      return console.log("Successful deleted posts that are older than 1 year");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  });
// await admin
//   .storage()
//   .bucket()
//   .file(doc.imageURL)
//   .delete()
//   .then(async () => {
//     doc.ref.delete();
//   });
