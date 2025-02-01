const dotenv = require('dotenv');
dotenv.config();

const { getFirestore } = require("firebase-admin/firestore");
var admin = require("firebase-admin");

var serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

module.exports.db = db;