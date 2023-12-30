const admin = require("firebase-admin");
const functions = require("firebase-functions");

const {
  UnauthenticatedError,
  NotPermittedError,
} = require("./lib/customErrors/errors");

const updateClaims = async (users) => {
  const updatePromises = users.docs.map(async (doc) => {
    const userId = doc.id;
    const userClaim = {
      [`${doc.data().role}`]: true,
    };

    return admin.auth().setCustomUserClaims(userId, userClaim);
  });

  await Promise.all(updatePromises);
};

const removeOldPermissions = async (users, usersColRef) => {
  const updatePromises = users.docs.map(async (doc) => {
    return await usersColRef.doc(doc.id).update({
      role: admin.firestore.FieldValue.delete(),
    });
  });

  await Promise.all(updatePromises);
};

const updateUsersCustomClaims = async () => {
  const usersColRef = admin.firestore().collection("Users");
  const users = await usersColRef.get();

  try {
    await updateClaims(users);
    await removeOldPermissions(users, usersColRef);
  } catch (error) {
    throw error;
  }
};

exports.updateAllUsersPermissions = functions.https.onCall(
  async (data, context) => {
    try {
      //Checking that the user calling the Cloud Function is authenticated
      if (!context.auth) {
        throw new UnauthenticatedError(
          "The user is not authenticated. Only authenticated users can call this function."
        );
      }

      //Checking that the user calling the Cloud Function is an Admin user
      const callerUid = context.auth.uid; //uid of the user calling the Cloud Function

      const callerUserRecord = await admin.auth().getUser(callerUid);

      if (!callerUserRecord.customClaims.developer) {
        throw new NotPermittedError(
          "Only Developer users are allowed to run this function."
        );
      }

      return updateUsersCustomClaims()
        .then(() => ({
          success:
            "Flyttningen av alla användares behörigheter till custom claims har slutförts",
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
