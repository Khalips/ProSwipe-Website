console.log("ProSwipe website loaded successfully.");


/* =========================
   Mobile Navigation
========================= */

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


/* =========================
   Hero Opportunity Slider
========================= */

const opportunities = [

    {
        category: "University Programme",
        match: "92% Match",
        title: "BSc Engineering",

        description:
            "Your academic profile matches the requirements for this opportunity.",

        details: [
            ["APS", "✓ Match"],
            ["Subjects", "✓ Match"],
            ["Requirements", "✓ Match"]
        ]
    },

    {
        category: "Bursary Opportunity",
        match: "88% Match",
        title: "STEM Support Bursary",

        description:
            "Your academic and financial profile indicates that you may qualify for this bursary opportunity.",

        details: [
            ["Academic Results", "✓ Match"],
            ["Field of Study", "✓ Match"],
            ["Financial Criteria", "✓ Match"]
        ]
    }

];


/* =========================
   Opportunity Card Elements
========================= */

const cardCategory = document.getElementById("card-category");
const matchScore = document.getElementById("match-score");

const cardTitle = document.getElementById("card-title");
const cardDescription = document.getElementById("card-description");

const detailLabel1 = document.getElementById("detail-label-1");
const detailValue1 = document.getElementById("detail-value-1");

const detailLabel2 = document.getElementById("detail-label-2");
const detailValue2 = document.getElementById("detail-value-2");

const detailLabel3 = document.getElementById("detail-label-3");
const detailValue3 = document.getElementById("detail-value-3");

const previousButton = document.getElementById("previous-opportunity");
const nextButton = document.getElementById("next-opportunity");

const opportunityCard = document.getElementById("opportunity-card");


/* =========================
   Current Opportunity
========================= */

let currentOpportunity = 0;


/* =========================
   Display Opportunity
========================= */

function displayOpportunity(index) {

    const opportunity = opportunities[index];

    cardCategory.textContent = opportunity.category;

    matchScore.textContent = opportunity.match;

    cardTitle.textContent = opportunity.title;

    cardDescription.textContent =
        opportunity.description;


    detailLabel1.textContent =
        opportunity.details[0][0];

    detailValue1.textContent =
        opportunity.details[0][1];


    detailLabel2.textContent =
        opportunity.details[1][0];

    detailValue2.textContent =
        opportunity.details[1][1];


    detailLabel3.textContent =
        opportunity.details[2][0];

    detailValue3.textContent =
        opportunity.details[2][1];
}


/* =========================
   Next Opportunity
========================= */

nextButton.addEventListener("click", function () {

    currentOpportunity++;

    if (currentOpportunity >= opportunities.length) {

        currentOpportunity = 0;
    }

    displayOpportunity(currentOpportunity);
});


/* =========================
   Previous Opportunity
========================= */

previousButton.addEventListener("click", function () {

    currentOpportunity--;

    if (currentOpportunity < 0) {

        currentOpportunity =
            opportunities.length - 1;
    }

    displayOpportunity(currentOpportunity);
});


/* =========================
   Mobile Swipe Gesture
========================= */

let touchStartX = 0;
let touchEndX = 0;


opportunityCard.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.changedTouches[0].screenX;
    }
);


opportunityCard.addEventListener(
    "touchend",
    function (event) {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();
    }
);


/* =========================
   Handle Swipe Direction
========================= */

function handleSwipe() {

    const swipeDistance =
        touchEndX - touchStartX;

    const minimumSwipeDistance = 50;


    /* Swipe Left - Next Opportunity */

    if (swipeDistance < -minimumSwipeDistance) {

        currentOpportunity++;

        if (
            currentOpportunity >=
            opportunities.length
        ) {

            currentOpportunity = 0;
        }

        displayOpportunity(currentOpportunity);
    }


    /* Swipe Right - Previous Opportunity */

    if (swipeDistance > minimumSwipeDistance) {

        currentOpportunity--;

        if (currentOpportunity < 0) {

            currentOpportunity =
                opportunities.length - 1;
        }

        displayOpportunity(currentOpportunity);
    }
}