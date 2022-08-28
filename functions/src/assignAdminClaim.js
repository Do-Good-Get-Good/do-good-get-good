const admin = require("firebase-admin");
const functions = require("firebase-functions");

exports.assignAdminClaim = functions.firestore
  .document("tempoAssignClaim/{tempoId}")
  .onCreate((snap, context) => {
    const claims = {};
    claims["superadmin"] = true;

    return admin
      .auth()
      .setCustomUserClaims("PMbJpkHVeySsdpV5m4pIGArx62E3", claims);
  });
