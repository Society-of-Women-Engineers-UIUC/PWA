import { db } from './firebase.js';
import { doc, updateDoc, getDocs, increment, collection, setDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js';

const eventsList = document.getElementById("eventsList");
const loggedOutLinks = document.getElementsByClassName("logged-out");
const loggedInLinks = document.getElementsByClassName("logged-in");

console.log(loggedInLinks.length);
console.log(loggedOutLinks.length);

export const setupUI = (user) => {
    if (user) {
        // toggle UI elements
        var item1 = loggedInLinks[0]
        item1.style.display = 'block';
        var item2 = loggedOutLinks[0]
        item2.style.display = 'none';
    } else {
        // toggle UI elements
        var item1 = loggedInLinks[0]
        item1.style.display = 'none';
        var item2 = loggedOutLinks[0]
        item2.style.display = 'block';
    }
}

// setup events
export const setupEvents = async (data, uid) => {
    var html = '';

    // var attending = null;
    if (uid != null) {
        const al = collection(db, 'users', uid, 'attending');
        const aSnap =  await getDocs(al)
        
        const attending = aSnap.docs.map(doc => doc.id);
        console.log(attending);

        data.forEach( doc => {
            const event = doc.data();
            var eventCard = ``;
    
            let eventTime = event.DayTime.toDate()
            let curTime = new Date()
            
            if (curTime < eventTime) {
                if (attending.includes(doc.id)) {
                    eventCard = `
                        <div class="event-cards">
                            <div class="card">
                                <div class="frame1">
                                    <h4>${event.Title}</h4>
                                    <div class="daytime">
                                        <p class="daytimetext">${eventTime.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div class="frame1">
                                    <h6>${event.Committee}</h6>
                                    <div class="far-right">
                                        <button class="locationbtn"><i class="fa-solid fa-location-dot fa-lg"></i></button>
                                        <button class="favoritebtn"><i class="fa-regular fa-star fa-lg"></i></button>
                                        <button class="rsvpbtn" id="${doc.id}" style="background: #DCF7E9; color: #107953;">RSVP <i class="fa-solid fa-check fa-lg"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    eventCard = `
                        <div class="event-cards">
                            <div class="card">
                                <div class="frame1">
                                    <h4>${event.Title}</h4>
                                    <div class="daytime">
                                        <p class="daytimetext">${eventTime.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div class="frame1">
                                    <h6>${event.Committee}</h6>
                                    <div class="far-right">
                                        <button class="locationbtn"><i class="fa-solid fa-location-dot fa-lg"></i></button>
                                        <button class="favoritebtn"><i class="fa-regular fa-star fa-lg"></i></button>
                                        <button class="rsvpbtn" id="${doc.id}">RSVP</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }

            html += eventCard;
        })
        eventsList.innerHTML = html;

        const rsvpbtns = document.getElementsByClassName("rsvpbtn");
        const favoritebtns = document.getElementsByClassName("favoritebtn");
        const locationbtns = document.getElementsByClassName("locationbtn");


        for (const el of rsvpbtns) {
            el.addEventListener('click', function() {
                const check = document.createElement('i');
                check.classList.add('fa-solid', 'fa-check', 'fa-lg');
                const id = el.id;
                const docRef = doc(db, "events", id);

                if (this.innerHTML == "RSVP") {
                    updateDoc(docRef, {
                        attending: increment(1)
                    });
                    alert("You are RSVPed! Can't wait to see you there")
                    this.style.backgroundColor = '#DCF7E9';
                    this.style.color = '#107953';
                    this.appendChild(check);

                    const data = {

                    };
                    const userDocRef = doc(db, 'users', uid, 'attending', id);
                    setDoc(userDocRef, data);
                    
                } else {
                    updateDoc(docRef, {
                        attending: increment(-1)
                    });
                    this.style.backgroundColor = '#E9DCF5';
                    this.style.color = '#5A5377';
                    alert("You have UnRSVPed");
                    this.innerHTML = "RSVP";

                    deleteDoc(doc(db, 'users', uid, 'attending', id));
                }

            });
        }

        for (const el of favoritebtns) {
            el.addEventListener('click', function() {
                // alert("Prent el =a" + el.parentElement);
                alert("Favorite button pressed");
            });
        }

        for (const el of locationbtns) {
            el.addEventListener('click', function() {
                // alert("Prent el =a" + el.parentElement);
                alert("Location button pressed");
            });
        }
    } else {
        data.forEach( doc => {
            const event = doc.data();
            const eventCard = `
                <div class="event-cards">
                    <div class="card">
                        <div class="frame1">
                            <h4>${event.Title}</h4>
                            <div class="daytime">
                                <p class="daytimetext">${event.DayTime}</p>
                            </div>
                        </div>
                        <div class="frame1">
                            <h6>${event.Committee}</h6>
                            <div class="far-right">
                                <button class="locationbtn"><i class="fa-solid fa-location-dot fa-lg"></i></button>
                                <button class="favoritebtn"><i class="fa-regular fa-star fa-lg"></i></button>
                                <button class="rsvpbtn" id="${doc.id}">RSVP</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            html += eventCard;
        })

        eventsList.innerHTML = html;

        const rsvpbtns = document.getElementsByClassName("rsvpbtn");
        const favoritebtns = document.getElementsByClassName("favoritebtn");
        const locationbtns = document.getElementsByClassName("locationbtn");


        for (const el of rsvpbtns) {
            el.addEventListener('click', function() {
                alert('Login to RSVP');
            });
        }

        for (const el of favoritebtns) {
            el.addEventListener('click', function() {
                // alert("Prent el =a" + el.parentElement);
                alert("Favorite button pressed");
            });
        }

        for (const el of locationbtns) {
            el.addEventListener('click', function() {
                // alert("Prent el =a" + el.parentElement);
                alert("Location button pressed");
            });
        }
    }
}