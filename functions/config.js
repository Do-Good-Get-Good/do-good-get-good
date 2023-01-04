var serviceAccount = require("./ServiceAccount/serviceAccount.json");
var devServiceAccount = require("./ServiceAccount/devServiceAccount.json");

async function getServiceAccount() {
  return await import(process.env.FILE_PATH).then((file) => {
    return file;
  });
}

exports.firebase = async (admin) => ({
  credential: admin.credential.cert(await getServiceAccount()),
  storageBucket: process.env.STORAGE_BUCKET,
});
