exports.production = (admin, serviceAccount) => ({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://do-good-get-good-2f6cc-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "do-good-get-good-2f6cc.appspot.com",
});

exports.development = (admin, serviceAccount) => ({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "dev-do-good-get-good.appspot.com",
});
