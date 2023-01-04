const admin = require("firebase-admin");

const createUser = require("./src/createUser");
const deleteUser = require("./src/deleteUser");
const updateMonth = require("./src/updateMonth");
const updateYear = require("./src/updateYear");
const assignAdminClaim = require("./src/assignAdminClaim");
const downloadData = require("./src/downloadData/downloadData");

const { firebase } = require("./config");

// if (process.env.NODE_ENV === "prod") {
// admin.initializeApp(production(admin, serviceAccount));
// } else {
admin.initializeApp(firebase(admin));
admin.credential.cert();
// }

// Cloud functions
exports.createUser = createUser.createUser;
exports.deleteUser = deleteUser.deleteUser;
exports.updateMonth = updateMonth.updateMonth;
exports.updateYear = updateYear.updateYear;
exports.assignAdminClaim = assignAdminClaim.assignAdminClaim;
exports.downloadData = downloadData.downloadData;
