const { onSchedule } = require("firebase-functions/v2/scheduler");
const { getFirestore } = require("firebase-admin/firestore");
const { getMessaging, sendMulticast } = require("firebase-admin/messaging");
const { addMonths, compareAsc } = require("date-fns");

exports.sendReminderNotificationToAdminsSecondGen = onSchedule(
  {
    schedule: "0 14 28 * *", //At 14:00 on day-of-month 28
    timeZone: "Europe/Stockholm",
    region: "europe-west1", // onSchedule don't suport region europe-north1.  More info at README
  },

  async () => {
    try {
      const snap = await getFirestore()
        .collection("Users")
        .where("role", "in", ["superadmin", "admin"])
        .where("status_active", "==", true)
        .get();

      let tockensArr = [];
      for (const doc of snap.docs) {
        if (doc.data().tokens) {
          let filteredTokens = await filterAwayOldTokenAndDuplicatedTokens(
            doc.data().tokens,
            tockensArr
          );
          tockensArr.push(...filteredTokens);
        }
      }

      if (tockensArr.length > 0) await sendPushNotifiToEveryToken(tockensArr);
    } catch (error) {
      console.error("Error sendReminderNotificationToAdmins ", error);
    }
  }
);

const filterAwayOldTokenAndDuplicatedTokens = async (
  tokensAndTimestamp,
  filteredTockens
) => {
  let tockenArr = [];

  const fiveMonthsAgo = addMonths(new Date(), -5);

  tokensAndTimestamp.forEach((t) => {
    const isOld = compareAsc(t.timestamp.toDate(), fiveMonthsAgo) < 0;
    let token = t.token;
    let tokenDoublet = filteredTockens.includes(token);

    if (!isOld && !tokenDoublet) {
      tockenArr.push(token);
    }
  });

  return tockenArr;
};

const sendPushNotifiToEveryToken = async (tokens) => {
  await getMessaging().sendEachForMulticast({
    tokens: tokens,
    notification: {
      title: "Påminnelse",
      body: "Det är nu slutet av månaden. Glöm inte att godkänna tiderna för dina DGGG-användare!",
    },
  });
};
