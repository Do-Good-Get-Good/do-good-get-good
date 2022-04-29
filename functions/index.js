const functions = require("firebase-functions");
const admin = require("firebase-admin");
const FieldValue = require("firebase-admin").firestore.FieldValue;
var serviceAccount = require("./ServiceAccount/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://do-good-get-good-2f6cc-default-rtdb.europe-west1.firebasedatabase.app",
});

class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "UnauthenticatedError";
  }
}

class NotAnAdminError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "NotAnAdminError";
  }
}

class InvalidRoleError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "InvalidRoleError";
  }
}

function roleIsValid(role) {
  const validRoles = ["user", "admin", "superadmin"]; //To be adapted with your own list of roles
  return validRoles.includes(role);
}

// Cloud functions below //
exports.createUser = functions.https.onCall(async (data, context) => {
  try {
    //Checking that the user calling the Cloud Function is authenticated
    if (!context.auth) {
      throw new UnauthenticatedError(
        "The user is not authenticated. Only authenticated Admin users can create new users."
      );
    }

    //Checking that the user calling the Cloud Function is an Admin user
    const callerUid = context.auth.uid; //uid of the user calling the Cloud Function

    const callerUserRecord = await admin.auth().getUser(callerUid);

    if (!callerUserRecord.customClaims.admin) {
      throw new NotAnAdminError("Only Admin users can create new users.");
    }

    //Checking that the new user role is valid
    const role = data.role;

    if (!roleIsValid(role)) {
      throw new InvalidRoleError('The "' + role + '" role is not a valid role');
    }

    const userCreationRequest = {
      userDetails: data,
      status: "Pending",
      createdBy: callerUid,
      createdOn: FieldValue.serverTimestamp(),
    };

    const userCreationRequestRef = await admin
      .firestore()
      .collection("userCreationRequests")
      .add(userCreationRequest);

    const newUser = {
      email: data.email,
      password: data.password,
    };

    const userRecord = await admin.auth().createUser(newUser);

    const userId = userRecord.uid;

    const claims = {};
    claims[role] = true;

    await admin.auth().setCustomUserClaims(userId, claims);

    let userDoc = admin.firestore().collection("Users").doc(userId);

    let firebaseUserData = {
      activities_and_accumulated_time: [
        {
          accumulated_time: 0,
          activity_id: data.activityId,
        },
      ],
      connected_activities: [data.activityId],
      role: data.role,
      status_active: true,
      admin_id: callerUid,
      total_hours_year: 0,
      total_hours_month: 0,
      total_confirmed_hours: 0,
      first_name: data.firstName,
      last_name: data.lastName,
    };

    let userData = {
      id: userId,
      ...firebaseUserData,
    };

    userDoc.set(firebaseUserData);

    await userCreationRequestRef.update({ status: "Treated" });

    return {
      result: "The new user has been successfully created.",
      createdUser: userData,
    };
  } catch (error) {
    if (error.type === "UnauthenticatedError") {
      throw new functions.https.HttpsError("unauthenticated", error.message);
    } else if (
      error.type === "NotAnAdminError" ||
      error.type === "InvalidRoleError"
    ) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        error.message
      );
    } else {
      throw new functions.https.HttpsError("internal", error.message);
    }
  }
});

const database = admin.firestore();

exports.updateMonth = functions.pubsub
  .schedule("0 0 1 * *")
  .onRun(async (context) => {
    await database
      .collection("Users")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          doc.ref.update({ total_confirmed_hours: 0, total_hours_month: 0 });
        });
      });
    return console.log("Successful reset of time for month and approvedtimes");
  });

exports.updateYear = functions.pubsub
  .schedule("0 0 1 1 *")
  .onRun(async (context) => {
    await database
      .collection("Users")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          doc.ref.update({ total_hours_year: 0 });
        });
      });
    return console.log("Successful reset of time for year");
  });

// exports.assignAdminClaim = functions.firestore
//   .document("tempoAssignClaim/{tempoId}")
//   .onCreate((snap, context) => {
//     const claims = {};
//     claims["admin"] = true;
//     return admin
//       .auth()
//       .setCustomUserClaims("WKQm996MKHZooq4v1cDCMEkJgmY2", claims);
//   });
