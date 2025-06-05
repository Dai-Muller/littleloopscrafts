const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalMeasures = document.getElementById("modalMeasures");
const modalPrice = document.getElementById("modalPrice");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const galleryItems = document.querySelectorAll(".gallery-item");

let currentIndex = 0;

function openModal(index) {
    const item = galleryItems[index];
    const img = item.querySelector("img");
    const name = item.querySelector(".product-name")?.textContent || "Product info";
    const pagePrice = item.querySelector(".product-price")?.textContent || "Product price";

    modalImg.src = img.src;
    modalTitle.textContent = name;
    modalDescription.textContent = item.dataset.description;
    modalMeasures.textContent = item.dataset.measures;
    modalPrice.textContent = pagePrice;
    modal.style.display = "flex";

    currentIndex = index;
}

galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openModal(index));
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openModal(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openModal(currentIndex);
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// --- Swipe support for mobile ---
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
    const swipeThreshold = 50; // minimum distance for swipe
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped left → go to next image
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openModal(currentIndex);
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped right → go to previous image
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openModal(currentIndex);
    }
}

// Attach swipe events to the modal-content
const modalContent = document.querySelector(".modal-content");

modalContent.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

modalContent.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});