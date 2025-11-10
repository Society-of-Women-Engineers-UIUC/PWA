const rsvpbtns = document.getElementsByClassName("rsvpbtn");

for (const el of rsvpbtns) {
    el.addEventListener('click', function() {
        this.style.backgroundColor = '#DCF7E9';
        this.style.color = '#107953';
    });
}