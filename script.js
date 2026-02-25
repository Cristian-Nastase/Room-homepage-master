// Slider

let currentSlide = 0;

async function getData() {
    const response = await fetch("data.json");

    return response.json();
}

const data = await getData();

document.getElementById("left-button").addEventListener("click", handleSliderClick);
document.getElementById("right-button").addEventListener("click", handleSliderClick);

function handleSliderClick(e) {
    const index = e.currentTarget.dataset.slideChange * 1;

    currentSlide = currentSlide + index;

    // Overflow cases
    if (currentSlide < 0) currentSlide = data.slides.length + currentSlide;
    else currentSlide %= data.slides.length;

    loadSlide(currentSlide);
}

const headlineItem =
{
    heroHeader: document.querySelector(".hero__header"),
    heroParagraph: document.querySelector(".hero__paragraph"),
    heroButton: document.querySelector(".hero__button")
};

const heroPicture =
{
    source: document.querySelector(".hero__picture source"),
    img: document.querySelector(".hero__picture img")
};

const heroImageAppear = [{ opacity: 0.5, filter: "brightness(0.2)", transform: "scale(1.5)" }, { opacity: 1, filter: "brightness(1)", transform: "scale(1)" }];
const heroHeadlineAppear = [{ opacity: 0 }, { opacity: 1 }];

function loadSlide(index) {
    heroPicture.img.animate(heroImageAppear, 500);
    for (const key in headlineItem) {
        const item = headlineItem[key];
        item.animate(heroHeadlineAppear, 1000);
    }

    heroPicture.source.setAttribute("srcset", data.slides[index].picture.desktop);

    heroPicture.img.src = data.slides[index].picture.mobile;
    heroPicture.img.alt = `Hero image ${index + 1}`;

    headlineItem.heroHeader.textContent = data.slides[index].header;
    headlineItem.heroParagraph.textContent = data.slides[index].paragraph;
}

// Nav for mobile

const nav = document.querySelector(".nav");

const openNavButton = document.querySelector(".nav__burger");
const navLogo = document.querySelector(".nav__logo");

const closeNavButton = document.querySelector(".nav__close");
const linkList = document.querySelector(".nav__list");

const closeNavAnimation =
    [{ transform: "translateX(100%)", opacity: 0 }, { transform: "translateX(0)", opacity: 1 }];


closeNavButton.addEventListener("click", function () {
    nav.animate(closeNavAnimation, 300);
    toggleNavHide();
});

function toggleHide(element) {
    element.toggleAttribute("data-hidden");
    element.classList.toggle("hidden");
}

function toggleNavHide() {
    const navElements = [openNavButton, closeNavButton, navLogo, linkList];

    for (const element of navElements) {
        toggleHide(element);
    }

    nav.classList.toggle("nav--opened");
}

const breakpoint = "(min-width: 63em)";

window.matchMedia(breakpoint).addEventListener("change", changeUIBreakpoint);
changeUIBreakpoint();

function changeUIBreakpoint() {
    if (window.matchMedia(breakpoint).matches) {
        changeToDesktopNav();
    }
    else {
        changeToMobileNav();
    }
}

function changeToDesktopNav() {
    openNavButton.removeEventListener("click", toggleNavHide);

    if (nav.classList.contains("nav--opened")) {
        nav.classList.remove("nav--opened");
    }

    linkList.classList.add("nav__list--desktop");
    nav.classList.add("nav--desktop");

    const navElements = [openNavButton, closeNavButton, navLogo, linkList];
    const showOnDesktop = [linkList, navLogo];

    for (const element of navElements) {
        if (showOnDesktop.includes(element)) {
            hideOrShow(element, false);
        }
        else {
            hideOrShow(element, true);
        }
    }
}

function changeToMobileNav() {
    openNavButton.addEventListener("click", toggleNavHide);
    linkList.classList.remove("nav__list--desktop");
    nav.classList.remove("nav--desktop");

    const navElements = [openNavButton, closeNavButton, navLogo, linkList];
    const showOnMobile = [openNavButton, navLogo];

    for (const element of navElements) {
        if (showOnMobile.includes(element)) {
            hideOrShow(element, false);
        }
        else {
            hideOrShow(element, true);
        }
    }
}

// true = hide, false = unhide
function hideOrShow(element, value) {
    element.setAttribute("data-hidden", String(value));
    value ? element.classList.add("hidden") : element.classList.remove("hidden");
}