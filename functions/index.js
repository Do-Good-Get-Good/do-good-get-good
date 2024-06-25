const { initializeApp } = require("firebase-admin/app");
// const { createUser } = require("./src/createUser");
const { createUserSecondGen } = require("./src/createUserSecondGen");
const { deleteUser } = require("./src/deleteUser");
const { updateMonth } = require("./src/updateMonth");
const { updateYear } = require("./src/updateYear");
// const { assignAdminClaim } = require("./src/assignAdminClaim");
const { downloadData } = require("./src/downloadData/downloadData");
// const { connectUsersToActivities } = require("./src/connectUsersToActivities");
const {
  connectUsersToActivitiesSecondGen,
} = require("./src/connectUsersToActivitiesSecondGen");
const { updateActivityUserCount } = require("./src/updateActivityUserCount");
const { firebaseConfig } = require("./config");
const {
  adminGetUserEmailSecondGen,
} = require("./src/adminGetUserEmailSecondGen");
const { updateUser } = require("./src/updateUser");
// const { deletePostAfterOneYear } = require("./src/deletePostAfterOneYear");
const {
  deletePostAfterOneYearSecondGen,
} = require("./src/deletePostAfterOneYearSecondGen");
initializeApp(firebaseConfig);

// Cloud functions
// exports.assignAdminClaim = assignAdminClaim;

exports.createUserSecondGen = createUserSecondGen;
exports.deletePostAfterOneYearSecondGen = deletePostAfterOneYearSecondGen;
exports.connectUsersToActivitiesSecondGen = connectUsersToActivitiesSecondGen;
exports.adminGetUserEmailSecondGen = adminGetUserEmailSecondGen;

exports.deleteUser = deleteUser;
exports.updateMonth = updateMonth;
exports.updateYear = updateYear;

exports.downloadData = downloadData;

exports.updateActivityUserCount = updateActivityUserCount;

exports.updateUser = updateUser;
