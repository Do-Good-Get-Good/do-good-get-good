const functions = require("firebase-functions");
const { cert } = require("firebase-admin/app");

const SERVICE_ACCOUNT_FILE_PATH = functions.config().service_acc.file_path;
const STORAGE_BUCKET = functions.config().storage.bucket;

const serviceAccount = require(SERVICE_ACCOUNT_FILE_PATH);

exports.firebaseConfig = {
  credential: cert(serviceAccount),
  storageBucket: STORAGE_BUCKET,
};
