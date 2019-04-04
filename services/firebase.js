const admin = require('firebase-admin')
const config = require('../config')

admin.initializeApp({
  credential: admin.credential.cert({
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: config.firestore.database
});

module.exports = admin.firestore();
