const { initializeApp } = require("firebase-admin/app");
// const { createUser } = require("./src/createUser");
const { createUserSecondGen } = require("./src/createUserSecondGen");
const { updateMonth } = require("./src/updateMonth");
const { updateYear } = require("./src/updateYear");
const { downloadData } = require("./src/downloadData/downloadData");
const {
  connectUsersToActivitiesSecondGen,
} = require("./src/connectUsersToActivitiesSecondGen");
const { firebaseConfig } = require("./config");
const {
  adminGetUserEmailSecondGen,
} = require("./src/adminGetUserEmailSecondGen");
const { updateUser } = require("./src/updateUser");
const {
  deletePostAfterOneYearSecondGen,
} = require("./src/deletePostAfterOneYearSecondGen");
initializeApp(firebaseConfig);
const {
  updateActivityUserCountSecondGen,
} = require("./src/updateActivityUserCountSecondGen");

// Cloud functions
// exports.assignAdminClaim = assignAdminClaim;
// exports.deleteUser = deleteUser;

exports.createUserSecondGen = createUserSecondGen;
exports.deletePostAfterOneYearSecondGen = deletePostAfterOneYearSecondGen;
exports.connectUsersToActivitiesSecondGen = connectUsersToActivitiesSecondGen;
exports.adminGetUserEmailSecondGen = adminGetUserEmailSecondGen;
exports.updateActivityUserCountSecondGen = updateActivityUserCountSecondGen;

exports.updateMonth = updateMonth;
exports.updateYear = updateYear;
exports.downloadData = downloadData;
exports.updateUser = updateUser;
