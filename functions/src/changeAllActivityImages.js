const admin = require("firebase-admin");
const functions = require("firebase-functions");

async function getAllCollectionData(collection) {
  let response = await admin.firestore().collection(collection).get();
  return response.docs.map((doc) => ({ id: doc.id }));
}

async function changeToPlaceholderImage(activityIds) {
  return Promise.all(
    activityIds.map((id) => {
      return new Promise(async (res) => {
        try {
          await admin.firestore().collection("Activities").doc(id).update({
            activity_photo: "placeholder",
          });
          res(true);
        } catch (error) {
          console.log(error);
          res(false);
        }
      });
    })
  );
}

exports.changeAllActivityImages = functions.firestore
  .document("temp/{tempId}")
  .onCreate(async (snap, context) => {
    let activities = await getAllCollectionData("Activities");
    let activityIds = [];

    activities.map((activity) => activityIds.push(activity.id));

    await changeToPlaceholderImage(activityIds);
  });
