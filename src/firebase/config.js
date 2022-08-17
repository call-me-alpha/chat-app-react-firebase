// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIds4QvhCXNtmhEImMusFeRZoesh7apRo",
  authDomain: "chat-app-fa5c7.firebaseapp.com",
  projectId: "chat-app-fa5c7",
  storageBucket: "chat-app-fa5c7.appspot.com",
  messagingSenderId: "900624143716",
  appId: "1:900624143716:web:91eaf2bad1f8c14d191671",
  measurementId: "G-73WRQEB22R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }

