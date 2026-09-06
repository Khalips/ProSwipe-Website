console.log("ProSwipe website loaded successfully.");


/* =========================
   Reduced Motion Preference
========================= */

// Check whether the user prefers reduced animations
const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


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
const navigationLinks =
    document.querySelectorAll("#nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    });
});


// Reset mobile menu when returning to desktop size
window.addEventListener("resize", function () {

    /*
        The CSS changes to the hamburger navigation
        at 1100px, so JavaScript should use the same
        breakpoint.
    */
    if (window.innerWidth > 1100) {

        navLinks.classList.remove("active");

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

const cardCategory =
    document.getElementById("card-category");

const matchScore =
    document.getElementById("match-score");

const cardTitle =
    document.getElementById("card-title");

const cardDescription =
    document.getElementById("card-description");

const detailLabel1 =
    document.getElementById("detail-label-1");

const detailValue1 =
    document.getElementById("detail-value-1");

const detailLabel2 =
    document.getElementById("detail-label-2");

const detailValue2 =
    document.getElementById("detail-value-2");

const detailLabel3 =
    document.getElementById("detail-label-3");

const detailValue3 =
    document.getElementById("detail-value-3");

const previousButton =
    document.getElementById("previous-opportunity");

const nextButton =
    document.getElementById("next-opportunity");

const opportunityCard =
    document.getElementById("opportunity-card");


/* =========================
   Current Opportunity
========================= */

let currentOpportunity = 0;


/*
    Prevent another swipe from starting while
    the current swipe animation is still running.
*/
let isSwiping = false;


/* =========================
   Display Opportunity
========================= */

function displayOpportunity(index) {

    const opportunity = opportunities[index];

    cardCategory.textContent =
        opportunity.category;

    matchScore.textContent =
        opportunity.match;

    cardTitle.textContent =
        opportunity.title;

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
   Smooth Card Swipe
========================= */

function swipeOpportunity(direction, updateOpportunity) {

    /*
        If the user prefers reduced motion,
        immediately change the opportunity
        without performing the swipe animation.
    */
    if (prefersReducedMotion) {

        updateOpportunity();

        return;
    }


    /*
        Prevent several clicks or swipes from
        interfering with the current animation.
    */
    if (isSwiping) {

        return;
    }

    isSwiping = true;


    let swipeOutClass;
    let swipeInClass;


    /*
        NEXT OPPORTUNITY

        Current card leaves to the left.
        New card enters from the right.
    */
    if (direction === "next") {

        swipeOutClass = "swipe-out-left";

        swipeInClass = "swipe-in-right";
    }


    /*
        PREVIOUS OPPORTUNITY

        Current card leaves to the right.
        New card enters from the left.
    */
    else {

        swipeOutClass = "swipe-out-right";

        swipeInClass = "swipe-in-left";
    }


    // Animate the current card out
    opportunityCard.classList.add(
        swipeOutClass
    );


    /*
        Wait for the outgoing animation to finish
        before changing the content.
    */
    setTimeout(function () {

        /*
            Update the opportunity while the
            card is invisible.
        */
        updateOpportunity();


        // Remove outgoing position
        opportunityCard.classList.remove(
            swipeOutClass
        );


        /*
            Place the new opportunity just outside
            the card area.
        */
        opportunityCard.classList.add(
            swipeInClass
        );


        /*
            Force the browser to register the
            new starting position before removing
            the class.

            This allows the transition back to
            the centre to actually animate.
        */
        void opportunityCard.offsetWidth;


        // Animate the new opportunity into view
        opportunityCard.classList.remove(
            swipeInClass
        );


        /*
            Allow another swipe once the incoming
            animation has finished.
        */
        setTimeout(function () {

            isSwiping = false;

        }, 350);

    }, 350);
}


/* =========================
   Show Next Opportunity
========================= */

function showNextOpportunity() {

    swipeOpportunity("next", function () {

        currentOpportunity++;

        // Return to the first item after the last one
        if (
            currentOpportunity >=
            opportunities.length
        ) {

            currentOpportunity = 0;
        }

        displayOpportunity(
            currentOpportunity
        );
    });
}


/* =========================
   Show Previous Opportunity
========================= */

function showPreviousOpportunity() {

    swipeOpportunity("previous", function () {

        currentOpportunity--;

        // Move to the final item before the first one
        if (currentOpportunity < 0) {

            currentOpportunity =
                opportunities.length - 1;
        }

        displayOpportunity(
            currentOpportunity
        );
    });
}


/* =========================
   Opportunity Buttons
========================= */

// Right arrow - next opportunity
nextButton.addEventListener(
    "click",
    showNextOpportunity
);


// Left arrow - previous opportunity
previousButton.addEventListener(
    "click",
    showPreviousOpportunity
);


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


    /*
        Swipe finger LEFT
        -> show NEXT opportunity
    */
    if (
        swipeDistance <
        -minimumSwipeDistance
    ) {

        showNextOpportunity();
    }


    /*
        Swipe finger RIGHT
        -> show PREVIOUS opportunity
    */
    else if (
        swipeDistance >
        minimumSwipeDistance
    ) {

        showPreviousOpportunity();
    }
}


/* =========================
   Scroll Reveal Animation
========================= */

// Find all elements that have the "reveal" class
const revealElements =
    document.querySelectorAll(".reveal");


// Create an observer that checks when
// elements enter the screen
const revealObserver =
    new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                /*
                    Animate the element once it
                    becomes visible.
                */
                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    /*
                        Stop watching the element
                        after it has animated once.
                    */
                    observer.unobserve(
                        entry.target
                    );
                }
            });
        },

        {
            // Start when about 15% is visible
            threshold: 0.15,

            // Slightly delay the bottom trigger
            rootMargin: "0px 0px -40px 0px"
        }
    );


