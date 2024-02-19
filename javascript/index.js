let open = false;

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.querySelector(".root");

  // Creating and appending the logo element directly to rootElement
  const logo = document.createElement("img");
  logo.src = "./images/A-Logo.svg";
  logo.alt = "Logo";
  logo.classList.add("logo");
  rootElement.appendChild(logo);

  // Creating a hero div for the main hero content to live in
  const heroContainer = document.createElement("div");
  heroContainer.classList.add("hero-container");
  rootElement.appendChild(heroContainer);

  // Function to create hero content
  function createHeroContent() {
    heroContainer.innerHTML = ""; // Clears the hero container before adding new content

    // Creating the hero image element
    const img = document.createElement("img");
    img.src = "./images/AdrianK.png";
    img.alt = "A image of the person that this portfolio is about";
    img.classList.add("portfolio-image");
    heroContainer.appendChild(img);

    // Creating the hero header element
    const header = document.createElement("h1");
    header.classList.add("hero-header");
    const adrianSpan = document.createElement("span");
    adrianSpan.textContent = "Adrian";
    adrianSpan.classList.add("name-span");
    header.appendChild(adrianSpan);
    header.append(" { ");
    const knudsenSpan = document.createElement("span");
    knudsenSpan.textContent = "Knudsen";
    knudsenSpan.classList.add("surname-span");
    header.appendChild(knudsenSpan);
    header.append(" } ");
    heroContainer.appendChild(header);

    // Creating the hero paragraph element
    const paragraph = document.createElement("p");
    paragraph.textContent =
      "Hei, jeg heter Adrian og er en ivrig kode student ved Kodehode i Bergen. Jeg ser på meg selv som en designer med kode kunnskaper, da jeg har holdt på med design mye lengre enn koding. Jeg trives best i Figma og med Css, men syntes JavaScript og TypeScript er spennende og ønsker å fordype meg enda mer i disse språkene. På fritiden liker jeg å spille dataspill og favoritt sjanger er fps og survival spill. Tidligere har jeg også jobbet som freelance designer hos Knudsen Grafisk AS. I 2011 hadde jeg en kunstutstilling i Bergen hvor jeg viste fram digital kunst jeg hadde laget i Photoshop.";
    paragraph.classList.add("hero-text");
    heroContainer.appendChild(paragraph);
  }

  // Initially create hero content
  createHeroContent();

  // Logo click event to reload hero content and hide "Om Meg" content if visible
  logo.addEventListener("click", () => {
    const omMegContent = document.querySelector(".om-meg-content");
    if (omMegContent) {
      omMegContent.style.display = "none";
    }
    createHeroContent();
    heroContainer.style.display = "";
  });

  // Creating the navigation background
  const navBg = document.createElement("div");
  navBg.id = "nav-bg";
  navBg.classList.add("btn");
  rootElement.appendChild(navBg);

  // Creating the toggle button
  const toggleBtn = document.createElement("div");
  toggleBtn.id = "toggle-btn";
  toggleBtn.classList.add("btn");
  rootElement.appendChild(toggleBtn);

  // Creating the spans for hamburger icon
  for (let i = 0; i < 3; i++) {
    const span = document.createElement("span");
    toggleBtn.appendChild(span);
  }

  // Creating the navigation wrapper
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  rootElement.appendChild(wrapper);

  const nav = document.createElement("nav");
  wrapper.appendChild(nav);

  const ul = document.createElement("ul");
  nav.appendChild(ul);

  // Defining and creating menu items
  const menuItems = [
    { text: "Om Meg", href: "#om-meg" },
    { text: "Prosjekter", href: "#prosjekter" },
    { text: "Kontakt", href: "#kontakt" },
  ];

  menuItems.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.classList.add("link");
    a.href = item.href;
    a.textContent = item.text;
    li.appendChild(a);
    ul.appendChild(li);

    if (item.text === "Om Meg") {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        showOmMegContent();
        if (open) toggleMenu();
      });
    }
  });

  // Menu animation functions
  function calculateValues() {
    const elemH = navBg.getBoundingClientRect().height;
    const elemW = navBg.getBoundingClientRect().width;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const offsetValue = Number(
      getComputedStyle(navBg).getPropertyValue("--offset-value")
    );
    offsetX = w / 2 - elemW / 2 - offsetValue;
    offsetY = h / 2 - elemH / 2 - offsetValue;
    const radius = Math.sqrt(h ** 2 + w ** 2);
    scale = radius / (elemW / 4) / 3 + 0.3;
  }

  function openMenu() {
    navBg.style.setProperty("--translate-x", `${offsetY}px`);
    navBg.style.setProperty("--translate-y", `-${offsetX}px`);
    navBg.style.setProperty("--scale", scale);
  }

  function closeMenu() {
    navBg.style.setProperty("--scale", 1);
    navBg.style.setProperty("--translate-x", 0);
    navBg.style.setProperty("--translate-y", 0);
  }

  function animateMenu() {
    open ? openMenu() : closeMenu();
  }

  function toggleMenu() {
    open = !open;
    animateMenu();
    toggleBtn.classList.toggle("shown", open);
  }

  // Initial calculation
  calculateValues();

  // Event listeners
  toggleBtn.addEventListener("click", toggleMenu, false);
  window.addEventListener("resize", () => {
    window.requestAnimationFrame(() => {
      calculateValues();
      animateMenu();
    });
  });
});

