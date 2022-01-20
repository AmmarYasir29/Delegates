import * as firebase from "firebase";
import "firebase/firestore";
require("dotenv").config();

firebase.initializeApp(process.env.FirebaseConfig);
const db = firebase.firestore();

export default db;
