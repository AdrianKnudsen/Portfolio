let open = false;

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.querySelector(".root");

  // Creating and appending the logo element directly to rootElement
  const logo = document.createElement("img");
  logo.src = "./A-Logo.svg";
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
    img.src = "./AdrianK.png";
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

  // Logo click event to reload hero content and hide other content if visible

  logo.addEventListener("click", () => {
    // Hide "Om Meg" content if visible
    const omMegContent = document.querySelector(".om-meg-content");
    if (omMegContent) {
      omMegContent.style.display = "none";
    }
    // Hide "Prosjekter" content if visible
    const prosjekterContent = document.querySelector(".prosjekter-content");
    if (prosjekterContent) {
      prosjekterContent.style.display = "none";
    }
    // Hide "kontant" content if visible
    const kontaktContent = document.querySelector(".kontakt-content");
    if (kontaktContent) {
      kontaktContent.style.display = "none";
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
    } else if (item.text === "Prosjekter") {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        showProsjekterContent();
        if (open) toggleMenu();
      });
    } else if (item.text === "Kontakt") {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        showKontaktContent();
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

  // Hide or clear hero content
  const heroContainer = document.querySelector(".hero-container");
  if (heroContainer) {
    heroContainer.style.display = "none";
  }
  // Hide "prosjekt" content if it exsist
  const prosjekterContent = document.querySelector(".prosjekter-content");
  if (prosjekterContent) {
    prosjekterContent.style.display = "none";
  }
  // Hide "kontakt" content if it exsist
  const kontaktContent = document.querySelector(".kontakt-content");
  if (kontaktContent) {
    kontaktContent.style.display = "none";
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

// Function to handle the "Prosjekt" content
function showProsjekterContent() {
  // Hide the hero content and any other content
  const heroContainer = document.querySelector(".hero-container");
  heroContainer.style.display = "none";

  // Hide "Om Meg" content if it exists
  const omMegContent = document.querySelector(".om-meg-content");
  if (omMegContent) {
    omMegContent.style.display = "none";
  }

  // Hide "kontakt" content if it exsist
  const kontaktContent = document.querySelector(".kontakt-content");
  if (kontaktContent) {
    kontaktContent.style.display = "none";
  }

  // Check if the "Prosjekter" content already exists
  let prosjekterContent = document.querySelector(".prosjekter-content");
  if (!prosjekterContent) {
    prosjekterContent = document.createElement("div");
    prosjekterContent.classList.add("prosjekter-content");

    // Dynamically create and append the carousel to the "Prosjekter" content
    createAndAppendCarousel(prosjekterContent);

    document.querySelector(".root").appendChild(prosjekterContent);
  } else {
    prosjekterContent.style.display = "block";
  }
}

function createAndAppendCarousel(parentElement) {
  const carouselBox = document.createElement("div");
  carouselBox.className = "carousel-Box";

  // Create the slider
  const slider = document.createElement("div");
  slider.className = "slider";

  // Inputs for the carousel
  const inputIds = ["btn-1", "btn-2", "btn-3"];
  inputIds.forEach((id, index) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "toggle";
    input.id = id;
    if (index === 0) input.checked = true;
    slider.appendChild(input);
  });

  // Slider controls
  const sliderControls = document.createElement("div");
  sliderControls.className = "slider-controls";
  inputIds.forEach((id) => {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    sliderControls.appendChild(label);
  });

  slider.appendChild(sliderControls);

  // Slides
  const slides = document.createElement("ul");
  slides.className = "slides";

  // Information for each slide
  const slideInfos = [
    {
      title: "Luna Link",
      text: "Dette var et prosjekt jeg jobbet på mens jeg gikk på Kodehode, personelig stod jeg hovedsaklig for design, men hadde også ansvar for header og søk/filtrering logikk.",
      tools: "React, JavaScript, CSS, html",
      imageSrc: "./Luna Link.jpeg",
      githubLink: "https://github.com/AdrianK-B06/Luna-Link.git",
      liveSiteLink: "https://lunalink.netlify.app",
    },
    {
      title: "Tech Blog",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat dignissimos commodi eos totam perferendis possimus dolorem, deleniti vitae harum? Enim.",
      tools: "React, TypeScript, CSS, html",
      imageSrc: "./The Tech Blog.jpeg",
      githubLink: "https://github.com/AdrianK-B06/React-Oppgave-1.git",
      liveSiteLink: "https://tech-blog-demo.netlify.app",
    },
    {
      title: "Next Tv",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat dignissimos commodi eos totam perferendis possimus dolorem, deleniti vitae harum? Enim.",
      tools: "React, TypeScript, CSS, html",
      imageSrc: "./Next-tv.jpeg",
      githubLink: "https://github.com/AdrianK-B06/Stream-finder-nexttv.git",
      liveSiteLink: "https://next-tv.netlify.app",
    },
  ];

  slideInfos.forEach((slideInfo) => {
    const li = document.createElement("li");
    li.className = "slide";

    // Image
    const img = document.createElement("img");
    img.className = "slide-image";
    img.src = slideInfo.imageSrc;
    img.alt = slideInfo.alt;
    img.width = 320;
    img.height = 240;
    li.appendChild(img);

    // Slide content
    const div = document.createElement("div");
    div.className = "slide-content";

    // Project titel
    const h2 = document.createElement("h2");
    h2.className = "slide-title";
    h2.textContent = slideInfo.title;
    div.appendChild(h2);

    // Description text
    const p = document.createElement("p");
    p.className = "slide-text";
    p.textContent = slideInfo.text;
    div.appendChild(p);

    // Tools used text box
    const toolsP = document.createElement("p");
    toolsP.className = "slide-tools";
    toolsP.textContent = "Verktøy: " + slideInfo.tools;
    div.appendChild(toolsP);

    // GitHub link
    const githubLink = document.createElement("a");
    githubLink.href = slideInfo.githubLink;
    githubLink.className = "slide-link";
    githubLink.textContent = "GitHub";
    githubLink.target = "_blank"; // Open in a new tab
    div.appendChild(githubLink);

    // Live site link
    const liveSiteLink = document.createElement("a");
    liveSiteLink.href = slideInfo.liveSiteLink;
    liveSiteLink.className = "slide-link";
    liveSiteLink.textContent = "Live Site";
    liveSiteLink.target = "_blank"; // Open in a new tab
    div.appendChild(liveSiteLink);

    li.appendChild(div);
    slides.appendChild(li);
  });

  slider.appendChild(slides);
  carouselBox.appendChild(slider);
  parentElement.appendChild(carouselBox);
}

// Function to handle the "Kontakt" content
function showKontaktContent() {
  // Hide "hero" content
  const heroContainer = document.querySelector(".hero-container");
  heroContainer.style.display = "none";

  // Hide "Om Meg" content if it exsist
  const omMegContent = document.querySelector(".om-meg-content");
  if (omMegContent) {
    omMegContent.style.display = "none";
  }

  // Hide "Prosjekter" if it exsist
  const prosjekterContent = document.querySelector(".prosjekter-content");
  if (prosjekterContent) {
    prosjekterContent.style.display = "none";
  }

  // Check if the "Prosjekter" content already exists
  let kontaktContent = document.querySelector(".kontakt-content");
  if (!kontaktContent) {
    kontaktContent = document.createElement("div");
    kontaktContent.classList.add("kontakt-content");

    // Create and append the content specific to "Kontakt"
    const h2 = document.createElement("h2");
    h2.textContent = "Kontakt";
    kontaktContent.appendChild(h2);

    // Example paragraph or could be dynamic project listings
    const p = document.createElement("p");
    p.textContent = "Ta kontakt.";
    kontaktContent.appendChild(p);

    document.querySelector(".root").appendChild(kontaktContent);
  } else {
    // If it already exists, ensure it's visible
    kontaktContent.style.display = "block";
  }
}
