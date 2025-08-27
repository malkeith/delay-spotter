// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0ITtoMiAetb7UD-meJSMFp0QwsZvVipM",
  authDomain: "busdelayapp.firebaseapp.com",
  projectId: "busdelayapp",
  storageBucket: "busdelayapp.firebasestorage.app",
  messagingSenderId: "48393144435",
  appId: "1:48393144435:web:bce60beded0fc6520b8206",
  measurementId: "G-WDL17N2YEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);