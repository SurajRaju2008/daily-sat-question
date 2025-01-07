// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAcuMLtc24cmrLrDJMSLkNJRChAB1s-IM",
  authDomain: "daily-sat-questions.firebaseapp.com",
  projectId: "daily-sat-questions",
  storageBucket: "daily-sat-questions.appspot.com",
  messagingSenderId: "110366040201",
  appId: "1:110366040201:web:ff5e1d315435d91cf82658",
  measurementId: "G-YG27M9VKP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication

// Add event listener to the submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the form from refreshing the page

  // Get user inputs inside the event listener to ensure they have the latest values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Account creation successful
      const user = userCredential.user;
      alert("Account created successfully!");
      window.location.href = "login.html"; // Redirect to login page
    })
    .catch((error) => {
      // Handle errors
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
});
