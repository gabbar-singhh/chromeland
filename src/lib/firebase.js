// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXU21eTfLB5zgvsrP1fk4CFYvIPxzY9V8",
  authDomain: "chromeland-dev.firebaseapp.com",
  projectId: "chromeland-dev",
  storageBucket: "chromeland-dev.appspot.com",
  messagingSenderId: "815260596837",
  appId: "1:815260596837:web:9f71be74c19fed2a5f248c",
  measurementId: "G-58QNLMLM29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);