const { getFirestore } = require("firebase-admin/firestore");
const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
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
  return filtedTokens;
};

const sendPushNotifiToEveryToken = async (tokens, approvedTimeEnty) => {
  const activityTittle = approvedTimeEnty.activity_title
    ? approvedTimeEnty.activity_title
    : "";
  const activityTime = approvedTimeEnty.time ? approvedTimeEnty.time : "";

  await getMessaging().sendEachForMulticast({
    tokens: tokens,
    notification: {
      title: "En tidsregistrering har godkänts",
      body: `${activityTime} tim för aktiviteten ${activityTittle} är godkänd!`,
    },
  });
};

exports.sendNotifiAboutApprovedTimeEntrySecondGen = onDocumentUpdated(
  "timeentries/{timeentriesId}",
  async (event) => {
    const isTheSameUser =
      event.data.before.data().user_id === event.data.after.data().user_id;
    const isChangedToApprovedTimeEnty =
      !event.data.before.data().status_confirmed &&
      event.data.after.data().status_confirmed;

    if (isTheSameUser && isChangedToApprovedTimeEnty)
      try {
        const approvedTimeEnty = event.data.after.data();
        const userTockens = await getUserTokens(approvedTimeEnty.user_id);

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
