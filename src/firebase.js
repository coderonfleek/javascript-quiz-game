import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAcNW9_sQyo7m20wLzP3mR_d9rzBDJ_6-U",
  authDomain: "strawpollernotifications.firebaseapp.com",
  databaseURL: "https://strawpollernotifications.firebaseio.com",
  projectId: "strawpollernotifications",
  storageBucket: "strawpollernotifications.appspot.com",
  messagingSenderId: "916962594496"
};
firebase.initializeApp(config);

export default firebase;

export const firestore = firebase.firestore();