// Function to handle the "Om Meg" content
function showOmMegContent() {
  console.log("Om Meg content is being loaded"); // Debugging line

  // Hide or clear existing content
  const heroContainer = document.querySelector(".hero-container");
  if (heroContainer) {
    heroContainer.style.display = "none";
  }

  // Check if the Om Meg content already exists
  let omMegContent = document.querySelector(".om-meg-content");
  if (!omMegContent) {
    // Create the Om Meg container div
    omMegContent = document.createElement("div");
    omMegContent.classList.add("om-meg-content");

    // Create the span element for the hash symbol
    const hashSpan = document.createElement("span");
    hashSpan.textContent = "#";
    hashSpan.classList.add("hash-symbol");

    // Create the h2 element for the title
    const h2 = document.createElement("h2");
    h2.classList.add("om-meg-titel");

    // Append the hash span to the h2 element before the title text
    h2.appendChild(hashSpan);
    h2.append("Om Meg");
    omMegContent.appendChild(h2);

    // Create the p element for the detailed text
    const p = document.createElement("p");
    p.innerHTML =
      "Min kjærlighet for design kommer til syne ikke bare i mine kodingsprosjekter, men også i min hverdag. Jeg tror sterkt på at god design er mer enn bare estetikk; det handler om å skape en intuitiv og effektiv brukeropplevelse. Denne filosofien reflekteres i mitt arbeid hvor jeg alltid søker etter innovative løsninger som balanserer funksjonalitet med et visuelt tiltalende utseende.<br><br>Å spille dataspill, se på filmer og serier gir meg ikke bare en sjanse til å slappe av, men også inspirasjon. Jeg lærer om forskjellige historiefortellingsmetoder, karakterutvikling og visuelle effekter, som alle bidrar til min kreative tankeprosess.<br><br>Som en dedikert og nysgjerrig utvikler, er jeg alltid på utkikk etter muligheter til å anvende mine ferdigheter i virkelige prosjekter. Jeg er ivrig etter å bidra til et team med min tekniske kunnskap og kreative innsikt. Ta en titt på min portfolio for å se et utvalg av mine prosjekter, og føl deg fri til å kontakte meg for eventuelle samarbeidsmuligheter.<br><br>Takk for at du vurderer min portfolio. Jeg ser frem til muligheten til å bringe mine ferdigheter og lidenskap til ditt team.";

    p.classList.add("om-meg-text");
    omMegContent.appendChild(p);

    // Append the Om Meg content div to the root element
    document.querySelector(".root").appendChild(omMegContent);
  } else {
    // If it already exists, ensure it's visible
    omMegContent.style.display = "block";
  }
}
