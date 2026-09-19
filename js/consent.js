document.addEventListener("DOMContentLoaded", () => {

    const CONSENT_KEY = "ossaGoogleMapsConsent";

    const mapFrames = document.querySelectorAll("[data-google-maps]");
    const mapPlaceholders = document.querySelectorAll("[data-map-placeholder]");

    const savedConsent = localStorage.getItem(CONSENT_KEY);


    /* ================================================= */
    /* GOOGLE MAPS LADEN */
    /* ================================================= */

    function loadGoogleMaps() {

        mapFrames.forEach((frame) => {

            const mapUrl = frame.dataset.src;

            if (mapUrl && !frame.src.includes("google.com")) {
                frame.src = mapUrl;
            }

        });

        mapPlaceholders.forEach((placeholder) => {
            placeholder.classList.add("hidden");
        });

    }


    /* ================================================= */
    /* GOOGLE MAPS BLOCKIEREN */
    /* ================================================= */

    function blockGoogleMaps() {

        mapFrames.forEach((frame) => {
            frame.removeAttribute("src");
        });

        mapPlaceholders.forEach((placeholder) => {
            placeholder.classList.remove("hidden");
        });

    }


    /* ================================================= */
    /* BANNER ERSTELLEN */
    /* ================================================= */

    function createConsentBanner() {

        if (document.querySelector(".consent-banner")) {
            return;
        }

        const banner = document.createElement("div");

        banner.className = "consent-banner";

        banner.innerHTML = `
            <div class="consent-banner-content">

                <div class="consent-banner-text">

                    <strong>Google Maps</strong>

                    <p>
                        Wir verwenden Google Maps zur Darstellung unseres
                        Veranstaltungsortes. Wenn Sie Google Maps erlauben,
                        können Daten an Google übertragen und Cookies oder
                        vergleichbare Technologien eingesetzt werden.
                    </p>

                </div>

                <div class="consent-banner-buttons">

                    <button
                        type="button"
                        class="consent-button consent-reject"
                    >
                        Ablehnen
                    </button>

                    <button
                        type="button"
                        class="consent-button consent-accept"
                    >
                        Google Maps erlauben
                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(banner);


        const acceptButton =
            banner.querySelector(".consent-accept");

        const rejectButton =
            banner.querySelector(".consent-reject");


        acceptButton.addEventListener("click", () => {

            localStorage.setItem(
                CONSENT_KEY,
                "accepted"
            );

            loadGoogleMaps();

            banner.remove();

        });


        rejectButton.addEventListener("click", () => {

            localStorage.setItem(
                CONSENT_KEY,
                "rejected"
            );

            blockGoogleMaps();

            banner.remove();

        });

    }


    /* ================================================= */
    /* DIREKT AUF DER KARTE ERLAUBEN */
    /* ================================================= */

    document
        .querySelectorAll("[data-map-accept]")
        .forEach((button) => {

            button.addEventListener("click", () => {

                localStorage.setItem(
                    CONSENT_KEY,
                    "accepted"
                );

                loadGoogleMaps();

                const banner =
                    document.querySelector(".consent-banner");

                if (banner) {
                    banner.remove();
                }

            });

        });


    /* ================================================= */
    /* DATENSCHUTZEINSTELLUNGEN */
    /* ================================================= */

    document
        .querySelectorAll("[data-consent-settings]")
        .forEach((button) => {

            button.addEventListener("click", () => {

                localStorage.removeItem(CONSENT_KEY);

                blockGoogleMaps();

                createConsentBanner();

            });

        });


    /* ================================================= */
    /* GESPEICHERTE ENTSCHEIDUNG */
    /* ================================================= */

    if (savedConsent === "accepted") {

        loadGoogleMaps();

    }

    else if (savedConsent === "rejected") {

        blockGoogleMaps();

    }

    else {

        blockGoogleMaps();

        /*
         * Banner nur anzeigen, wenn auf dieser Seite
         * überhaupt Google Maps vorhanden ist.
         */

        if (mapFrames.length > 0) {
            createConsentBanner();
        }

    }

});