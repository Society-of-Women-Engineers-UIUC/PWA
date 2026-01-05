// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { 
    getFirestore, collection, getDocs
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMpYfMxe7v75Rdf2yV_5Al0o-VX-j9oP8",
    authDomain: "swe-pwa.firebaseapp.com",
    projectId: "swe-pwa",
    storageBucket: "swe-pwa.firebasestorage.app",
    messagingSenderId: "231356925616",
    appId: "1:231356925616:web:b0d63038fa0a4aabd45d75",
    measurementId: "G-0Y29BNGZ11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

const signup = document.getElementById("signup");

if (signup != null) {
    signup.addEventListener("click", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const commit = document.getElementById("committee").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            window.location.href = "index.html";
            return db.collection('users').doc(userCredential.user.uid).set({
                committee: commit
            });
        })
    });
}

const logout = document.getElementById("logout");
if (logout != null) {
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            console.log("User logged out");
        })
    })
}

const login = document.getElementById("login");
if (login != null) {
    login.addEventListener("click", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
            const user = userCredential.user;
            console.log('User logged in auth');
            window.location.href = "index.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
    })
}
