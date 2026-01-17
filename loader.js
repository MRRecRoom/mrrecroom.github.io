window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    if (loader) {
        loader.classList.add("hidden");

        // Optional: remove loader from DOM after animation
        setTimeout(() => {
            loader.remove();
        }, 750);
    }
});
