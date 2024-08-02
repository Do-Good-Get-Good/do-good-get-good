const { getFirestore } = require("firebase-admin/firestore");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { getMessaging } = require("firebase-admin/messaging");
const { addMonths, compareAsc } = require("date-fns");

const getUserTokens = async (userID) => {
  let user = await getFirestore().collection("Users").doc(userID).get();

  return user.data().tokens ? filterAwayOldToken(user.data().tokens) : [];
};

const filterAwayOldToken = (tokens) => {
  let filtedTokens = [];
  const fiveMonthsAgo = addMonths(new Date(), -5);

  tokens.forEach((t) => {
    const isOld = compareAsc(t.timestamp.toDate(), fiveMonthsAgo) < 0;
    let token = t.token;

    if (!isOld) {
      filtedTokens.push(token);
    }
  });
  console.log(filtedTokens, "------------- filtedTokens");
  return filtedTokens;
};

const sendPushNotifiToEveryToken = async (tokens, approvedTimeEnty) => {
  const activityTittle = approvedTimeEnty.activityTitle ?? "";
  const activityTime = approvedTimeEnty.time ?? "";
  console.log(approvedTimeEnty, "------------- approvedTimeEnty");
  await getMessaging().sendEachForMulticast({
    tokens: tokens,
    notification: {
      title: "Tidsregistreringen är godkänd",
      body: `${activityTime} tim för aktiviteten ${activityTittle} är godkänd!`,
    },
  });
};

exports.sendNotifiAboutApprovedTimeEntrySecondGen = onCall(
  { region: "europe-north1" },
  async (request) => {
    if (!request.auth) {
      throw new UnauthenticatedError(
        "The user is not authenticated. Only authenticated Admin users can create new users."
      );
    }

    const token = request.auth.token;

    if (!token.admin && !token.superadmin) {
      throw new NotAnAdminError("Only Admin users can create new users.");
    }
    console.log(request.data, "------------- request.data");
    try {
      const approvedTimeEnty = request.data;
      const userTockens = await getUserTokens(approvedTimeEnty.userID);

      if (userTockens.length > 0)
        await sendPushNotifiToEveryToken(userTockens, approvedTimeEnty);
    } catch (error) {
      console.error(
        "Error sendNitificationToUserAboutApprovedTimeEnty ",
        error
      );
    }
  }
);
