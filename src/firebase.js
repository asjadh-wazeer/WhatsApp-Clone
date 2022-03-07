// import firebase from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcXcAY6JZlN20IFP-sxERiSChk0qUlXmo",
  authDomain: "whats-app-clone-95c5e.firebaseapp.com",
  projectId: "whats-app-clone-95c5e",
  storageBucket: "whats-app-clone-95c5e.appspot.com",
  messagingSenderId: "1092700363548",
  appId: "1:1092700363548:web:f6fb253d3bc9013e9838d9",
  measurementId: "G-6R2RJXR8N8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig); //we will storing in this variable called firebase //1:57:00

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider}
export default db;




