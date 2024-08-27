const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const { onCall, HttpsError } = require("firebase-functions/v2/https");

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

exports.createUserSecondGen = onCall(
  { region: "europe-north1" },
  async (request) => {
    try {
      //Checking that the user calling the Cloud Function is authenticated
      if (!request.auth) {
        throw new UnauthenticatedError(
          "The user is not authenticated. Only authenticated Admin users can create new users."
        );
      }
      const createdBy = request.auth.uid;
      const data = request.data;
      const token = request.auth.token;
      const newUserRole = data.role;

      if (!token.admin && !token.superadmin) {
        throw new NotAnAdminError("Only Admin users can create new users.");
      }

      if (!roleIsValid(newUserRole)) {
        throw new InvalidRoleError(
          'The "' + newUserRole + '" role is not a valid role'
        );
      }

      const createdUserInAuth = await onCreateNewUserInAuth(
        data.email,
        data.password
      );

      if (createdUserInAuth.created) {
        return await returnUserObjectOrError(
          createdUserInAuth,
          newUserRole,
          data,
          createdBy
        );
      } else {
        return createdUserInAuth.error;
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

function onMakeUserObject(data, createdBy) {
  return {
    activities_and_accumulated_time: [
      {
        accumulated_time: 0,
        activity_id: data.activityId,
      },
    ],
    connected_activities: [data.activityId],
    role: data.role,
    status_active: true,
    admin_id: createdBy,
    created_by: createdBy,
    total_hours_year: 0,
    total_hours_month: 0,
    total_confirmed_hours: 0,
    first_name: data.firstName,
    last_name: data.lastName,
  };
}

function roleIsValid(role) {
  const validRoles = ["user", "admin", "superadmin"]; //To be adapted with your own list of roles
  return validRoles.includes(role);
}

async function onCreateNewUserInAuth(email, password) {
  try {
    const newUser = await getAuth().createUser({
      email,
      password,
    });
    return { uid: newUser.uid, created: true };
  } catch (error) {
    return { error, created: false };
  }
}

async function addClaims(userId, role) {
  try {
    const claims = {};
    claims[role] = true;
    await getAuth().setCustomUserClaims(userId, claims);
    return { claimsAdded: true };
  } catch (error) {
    return { error, claimsAdded: false };
  }
}

async function addUserToUsersCollection(userId, data, createdBy) {
  try {
    const firebaseUserData = onMakeUserObject(data, createdBy);

    await getFirestore().collection("Users").doc(userId).set(firebaseUserData);

    return { userDoc: { id: userId, ...firebaseUserData } };
  } catch (error) {
    return { userDoc: undefined, error };
  }
}

async function returnUserObjectOrError(
  createdUserInAuth,
  newUserRole,
  data,
  createdBy
) {
  const userId = createdUserInAuth.uid;
  let addedClaims = await addClaims(userId, newUserRole);
  let createdUserInCollection = await addUserToUsersCollection(
    userId,
    data,
    createdBy
  );

  if (
    addedClaims.claimsAdded &&
    createdUserInCollection.userDoc !== undefined &&
    createdUserInCollection.userDoc !== null
  ) {
    return {
      result: "The new user has been successfully created.",
      createdUser: createdUserInCollection.userDoc,
    };
  } else {
    return {
      error: {
        claims: addedClaims.error ?? "",
        addToUserInCollection: createdUserInCollection.error ?? "",
      },
      reatedUser: undefined,
    };
  }
}
