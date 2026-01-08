const eventsList = document.getElementById("eventsList");

// setup events
export const setupEvents = (data) => {
    let html = '';
    data.forEach( doc => {
        const event = doc.data();
        console.log(event);
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
                            <button class="rsvpbtn">RSVP</button>
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
        const check = document.createElement('i');
        check.classList.add('fa-solid', 'fa-check', 'fa-lg');

        if (this.innerHTML == "RSVP") {
            alert("You are RSVPed! Can't wait to see you there")
            this.style.backgroundColor = '#DCF7E9';
            this.style.color = '#107953';
            this.appendChild(check);
        } else {
            this.style.backgroundColor = '#E9DCF5';
            this.style.color = '#5A5377';
            alert("You have UnRSVPed");
            this.innerHTML = "RSVP";
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
}