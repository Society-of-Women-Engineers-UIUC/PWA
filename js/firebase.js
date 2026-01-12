import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

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
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();