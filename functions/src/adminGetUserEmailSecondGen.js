const { getAuth } = require("firebase-admin/auth");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const {
  UnauthenticatedError,
  InvalidRoleError,
} = require("./lib/customErrors");

exports.adminGetUserEmailSecondGen = onCall(
  { region: "europe-north1" },
  async (request) => {
    if (!request.auth) {
      throw new UnauthenticatedError("The user is not authenticated.");
    }
    if (!request.auth.token.superadmin) {
      throw new InvalidRoleError("Only Superadmin can see user email.");
    }
    try {
      const userRecord = await getAuth().getUser(request.data.userID);

      return userRecord.email;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new HttpsError("internal", "Error fetching user data");
    }
  }
);
