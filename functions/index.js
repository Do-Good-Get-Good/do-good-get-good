// const admin = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { createUser } = require("./src/createUser");
const { deleteUser } = require("./src/deleteUser");
const { updateMonth } = require("./src/updateMonth");
const { updateYear } = require("./src/updateYear");
const { assignAdminClaim } = require("./src/assignAdminClaim");
const { downloadData } = require("./src/downloadData/downloadData");
const { connectUsersToActivities } = require("./src/connectUsersToActivities");
const { updateActivityUserCount } = require("./src/updateActivityUserCount");
const { firebaseConfig } = require("./config");
const {
  adminGetUserEmailSecondGen,
} = require("./src/adminGetUserEmailSecondGen");
const { updateUser } = require("./src/updateUser");
const { deletePostAfterOneYear } = require("./src/deletePostAfterOneYear");
// admin.initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

// Cloud functions
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.updateMonth = updateMonth;
exports.updateYear = updateYear;
exports.assignAdminClaim = assignAdminClaim;
exports.downloadData = downloadData;
exports.connectUsersToActivities = connectUsersToActivities;
exports.updateActivityUserCount = updateActivityUserCount;
exports.adminGetUserEmailSecondGen = adminGetUserEmailSecondGen;
exports.updateUser = updateUser;
exports.deletePostAfterOneYear = deletePostAfterOneYear;
