// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-xyoYDaa8I8lTb1zZvKSVIq3FDDVFnbE",
  authDomain: "job-chaser-test.firebaseapp.com",
  projectId: "job-chaser-test",
  storageBucket: "job-chaser-test.appspot.com",
  messagingSenderId: "308922807459",
  appId: "1:308922807459:web:69e7b6a989ed5761207b16",
  measurementId: "G-LV507F1RXG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth };