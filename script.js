console.log("ProSwipe website loaded successfully.");

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");


// Open / close the mobile menu
menuToggle.addEventListener("click", function () {

    const menuIsOpen = navLinks.classList.toggle("active");

    if (menuIsOpen) {

        menuToggle.textContent = "✕";

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    } else {

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }
});


// Close menu when a navigation link is clicked
const navigationLinks = document.querySelectorAll("#nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    });
});


// Reset mobile menu when returning to desktop size
window.addEventListener("resize", function () {

    if (window.innerWidth > 900) {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }
});