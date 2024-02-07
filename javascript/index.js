document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.querySelector(".root");

  // Create the image element
  const img = document.createElement("img");
  img.src = "../images/AdrianK.png";
  img.alt = "A image of the person that this portfolio is about";
  img.classList.add("portfolio-image");

  // Create header element
  const header = document.createElement("h1");
  header.textContent = ".Adrian {Knudsen}";
  header.classList.add("hero-header");

  // Create paragraph element
  const paragraph = document.createElement("p");
  paragraph.textContent =
    "Hei, jeg er Adrian Knudsen, en ivrig og dedikert kodningsstudent ved Kodehode i Bergen. Min lidenskap for teknologi og design driver meg i min streben etter å mestre ferdighetene innen webutvikling. Med en interesse for HTML, Css, JavaScript og React, er jeg i en kontinuerlig læringsprosess for å finpusse mine ferdigheter og holde meg oppdatert med de nyeste trendene og beste praksisene i bransjen.";

  // Append the elements to the root element
  rootElement.appendChild(img);
  rootElement.appendChild(header);
  rootElement.appendChild(paragraph);
});
