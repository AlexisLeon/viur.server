const admin = require('firebase-admin')
const config = require('../config')
const serviceAccount = require("../serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firestore.database
});

module.exports = admin.firestore();
