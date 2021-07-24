import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
};

const app = firebase.initializeApp(config);

export const firestore = app.firestore();
export const auth = app.auth();

export const getTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const database = {
  users: firestore.collection('users'),
};

export default app;
