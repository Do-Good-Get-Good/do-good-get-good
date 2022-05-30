const admin = require("firebase-admin");

const createUser = require("./src/createUser");
const deleteUser = require("./src/deleteUser");
const updateMonth = require("./src/updateMonth");
const updateYear = require("./src/updateYear");
const assignAdminClaim = require("./src/assignAdminClaim");
const downloadData = require("./src/downloadData");

/* ---------------- For production database (Firebase) -------------------- */
// var serviceAccount = require("./ServiceAccount/serviceAccount.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL:
//   "https://do-good-get-good-2f6cc-default-rtdb.europe-west1.firebasedatabase.app",
// });

/* ---------------- For development database (Firebase) -------------------- */
var serviceAccount = require("./ServiceAccount/devServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "dev-do-good-get-good.appspot.com",
});

// Cloud functions
exports.createUser = createUser.createUser;
exports.deleteUser = deleteUser.deleteUser;
exports.updateMonth = updateMonth.updateMonth;
exports.updateYear = updateYear.updateYear;
exports.assignAdminClaim = assignAdminClaim.assignAdminClaim;
exports.downloadData = downloadData.downloadData;
