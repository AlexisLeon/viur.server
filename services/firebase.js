const admin = require('firebase-admin')
const config = require('../config')

admin.initializeApp({
  credential: admin.credential.cert({
	projectId: process.env.FIREBASE_PROJECT_ID,
	privateKey: process.env.FIREBASE_PRIVATE_KEY,
	clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: config.firestore.database
});

module.exports = admin.firestore();
