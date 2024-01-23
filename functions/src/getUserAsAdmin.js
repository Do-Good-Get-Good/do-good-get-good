const admin = require("firebase-admin");

exports.getUserEmail = async (id) => await admin.auth().getUser(id);
