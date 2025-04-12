import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAcuMLtc24cmrLrDJMSlNJRChAB1s-IM",
  authDomain: "daily-sat-questions.firebaseapp.com",
  projectId: "daily-sat-questions",
  storageBucket: "daily-sat-questions.appspot.com",
  messagingSenderId: "110366040201",
  appId: "1:110366040201:web:ff5e1d315435d91cf82658",
  measurementId: "G-YG27M9VKP3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const submit = document.getElementById('submit');
submit.addEventListener("click", function(event){
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('userEmail', email);

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const username = userDoc.data().username;
        localStorage.setItem("username", username);
      } else {
        localStorage.setItem("username", "User");
      }

      alert("Login Successful!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      let errorMessage;
      switch (error.code) {
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format.";
          break;
        default:
          errorMessage = "An error occurred. Please try again.";
      }
      alert("Error: " + errorMessage);
    });
});