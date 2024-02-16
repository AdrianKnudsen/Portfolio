document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.querySelector(".root");

  // Create the logo element
  const logo = document.createElement("img");
  logo.src = "../images/A-Logo.svg";
  logo.alt = "Logo";
  logo.classList.add("logo");

  // Create the hero image element
  const img = document.createElement("img");
  img.src = "../images/AdrianK.png";
  img.alt = "A image of the person that this portfolio is about";
  img.classList.add("portfolio-image");

  // Create the hero header element
  const header = document.createElement("h1");
  header.classList.add("hero-header");
  header.textContent = ".";

  // Creating span for the name "Adrian"
  const adrianSpan = document.createElement("span");
  adrianSpan.textContent = "Adrian";
  adrianSpan.classList.add("name-span");

  // Creating span for the name "Knudsen"
  const knudsenSpan = document.createElement("span");
  knudsenSpan.textContent = "Knudsen";
  knudsenSpan.classList.add("surname-span");

  // Appending the spans to the header
  header.appendChild(adrianSpan);
  header.append(" { ");
  header.appendChild(knudsenSpan);
  header.append(" } ");

  // Create the hero paragraph element
  const paragraph = document.createElement("p");
  paragraph.textContent =
    "Hei, jeg er Adrian Knudsen, en ivrig og dedikert kodningsstudent ved Kodehode i Bergen. Min lidenskap for teknologi og design driver meg i min reise etter å mestre ferdighetene innen webutvikling. Med en interesse for HTML, Css, JavaScript og React, er jeg i en kontinuerlig læringsprosess for å finpusse mine ferdigheter, holde meg oppdatert med de nyeste trendene og beste praksisene i bransjen.";
  paragraph.classList.add("hero-text");

  // Append the elements to the root element
  rootElement.appendChild(logo);
  rootElement.appendChild(img);
  rootElement.appendChild(header);
  rootElement.appendChild(paragraph);
});

/// Nav Meny ///

const elem = document.querySelector("#nav-bg"),
  toggleBtn = document.querySelector("#toggle-btn"),
  elemH = elem.getBoundingClientRect().height,
  elemW = elem.getBoundingClientRect().width;

let open = false;
let scale, offsetX, offsetY;

const calculateValues = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const offsetValue = Number(
    getComputedStyle(elem).getPropertyValue("--offset-value")
  );

  //  Offsets to center the circle
  offsetX = w / 2 - elemW / 2 - offsetValue;
  offsetY = h / 2 - elemH / 2 - offsetValue;

  const radius = Math.sqrt(h ** 2 + w ** 2);
  scale = radius / (elemW / 4) / 3 + 0.3;
  return scale;
};

const openMenu = () => {
  elem.style.setProperty("--translate-x", `${offsetY}px`);
  elem.style.setProperty("--translate-y", `-${offsetX}px`);
  elem.style.setProperty("--scale", scale);
};
const closeMenu = () => {
  elem.style.setProperty("--scale", 1);
  elem.style.setProperty("--translate-x", 0);
  elem.style.setProperty("--translate-y", 0);
};
const animateMenu = () => {
  open ? openMenu() : closeMenu();
};

const toggleMenu = () => {
  open = !open;
  animateMenu();
  toggleBtn.classList.toggle("shown");
};

const resizeHandler = () => {
  window.requestAnimationFrame(() => {
    calculateValues();
    animateMenu();
  });
};

calculateValues();

//toggleBtn.onclick = toggleMenu;
toggleBtn.addEventListener("click", toggleMenu, false);
window.addEventListener("resize", resizeHandler, false);
