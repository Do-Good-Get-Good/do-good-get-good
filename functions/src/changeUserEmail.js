const { auth } = require("firebase-admin");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const {
  UnauthenticatedError,
  InvalidRoleError,
} = require("./lib/customErrors");

const updateEmail = async (userId, newEmail) => {
  try {
    await auth().updateUser(userId, {
      email: newEmail,
    });
  } catch (error) {
    throw error;
  }
};

exports.updateEmail = updateEmail;

exports.changeUserEmail = onCall(
  { region: "europe-north1" },
  async (request) => {
    if (!request.auth) {
      throw new UnauthenticatedError("The user is not authenticated.");
    }

    const token = request.auth.token;

    try {
      if (token.superadmin || token.admin) {
        const { userId, newEmail } = request.data;

        await updateEmail(userId, newEmail);
      } else {
        throw new InvalidRoleError(
          "Only admins or superadmins can change users email"
        );
      }
    } catch (error) {
      if (error.type === "UnauthenticatedError") {
        throw new HttpsError("unauthenticated", error.message);
      } else if (
        error.type === "NotAnAdminError" ||
        error.type === "InvalidRoleError"
      ) {
        throw new HttpsError("failed-precondition", error.message);
      } else {
        throw new HttpsError("internal", error.message);
      }
    }
  }
);
