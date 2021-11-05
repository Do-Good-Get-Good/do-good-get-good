const functions = require("firebase-functions");
var admin = require("firebase-admin");

var serviceAccount = require("./do-good-get-good-2f6cc-firebase-adminsdk-kqeyb-0a3929a0ca.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://do-good-get-good-2f6cc-default-rtdb.europe-west1.firebasedatabase.app",
});

exports.newUserSignUp = functions.auth.user().onCreate((user) => {
  let userDoc = admin.firestore().collection("Users").doc(user.uid);
  let userSubColl = userDoc.collection("personal_information").doc();
  function inputDataToUser() {
    userDoc.set({
      activities_and_accumulated_time: [
        {
          accumulated_time: 0,
          activity_id: "",
        },
      ],
      role: "user",
      status_active: true,
    });
    userSubColl.set({
      first_name: "",
      last_name: "",
    });
  }

  return inputDataToUser();
});

// exports.createNewUser = functions.https.onCall((data, context) => {
//   if (context.auth) {
//     admin
//       .auth()
//       .createUser({
//         email: data.email,
//         password: data.password,
//       })
//       .then(() => {
//         // return "user created"
//         console.log("user created!");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// });
