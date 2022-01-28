import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const FirebaseConfig = {
  apiKey: "AIzaSyCLlE1gY5uHj8ylzI1lmzo5ivxLOxZzVkQ",
  authDomain: "delegates-5ab2f.firebaseapp.com",
  projectId: "delegates-5ab2f",
  storageBucket: "delegates-5ab2f.appspot.com",
  messagingSenderId: "1018319155587",
  appId: "1:1018319155587:web:3d849dcfda8f95106806b6",
  measurementId: "G-XJL32XVR9K",
};

initializeApp(FirebaseConfig);
const db = getFirestore();

export default db;
