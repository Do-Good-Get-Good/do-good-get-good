const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const { onSchedule } = require("firebase-functions/v2/scheduler");

const deleteImageInStore = async (imgPath) => {
  const imgFileName = await imgPath
    .split("/")
    .pop()
    .split("?")[0]
    .replace("chat-images%2F", "")
    .replace(".jpg", "");

  await getStorage()
    .bucket()
    .deleteFiles({
      prefix: `chat-images/${imgFileName}`,
    });
};

// onSchedule don't suport region europe-north1.  More info at README

exports.deletePostAfterOneYearSecondGen = onSchedule(
  { schedule: "0 0 1 1,4,7,10 *", region: "europe-west1" },

  async (event) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    try {
      await getFirestore()
        .collection("UserPosts")
        .where("date", "<", oneYearAgo)
        .get()
        .then((snap) => {
          snap.forEach(async (doc) => {
            const imgPath = doc.data().image_url;

            if (imgPath !== undefined) {
              deleteImageInStore(imgPath);
            }

            await doc.ref.delete();
          });
        });

      return console.log("Successful deleted posts that are older than 1 year");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
);
