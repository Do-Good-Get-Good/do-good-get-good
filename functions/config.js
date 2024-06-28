const { cert } = require("firebase-admin/app");
const { setGlobalOptions } = require("firebase-functions/v2");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

//locate all functions closest to users
// setGlobalOptions({ region: "europe-north1" });

// Define parameters
const serviceAccountFilePath = process.env.SERVICE_ACCOUNT_FILE_PATH;
const storageBucket = process.env.STORAGE_BUCKET;

// Initialize Firebase Admin SDK
const serviceAccount = require(serviceAccountFilePath);

exports.firebaseConfig = {
  credential: cert(serviceAccount),
  storageBucket: storageBucket,
};
