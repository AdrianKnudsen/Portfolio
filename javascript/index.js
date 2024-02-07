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
    "Hei, jeg er Adrian Knudsen, en ivrig og dedikert kodningsstudent ved Kodehode i Bergen. Min lidenskap for teknologi og design driver meg i min reise etter å mestre ferdighetene innen webutvikling. Med en interesse for HTML, Css, JavaScript og React, er jeg i en kontinuerlig læringsprosess for å finpusse mine ferdigheter og holde meg oppdatert med de nyeste trendene og beste praksisene i bransjen.";
  paragraph.classList.add("hero-text");

  // Append the elements to the root element
  rootElement.appendChild(logo);
  rootElement.appendChild(img);
  rootElement.appendChild(header);
  rootElement.appendChild(paragraph);
});
