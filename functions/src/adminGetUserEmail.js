const admin = require("firebase-admin");
const functions = require("firebase-functions");
const {
  UnauthenticatedError,
  InvalidRoleError,
} = require("./lib/customErrors");

exports.adminGetUserEmail = functions.https.onCall(async (userID, context) => {
  if (!context.auth) {
    throw new UnauthenticatedError("The user is not authenticated.");
  }

  if (!context.auth.token.superadmin) {
    throw new InvalidRoleError("Only Superadmin can see user email.");
  }
  try {
    const userRecord = await admin.auth().getUser(userID);
    return userRecord.email;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Error fetching user data"
    );
  }
});
