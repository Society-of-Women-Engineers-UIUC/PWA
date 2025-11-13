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
