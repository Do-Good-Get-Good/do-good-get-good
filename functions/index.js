const { initializeApp } = require("firebase-admin/app");
const { createUserSecondGen } = require("./src/createUserSecondGen");
const { updateYearSecondGen } = require("./src/updateYearSecondGen");
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
const { updateMonthSecondGen } = require("./src/updateMonthSecondGen");
// Cloud functions
// exports.assignAdminClaim = assignAdminClaim;
// exports.deleteUser = deleteUser;

exports.createUserSecondGen = createUserSecondGen;
exports.deletePostAfterOneYearSecondGen = deletePostAfterOneYearSecondGen;
exports.connectUsersToActivitiesSecondGen = connectUsersToActivitiesSecondGen;
exports.adminGetUserEmailSecondGen = adminGetUserEmailSecondGen;
exports.updateActivityUserCountSecondGen = updateActivityUserCountSecondGen;

exports.updateMonthSecondGen = updateMonthSecondGen;

exports.updateYearSecondGen = updateYearSecondGen;
exports.downloadData = downloadData;
exports.updateUser = updateUser;
