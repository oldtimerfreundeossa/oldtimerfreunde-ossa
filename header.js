document.addEventListener("DOMContentLoaded", function () {
    const scrollThreshold = 40;
    const backToTopThreshold = 400;

    const backToTop = document.getElementById("backToTop");
    const navToggle = document.getElementById("nav-toggle");
    const navToggleLabel = document.querySelector(".nav-toggle-label");
    const navigation = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav a");

    /* ================================================= */
    /* SCROLL-EFFEKTE */
    /* ================================================= */

    function updateOnScroll() {
        const scrollPosition =
            window.scrollY ||
            window.pageYOffset ||
            document.documentElement.scrollTop;

        /* Klasse für einen gescrollten Header */
        document.body.classList.toggle(
            "scrolled",
            scrollPosition > scrollThreshold
        );

        /* Nach-oben-Button anzeigen oder verstecken */
        if (backToTop) {
            backToTop.classList.toggle(
                "visible",
                scrollPosition > backToTopThreshold
            );
        }
    }

    updateOnScroll();

    window.addEventListener("scroll", updateOnScroll, {
        passive: true
    });


    /* ================================================= */
    /* NACH-OBEN-BUTTON */
    /* ================================================= */

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* ================================================= */
    /* MOBILES MENÜ */
    /* ================================================= */

    function closeMobileMenu() {
        if (!navToggle) {
            return;
        }

        navToggle.checked = false;

        if (navToggleLabel) {
            navToggleLabel.setAttribute("aria-expanded", "false");
        }
    }

    if (navToggle && navToggleLabel) {
        navToggleLabel.setAttribute("aria-expanded", "false");

        navToggle.addEventListener("change", function () {
            navToggleLabel.setAttribute(
                "aria-expanded",
                navToggle.checked ? "true" : "false"
            );
        });
    }

    /* Menü schliessen, nachdem ein Link angeklickt wurde */
    navLinks.forEach(function (link) {
        link.addEventListener("click", closeMobileMenu);
    });

    /* Menü mit der Escape-Taste schliessen */
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });

    /* Menü bei Klick ausserhalb des Headers schliessen */
    document.addEventListener("click", function (event) {
        if (
            navToggle &&
            navToggle.checked &&
            navigation &&
            !event.target.closest("header")
        ) {
            closeMobileMenu();
        }
    });

    /* Menü beim Wechsel auf die Desktop-Ansicht zurücksetzen */
    window.addEventListener("resize", function () {
        if (window.innerWidth > 800) {
            closeMobileMenu();
        }
    });
});