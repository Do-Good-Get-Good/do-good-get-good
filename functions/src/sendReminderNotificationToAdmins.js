const { onSchedule } = require("firebase-functions/v2/scheduler");
const { getFirestore } = require("firebase-admin/firestore");
const { getMessaging, sendMulticast } = require("firebase-admin/messaging");

exports.sendReminderNotificationToAdmins = onSchedule(
  {
    schedule: "0 14 28 * *", //At 14:00 on day-of-month 28
    timeZone: "Europe/Stockholm",
    region: "europe-west1", // onSchedule don't suport region europe-north1.  More info at README
  },

  async () => {
    try {
      await getFirestore()
        .collection("Users")
        .where("role", "in", ["superadmin", "admin"])
        .where("status_active", "==", true)
        .where("get_push_notifi", "==", true)
        .get()
        .then(async (snap) => {
          let tockensArr = [];
          snap.docs.forEach(async (doc) => {
            if (doc.data().tokens && doc.data().tokens.length > 0)
              tockensArr.push(...doc.data().tokens);
          });

          if (tockensArr.length > 0)
            await sendPushNotifiToEveryToken(tockensArr);
        });
    } catch (error) {
      console.error("Error sendReminderNotificationToAdmins ", error);
    }
  }
);

const sendPushNotifiToEveryToken = async (tokens) => {
  await getMessaging().sendEachForMulticast({
    tokens: tokens,
    notification: {
      title: "Påminnelse",
      body: "Det är nu slutet av månaden. Glöm inte att godkänna tiderna för dina DGGG-användare!",
      // imageUrl:
      //   "https://firebasestorage.googleapis.com/v0/b/dev-do-good-get-good.appspot.com/o/app_images%2FLogotyp_DGGG.png?alt=media&token=5cb4d6fa-8682-466e-a35b-bdd21050dee2",
    },
  });
};
