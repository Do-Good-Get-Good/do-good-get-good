const admin = require("firebase-admin");
const functions = require("firebase-functions");

const {
  UnauthenticatedError,
  InvalidRoleError,
} = require("./lib/customErrors");

const setPrevRoleToFalse = (role) => {
  return {
    admin: role === "admin",
    superadmin: role === "superadmin",
    user: role === "user",
  };
};

exports.updateUserRoleClaims = functions.https.onCall(
  async (changedUser, context) => {
    if (!context.auth) {
      throw new UnauthenticatedError("The user is not authenticated.");
    }

    if (!context.auth.token.superadmin) {
      throw new InvalidRoleError("Only Superadmin can change user claims");
    }
    try {
      const userClaim = setPrevRoleToFalse(changedUser.role);

      await admin.auth().setCustomUserClaims(changedUser.id, userClaim);

      return { success: true };
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error fetching user data"
      );
    }
  }
);
