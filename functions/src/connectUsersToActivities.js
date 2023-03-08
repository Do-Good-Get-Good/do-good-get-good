const admin = require("firebase-admin");
const functions = require("firebase-functions");

async function getAllCollectionData(collection) {
  let response = await admin.firestore().collection(collection).get();
  return response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function updateActivities(activities) {
  return Promise.all(
    activities.map((activity) => {
      return new Promise(async (res) => {
        try {
          await admin
            .firestore()
            .collection("Activities")
            .doc(activity.id)
            .update({
              connected_users: activity.connectedUsers,
              user_count: activity.userCount,
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

exports.connectUsersToActivities = functions.firestore
  .document("Activities/{activityId}")
  .onCreate(async (snap, context) => {
    let users = await getAllCollectionData("Users");
    let activities = await getAllCollectionData("Activities");

    let newActivityData = [];

    activities.map((activity) => {
      let connectedUsers = [];
      users.map((user) => {
        let found = user.connected_activities.find(
          (connectedActivity) => connectedActivity === activity.id
        );

        if (!found) return;
        connectedUsers.push(user.id);
      });

      newActivityData.push({
        ...activity,
        connectedUsers,
        userCount: connectedUsers.length,
      });
    });

    await updateActivities(newActivityData);
  });
