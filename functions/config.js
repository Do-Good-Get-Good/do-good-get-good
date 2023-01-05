const { cert } = require("firebase-admin/app");

const serviceAccount = require("./ServiceAccount/serviceAccount.json");
const devServiceAccount = require("./ServiceAccount/devServiceAccount.json");

console.log(process.env.ENV === "prod" ? serviceAccount : devServiceAccount);

exports.firebaseConfig = {
  credential: cert(
    process.env.ENV === "prod" ? serviceAccount : devServiceAccount
  ),
  storageBucket: process.env.STORAGE_BUCKET,
};
