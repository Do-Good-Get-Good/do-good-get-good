//TODO: Should we delete this function? We don't use it right now

// const admin = require("firebase-admin");
// const functions = require("firebase-functions");

// exports.deleteUser = functions.auth.user().onDelete((user, context) => {
//   let userUid = user.uid;

//   admin
//     .firestore()
//     .collection("Users")
//     .doc(userUid)
//     .delete()
//     .then(() => console.log(`Deleted user '${userUid}' successfully!`));
// });
