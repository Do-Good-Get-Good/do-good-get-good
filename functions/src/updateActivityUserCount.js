const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.updateActivityUserCount = functions.firestore
  .document("Activities/{activityId}")
  .onUpdate(async (change, context) => {
    const oldData = {
      id: change.before.id,
      connected_users: change.before.data().connected_users,
    };
    const newData = {
      id: change.after.id,
      connected_users: change.after.data().connected_users,
    };

    if (oldData.connected_users.length === newData.connected_users.length)
      return;

    admin.firestore().collection("Activities").doc(newData.id).update({
      user_count: newData.connected_users.length,
    });
  });
