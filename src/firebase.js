import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA90M4sDUUWpRDNYWEQr4Juq_l8T_9xlTQ",
  authDomain: "insta-clone-react-3d58c.firebaseapp.com",
  databaseURL: "https://insta-clone-react-3d58c.firebaseio.com",
  projectId: "insta-clone-react-3d58c",
  storageBucket: "insta-clone-react-3d58c.appspot.com",
  messagingSenderId: "749134099192",
  appId: "1:749134099192:web:09aa5ca24952e52e0d810d",
  measurementId: "G-HH3SCG4759",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
