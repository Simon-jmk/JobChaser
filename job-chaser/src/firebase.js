import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyA-xyoYDaa8I8lTb1zZvKSVIq3FDDVFnbE",
  authDomain: "job-chaser-test.firebaseapp.com",
  projectId: "job-chaser-test",
  storageBucket: "job-chaser-test.appspot.com",
  messagingSenderId: "308922807459",
  appId: "1:308922807459:web:69e7b6a989ed5761207b16",
  measurementId: "G-LV507F1RXG"
})

export const auth = app.auth()
export default app