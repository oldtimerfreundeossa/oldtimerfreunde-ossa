document.addEventListener("DOMContentLoaded", function () {
    const countdown = document.getElementById("countdown");

    if (!countdown) {
        return;
    }

    const daysElement = document.getElementById("countdown-days");
    const hoursElement = document.getElementById("countdown-hours");
    const minutesElement = document.getElementById("countdown-minutes");
    const secondsElement = document.getElementById("countdown-seconds");

    const daysLabel = document.getElementById("countdown-days-label");
    const hoursLabel = document.getElementById("countdown-hours-label");
    const minutesLabel = document.getElementById("countdown-minutes-label");
    const secondsLabel = document.getElementById("countdown-seconds-label");

    /*
     * Beginn:
     * 03. Oktober 2026 um 10:00 Uhr
     *
     * Ende:
     * 04. Oktober 2026 um 17:00 Uhr
     *
     * +02:00 entspricht der Schweizer Sommerzeit.
     */
    const eventStart = new Date(
        "2026-10-03T10:00:00+02:00"
    ).getTime();

    const eventEnd = new Date(
        "2026-10-04T17:00:00+02:00"
    ).getTime();

    let countdownInterval;

    function setLabel(element, value, singular, plural) {
        element.textContent = value === 1 ? singular : plural;
    }

    function showMessage(message) {
        countdown.innerHTML = `
            <p class="countdown-message">
                ${message}
            </p>
        `;
    }

    function updateCountdown() {
        const now = Date.now();

        /*
         * Das Treffen hat begonnen und läuft noch.
         */
        if (now >= eventStart && now <= eventEnd) {
            showMessage(
                "Das Oldtimertreffen läuft jetzt – wir freuen uns auf Ihren Besuch!"
            );

            clearInterval(countdownInterval);
            return;
        }

        /*
         * Das Treffen ist beendet.
         */
        if (now > eventEnd) {
            showMessage(
                "Das Oldtimertreffen 2026 ist beendet. Vielen Dank für Ihren Besuch!"
            );

            clearInterval(countdownInterval);
            return;
        }

        const difference = eventStart - now;

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (difference % (1000 * 60)) /
            1000
        );

        daysElement.textContent = days;
        hoursElement.textContent = String(hours).padStart(2, "0");
        minutesElement.textContent = String(minutes).padStart(2, "0");
        secondsElement.textContent = String(seconds).padStart(2, "0");

        setLabel(daysLabel, days, "Tag", "Tage");
        setLabel(hoursLabel, hours, "Stunde", "Stunden");
        setLabel(minutesLabel, minutes, "Minute", "Minuten");
        setLabel(secondsLabel, seconds, "Sekunde", "Sekunden");
    }

    updateCountdown();

    countdownInterval = setInterval(
        updateCountdown,
        1000
    );
});