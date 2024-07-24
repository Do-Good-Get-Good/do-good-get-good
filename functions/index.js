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
const {
  deletePostAfterOneYearSecondGen,
} = require("./src/deletePostAfterOneYearSecondGen");
initializeApp(firebaseConfig);
const {
  updateActivityUserCountSecondGen,
} = require("./src/updateActivityUserCountSecondGen");
const { updateMonthSecondGen } = require("./src/updateMonthSecondGen");
const { updateUserSecondGen } = require("./src/updateUserSecondGen");
const {
  sendReminderNotificationToAdmins,
} = require("./src/sendReminderNotificationToAdmins");

exports.createUserSecondGen = createUserSecondGen;
exports.deletePostAfterOneYearSecondGen = deletePostAfterOneYearSecondGen;
exports.connectUsersToActivitiesSecondGen = connectUsersToActivitiesSecondGen;
exports.adminGetUserEmailSecondGen = adminGetUserEmailSecondGen;
exports.updateActivityUserCountSecondGen = updateActivityUserCountSecondGen;

exports.updateMonthSecondGen = updateMonthSecondGen;
exports.updateUserSecondGen = updateUserSecondGen;
exports.updateYearSecondGen = updateYearSecondGen;
exports.downloadData = downloadData;
exports.sendReminderNotificationToAdmins = sendReminderNotificationToAdmins;
