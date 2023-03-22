// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK_NXSK0zU21P3521nT-osl4J0LtWLDMU",
  authDomain: "cc-test-1532d.firebaseapp.com",
  projectId: "cc-test-1532d",
  storageBucket: "cc-test-1532d.appspot.com",
  messagingSenderId: "296522752449",
  appId: "1:296522752449:web:6b86e6330e2ea99a9dcf40",
  measurementId: "G-0RFPR0VV7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);