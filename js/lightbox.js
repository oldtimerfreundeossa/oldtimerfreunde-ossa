document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = Array.from(document.querySelectorAll("[data-lightbox]"));

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");

    const closeButton = lightbox.querySelector(".lightbox-close");
    const previousButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");

    let currentIndex = 0;

    function showImage(index) {
        if (galleryItems.length === 0) {
            return;
        }

        currentIndex = (index + galleryItems.length) % galleryItems.length;

        const currentItem = galleryItems[currentIndex];
        const currentImage = currentItem.querySelector("img");

        const imageSource = currentItem.getAttribute("href") || currentImage.getAttribute("src");

        const caption = currentItem.dataset.caption || currentImage.getAttribute("alt") || "";

        lightboxImage.src = imageSource;
        lightboxImage.alt = currentImage.getAttribute("alt") || caption;

        lightboxCaption.textContent = caption;
        lightboxCaption.hidden = caption.length === 0;
    }

    function openLightbox(index) {
        showImage(index);

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("lightbox-open");

        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.classList.remove("lightbox-open");

        galleryItems[currentIndex].focus();
    }

    function showPreviousImage() {
        showImage(currentIndex - 1);
    }

    function showNextImage() {
        showImage(currentIndex + 1);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            openLightbox(index);
        });
    });

    closeButton.addEventListener("click", closeLightbox);
    previousButton.addEventListener("click", showPreviousImage);
    nextButton.addEventListener("click", showNextImage);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("open")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showPreviousImage();
        }

        if (event.key === "ArrowRight") {
            showNextImage();
        }
    });
});