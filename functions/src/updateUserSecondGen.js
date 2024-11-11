const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { updateEmail } = require("./changeUserEmail");

const {
  UnauthenticatedError,
  InvalidRoleError,
  NotPermittedError,
} = require("./lib/customErrors");

exports.updateUserSecondGen = onCall(
  { region: "europe-north1" },
  async (request) => {
    if (!request.auth) {
      throw new UnauthenticatedError("The user is not authenticated.");
    }

    const token = request.auth.token;

    if (!token.superadmin) {
      throw new InvalidRoleError("Only Superadmin can change user claims");
    }

    const changedUser = request.data;

    if (changedUser.id === changedUser.adminID) {
      throw new NotPermittedError(
        "Superadmin cannot become admin of himself/herself."
      );
    }
    try {
      const claims = {};
      claims[changedUser.role] = true;

      await updateEmail(changedUser.id, changedUser.email);

      await getAuth()
        .setCustomUserClaims(changedUser.id, claims)
        .then(() => {
          getFirestore().collection("Users").doc(changedUser.id).update({
            first_name: changedUser.firstName,
            last_name: changedUser.lastName,
            status_active: changedUser.statusActive,
            role: changedUser.role,
            admin_id: changedUser.adminID,
          });
        });

      return { success: true };
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
