const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.assignAdminClaim = functions.firestore
  .document("temp/{tempoId}")
  .onCreate((snap, context) => {
    const claims = {
      superadmin: true,
      developer: true,
    };

    return admin
      .auth()
      .setCustomUserClaims("VZyL8bD0RxXp5UVFpSubX8r4a2x1", claims);
  });
