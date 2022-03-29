import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQvF7Eim0-fLt3YWRCSkY8YXICLTU9I8E",
  authDomain: "pak-raps.firebaseapp.com",
  projectId: "pak-raps",
  storageBucket: "pak-raps.appspot.com",
  messagingSenderId: "792505926398",
  appId: "1:792505926398:web:08081b56b8f4182d0b9baf",
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const database = getFirestore();

// init firebase auth
const auth = getAuth();

export { database, auth };
