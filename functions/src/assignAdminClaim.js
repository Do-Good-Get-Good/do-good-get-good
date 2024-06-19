// const admin = require("firebase-admin");
// const functions = require("firebase-functions");
// This function we don't really use we have it more as just template in case we need overide something.

// exports.assignAdminClaim = functions.firestore
//   .document("tempoAssignClaim/{tempoId}")
//   .onCreate((snap, context) => {
//     const claims = {};
//     claims["superadmin"] = true;

//     return admin
//       .auth()
//       .setCustomUserClaims("PMbJpkHVeySsdpV5m4pIGArx62E3", claims);
//   });
