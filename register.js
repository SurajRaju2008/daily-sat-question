// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAcuMLtc24cmrLrDJMSLkNJRChAB1s-IM",
  authDomain: "daily-sat-questions.firebaseapp.com",
  projectId: "daily-sat-questions",
  storageBucket: "daily-sat-questions.firebasestorage.app",
  messagingSenderId: "110366040201",
  appId: "1:110366040201:web:ff5e1d315435d91cf82658",
  measurementId: "G-YG27M9VKP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);