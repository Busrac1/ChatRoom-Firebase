// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO9UxG01AjbT8snhIKzuJrTDCO-w9D_2k",
  authDomain: "chatodasi-914db.firebaseapp.com",
  projectId: "chatodasi-914db",
  storageBucket: "chatodasi-914db.appspot.com",
  messagingSenderId: "71591098683",
  appId: "1:71591098683:web:254f93b3ccb8093f4c9f1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yetkilendirme
export const auth= getAuth(app);

// google ile yetkilendirme
export const provider= new GoogleAuthProvider()

// veritabanı ile kurulumu sağlar
export const db = getFirestore(app);

