const admin = require("firebase-admin");

const { createUser } = require("./src/createUser");
const { deleteUser } = require("./src/deleteUser");
const { updateMonth } = require("./src/updateMonth");
const { updateYear } = require("./src/updateYear");
const { assignAdminClaim } = require("./src/assignAdminClaim");
const { downloadData } = require("./src/downloadData/downloadData");
const { connectUsersToActivities } = require("./src/connectUsersToActivities");
const { updateActivityUserCount } = require("./src/updateActivityUserCount");
const { changeAllActivityImages } = require("./src/changeAllActivityImages");

const { firebaseConfig } = require("./config");

admin.initializeApp(firebaseConfig);

// Cloud functions
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.updateMonth = updateMonth;
exports.updateYear = updateYear;
exports.assignAdminClaim = assignAdminClaim;
exports.downloadData = downloadData;
exports.connectUsersToActivities = connectUsersToActivities;
exports.updateActivityUserCount = updateActivityUserCount;
exports.changeAllActivityImages = changeAllActivityImages;
