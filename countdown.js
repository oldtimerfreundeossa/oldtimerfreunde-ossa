var countDownDate = new Date("Oct 3, 2026 10:00:00").getTime();

function updateCountdown() {

    var now = new Date().getTime();

    var difference = countDownDate - now;

    var days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    var hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    var minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
    );

    var seconds = Math.floor(
        (difference % (1000 * 60)) / 1000
    );

    document.getElementById("countdown").textContent =
        days + " Tage, " + hours + " Stunden, " +
        minutes + " Minuten, " + seconds + " Sekunden";
}

updateCountdown();

setInterval(updateCountdown, 1000);