const { getFirestore } = require("firebase-admin/firestore");
var admin = require("firebase-admin");

var serviceAccount = require("./firebaseKey/recordslabelKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

module.exports.db = db;