import { User } from "../../src/utility/types";
import { Role } from "../../src/utility/enums";

const admin = require("firebase-admin");
const functions = require("firebase-functions");

const {
  UnauthenticatedError,
  NotPermittedError,
} = require("./lib/customErrors");

const setPrevRoleToFalse = (role) => {
  return {
    admin: role === Role.admin,
    superadmin: role === Role.superadmin,
    user: role === Role.user,
  };
};

const updateRoleInClaims = async (userID, newRole) => {
  const userClaim = setPrevRoleToFalse(newRole);
  try {
    return admin.auth().setCustomUserClaims(userID, userClaim);
  } catch (error) {
    throw error;
  }
};

exports.updateRoleClaims = functions.https.onCall(
  async (superAdminID, changedUser) => {
    try {
      //Checking that the user calling the Cloud Function is authenticated
      if (!superAdminID) {
        throw new UnauthenticatedError(
          "The user is not authenticated. Only authenticated users can call this function."
        );
      }
      const personThatMakeChanges = await admin.auth().getUser(superAdminID);

      if (!personThatMakeChanges.customClaims.superadmin) {
        throw new NotPermittedError(
          "Only superadmin is allowed to run this function."
        );
      }

      return updateRoleInClaims(changedUser.id, changedUser.role)
        .then(() => ({
          success: "Användarrollen har ändrats",
        }))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      if (error.type === "UnauthenticatedError") {
        throw new functions.https.HttpsError("unauthenticated", error.message);
      } else if (error.type === "NotPermittedError") {
        throw new functions.https.HttpsError(
          "failed-precondition",
          error.message
        );
      } else {
        throw new functions.https.HttpsError("internal", error);
      }
    }
  }
);
