// const admin = require("firebase-admin");
// const functions = require("firebase-functions");

// const {
//   UnauthenticatedError,
//   InvalidRoleError,
//   NotPermittedError,
// } = require("./lib/customErrors");

// exports.updateUserSecondGen = functions.https.onCall(
//   async (changedUser, context) => {
//     if (!context.auth) {
//       throw new UnauthenticatedError("The user is not authenticated.");
//     }

//     if (!context.auth.token.superadmin) {
//       throw new InvalidRoleError("Only Superadmin can change user claims");
//     }

//     if (changedUser.id === changedUser.adminID) {
//       throw new NotPermittedError(
//         "Superadmin cannot become admin of himself/herself."
//       );
//     }
//     try {
//       const claims = {};
//       claims[changedUser.role] = true;

//       await admin
//         .auth()
//         .setCustomUserClaims(changedUser.id, claims)
//         .then(() => {
//           admin.firestore().collection("Users").doc(changedUser.id).update({
//             first_name: changedUser.firstName,
//             last_name: changedUser.lastName,
//             status_active: changedUser.statusActive,
//             role: changedUser.role,
//             admin_id: changedUser.adminID,
//           });
//         });

//       return { success: true };
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       throw new functions.https.HttpsError(
//         "internal",
//         "Error fetching user data"
//       );
//     }
//   }
// );
