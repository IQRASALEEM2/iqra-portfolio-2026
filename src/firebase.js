// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlCm_oFmGJFUWencZ9Nr6-XoQ522fuBKw",
  authDomain: "dev-iqra.firebaseapp.com",
  projectId: "dev-iqra",
  storageBucket: "dev-iqra.appspot.com",
  messagingSenderId: "1038869277947",
  appId: "1:1038869277947:web:50490b9e406e7dc3e8d45e",
  measurementId: "G-37ZL7GZPHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
import { getStorage } from "firebase/storage";
const storage = getStorage(app);

export { db, auth, analytics, storage };