// Start observing every reveal element
revealElements.forEach(function (element) {

    revealObserver.observe(element);
});


/* =========================
   Hero Typing Animation
========================= */

const typedMain =
    document.getElementById("typed-main");

const typedHighlight =
    document.getElementById("typed-highlight");

const typingCursor =
    document.querySelector(".typing-cursor");


// Text used in the Hero heading
const mainText =
    "Find opportunities";

const highlightText =
    "that fit you.";


// Typing speed in milliseconds
const typingSpeed = 45;


// Keeps track of the current character
let currentIndex = 0;


/* =========================
   Type Main Hero Text
========================= */

function typeMainText() {

    if (currentIndex < mainText.length) {

        typedMain.textContent +=
            mainText[currentIndex];

        currentIndex++;

        setTimeout(
            typeMainText,
            typingSpeed
        );

    } else {

        /*
            Reset the index before starting
            the highlighted second line.
        */
        currentIndex = 0;

        typeHighlightText();
    }
}


/* =========================
   Type Highlighted Hero Text
========================= */

function typeHighlightText() {

    if (
        currentIndex <
        highlightText.length
    ) {

        typedHighlight.textContent +=
            highlightText[currentIndex];

        currentIndex++;

        setTimeout(
            typeHighlightText,
            typingSpeed
        );

    } else {

        /*
            Allow the cursor to blink briefly
            after typing has finished.
        */
        setTimeout(function () {

            typingCursor.classList.add(
                "finished"
            );

        }, 600);
    }
}


/* =========================
   Start Hero Typing
========================= */

if (prefersReducedMotion) {

    /*
        Users who prefer reduced motion see
        the complete heading immediately.
    */

    typedMain.textContent =
        mainText;

    typedHighlight.textContent =
        highlightText;

    typingCursor.classList.add(
        "finished"
    );

} else {

    // Small delay before typing begins
    setTimeout(
        typeMainText,
        300
    );
}

/* =========================
   Active Navbar Highlighting
========================= */

// Select only the main navbar links that point to page sections
const mainNavLinks =
    document.querySelectorAll('#nav-links a[href^="#"]');


// Create a list of the sections referenced by the navbar
const pageSections = [];

mainNavLinks.forEach(function (link) {

    const sectionId =
        link.getAttribute("href");

    // Ignore empty "#" links if any still exist
    if (sectionId === "#") {
        return;
    }

    const section =
        document.querySelector(sectionId);

    if (section) {
        pageSections.push(section);
    }
});


/*
    Updates the active navbar link based on
    the section currently being viewed.
*/
function setActiveNavLink(sectionId) {

    mainNavLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + sectionId
        ) {

            link.classList.add("active");
        }
    });
}


/* =========================
   Observe Page Sections
========================= */

const navigationObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                /*
                    A section becomes active when
                    it enters the central viewing
                    area of the screen.
                */
                if (entry.isIntersecting) {

                    setActiveNavLink(
                        entry.target.id
                    );
                }
            });
        },

        {
            /*
                Shrink the observed area from the
                top and bottom.

                This helps compensate for the sticky
                navbar and makes the active section
                change around the middle of the screen.
            */
            rootMargin:
                "-35% 0px -55% 0px",

            threshold: 0
        }
    );


// Observe every page section
pageSections.forEach(function (section) {

    navigationObserver.observe(section);
});