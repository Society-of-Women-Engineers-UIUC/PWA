import { db } from './firebase.js';
import { doc, getDoc, getDocs, increment, collection, query, orderBy } from 'https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js';

const rsvpedConatiner = document.getElementById("rsvpedList");

export const setupProfile = async (uid) => {
    let html = '';
    console.log(uid);
    const at = collection(db, 'users', uid, 'attending');
    const aSnap =  await getDocs(at)
    const options = {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    };
    const formatter = new Intl.DateTimeFormat(undefined, options);

    const attending = aSnap.docs.map(doc => doc.id);
    console.log(attending)
    attending.forEach(async eventId => {
        var eventCard = ``;
        const e = doc(db, 'events', eventId);
        var event = await getDoc(e);
        event = event.data()
        let eventTime = event.DayTime.toDate();
        let formattedTime = formatter.format(eventTime);

        eventCard = `
            <div class="event-cards">
                <div class="card">
                    <div class="frame1">
                        <h4>${event.Title}</h4>
                        <div class="daytime">
                            <p class="daytimetext">${formattedTime}</p>
                        </div>
                    </div>
                    <div class="frame1">
                        <h6>${event.Committee}</h6>
                        <div class="far-right">
                            <button class="locationbtn"><i class="fa-solid fa-location-dot fa-lg"></i></button>
                            <button class="favoritebtn"><i class="fa-regular fa-star fa-lg"></i></button>
                            <button class="rsvpbtn" id="${eventId}" style="background: #DCF7E9; color: #107953;">RSVP <i class="fa-solid fa-check fa-lg"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;

    });

    rsvpedConatiner.innerHTML = html;

    // if (user == null) {
    //     html = `
    //         <h2>Login to view points</h2>
    //     `;
    // } else {
    //     html = `
    //         <h2>Points page under construction</h2>
    //     `; 
    // }
    // directoryContainer.innerHTML = html;
}