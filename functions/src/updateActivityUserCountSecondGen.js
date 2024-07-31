const { onDocumentUpdated } = require("firebase-functions/v2/firestore");

exports.updateActivityUserCountSecondGen = onDocumentUpdated(
  "Activities/{activityId}",
  (event) => {
    const oldData = {
      id: event.data.before.id,
      connected_users: event.data.before.data().connected_users,
    };
    const newData = {
      id: event.data.after.id,
      connected_users: event.data.after.data().connected_users,
    };

    if (oldData.connected_users.length === newData.connected_users.length)
      return;

    return event.data.after.ref.update({
      user_count: newData.connected_users.length,
    });
  }
);
