const { getFirestore } = require("firebase-admin/firestore");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

async function getAllCollectionData(collection) {
  let response = await getFirestore().collection(collection).get();
  return response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function updateUsersConnectedToActivities(activities) {
  return Promise.all(
    activities.map((activity) => {
      return new Promise(async (res) => {
        try {
          await getFirestore()
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

exports.connectUsersToActivitiesSecondGen = onDocumentCreated(
  "Activities/{activityId}",
  async (event) => {
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

    await updateUsersConnectedToActivities(newActivityData);
  }
);
