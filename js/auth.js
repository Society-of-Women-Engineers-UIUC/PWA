// Import the functions you need from the SDKs you need
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { 
    collection, getDocs, doc, setDoc, query, orderBy
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import { setupEvents, setupUI } from './script.js';
import { setupUsers } from './directory.js';
import { setupPoints } from './points.js';
import { db, auth } from './firebase.js';

var uid = null;

const profileBody = document.getElementById("profileBody");

if (document.getElementById('eventsList')) {
    const events = collection(db, 'events');
    const q = query(events, orderBy("DayTime", "asc"));
    getDocs(q).then((snapshot => {
        setupEvents(snapshot.docs, uid);
    }))
}

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        if (document.getElementById('eventsList')) {

        }
        else if (document.getElementById('directory-container')) {
            const users = collection(db, 'users');
            const quer = query(users, orderBy("committee", "desc"));
            getDocs(quer).then((snapshot => {
                setupUsers(snapshot.docs);
            }))
        }
        else if (document.getElementById('points-container')) {
            console.log('In points-container if statement');
            setupPoints(user);
        }
        uid = user.uid;
    } else {
        console.log('user logged out');
        if (document.getElementById('eventsList')) {
        }
        else if (document.getElementById('directory-container')) {
            setupUsers(null);
        }
        else if (document.getElementById('points-container')) {
            console.log('In points-container if statement');
            setupPoints(user);
        }

        uid = null;
    }
    setupUI(user);
})

const signup = document.getElementById("signup");

if (signup != null) {
    signup.addEventListener("click", function(event) {
    event.preventDefault();

    const em = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const commit = document.getElementById("committee").value;
    const na = document.getElementById("name").value;
    const chr = document.getElementById("chair").value;

    createUserWithEmailAndPassword(auth, em, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

            setDoc(doc(db, 'users', user.uid), {
                email: em,
                committee: commit,
                chair: chr,
                name: na
            })
            .then(doc => {
                window.location.href = "index.html";
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
            window.location.href = "../index.html";
        })
    })
}

const login = document.getElementById("login");
if (login != null) {
    console.log("login not = null");

    login.addEventListener("click", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
            const user = userCredential.user;

            window.location.href = "index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
    })
}