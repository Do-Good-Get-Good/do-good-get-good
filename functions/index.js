const { initializeApp } = require("firebase-admin/app");
const { createUserSecondGen } = require("./src/createUserSecondGen");
const { updateYearSecondGen } = require("./src/updateYearSecondGen");

const {
  downloadDataSecondGen,
} = require("./src/downloadData/downloadDataSecondGen");
const {
  connectUsersToActivitiesSecondGen,
} = require("./src/connectUsersToActivitiesSecondGen");
const { firebaseConfig } = require("./config");
const {
  adminGetUserEmailSecondGen,
} = require("./src/adminGetUserEmailSecondGen");
const {
  deletePostAfterOneYearSecondGen,
} = require("./src/deletePostAfterOneYearSecondGen");
initializeApp(firebaseConfig);
const {
  updateActivityUserCountSecondGen,
} = require("./src/updateActivityUserCountSecondGen");
const { updateMonthSecondGen } = require("./src/updateMonthSecondGen");
const { updateUserSecondGen } = require("./src/updateUserSecondGen");
const { changeUserEmail } = require("./src/changeUserEmail");

exports.createUserSecondGen = createUserSecondGen;
exports.deletePostAfterOneYearSecondGen = deletePostAfterOneYearSecondGen;
exports.connectUsersToActivitiesSecondGen = connectUsersToActivitiesSecondGen;
exports.adminGetUserEmailSecondGen = adminGetUserEmailSecondGen;
exports.updateActivityUserCountSecondGen = updateActivityUserCountSecondGen;

exports.updateMonthSecondGen = updateMonthSecondGen;
exports.updateUserSecondGen = updateUserSecondGen;
exports.updateYearSecondGen = updateYearSecondGen;
exports.downloadDataSecondGen = downloadDataSecondGen;
exports.changeUserEmail = changeUserEmail;
