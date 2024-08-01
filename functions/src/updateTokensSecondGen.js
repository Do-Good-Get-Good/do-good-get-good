const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");

const getUser = async (userID) => {
  let user = await getFirestore().collection("Users").doc(userID).get();
  return user.data();
};

const updateTockenArr = async (userID, tokens) => {
  await getFirestore().collection("Users").doc(userID).update({
    tokens: tokens,
  });
};

exports.updateTokensSecondGen = onCall(
  { region: "europe-north1" },
  async (request) => {
    if (!request.auth) {
      throw new UnauthenticatedError("The user is not authenticated.");
    }

    try {
      const userID = request.auth.uid;
      const currentTimestamp = new Date(Timestamp.now().toDate());
      const updatedToken = { token: request.data, timestamp: currentTimestamp };

      const userInfo = await getUser(userID);
      let tokens = userInfo.tokens ? userInfo.tokens : [];

      const tokenIndex = tokens.findIndex(
        (t) => t.token === updatedToken.token
      );

      if (tokenIndex !== -1) {
        tokens[tokenIndex].timestamp = updatedToken.timestamp;
      } else {
        tokens.push(updatedToken);
      }

      await updateTockenArr(userID, tokens);

      return { tokenIsUpdated: true };
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new HttpsError("internal", "Error fetching user data");
    }
  }
);
