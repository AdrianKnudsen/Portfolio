// =============================================================================
// BACKGROUND ANIMATION
// Spawns floating balls with random colors, positions, and sizes.
// Balls are appended directly to <body> so they sit behind all content.
// =============================================================================

const colors = ["#e0e0e0", "#363636", "#9a9d21", "#363636", "#9a9d21"];
const numBalls = 50;
const balls = [];

const ballLayer = document.createElement("div");
ballLayer.classList.add("ball-layer");
document.body.append(ballLayer);

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 85)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 85)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;

  balls.push(ball);
  ballLayer.append(ball);
}

// Animate each ball along a random path, alternating direction infinitely
balls.forEach((el, i) => {
  const to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11), // even-indexed balls drift left, odd drift right
    y: Math.random() * 12,
  };

  el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` },
    ],
    {
      duration: (Math.random() + 1) * 7000,
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out",
    },
  );
});

// =============================================================================
// DOM SETUP
// Runs after the DOM is ready. Builds the logo, hero container, and navigation.
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.querySelector(".root");

  // --- Logo ---
  const logo = document.createElement("img");
  logo.src = "./svg/A-Logo.svg";
  logo.alt = "Logo";
  logo.classList.add("logo");
  rootElement.appendChild(logo);

  // --- Hero container ---
  // All hero content lives inside this div so it can be shown/hidden as a unit
  const heroContainer = document.createElement("div");
  heroContainer.classList.add("hero-container");
  rootElement.appendChild(heroContainer);

  // ---------------------------------------------------------------------------
  // HERO CONTENT
  // Builds and renders the portrait image, name header, and intro paragraph.
  // Called on initial load and again when the logo is clicked.
  // ---------------------------------------------------------------------------

  function createHeroContent() {
    heroContainer.innerHTML = ""; // Clear before re-rendering

    // Portrait image
    const img = document.createElement("img");
    img.src = "./images/Adrian-cyber.png";
    img.alt = "An image of the person that this portfolio is about";
    img.classList.add("portfolio-image");
    heroContainer.appendChild(img);

    // Name header — ".Adrian { Knudsen }"
    // The surname span uses data-text for the CSS glitch animation
    const header = document.createElement("h1");
    header.classList.add("hero-header");

    const adrianSpan = document.createElement("span");
    adrianSpan.textContent = ".Adrian";
    adrianSpan.classList.add("name-span");
    header.appendChild(adrianSpan);

    header.append(" { ");

    const knudsenSpan = document.createElement("span");
    knudsenSpan.textContent = "Knudsen";
    knudsenSpan.classList.add("surname-span");
    knudsenSpan.setAttribute("data-text", "Knudsen"); // Required for the glitch pseudo-elements
    header.appendChild(knudsenSpan);

    header.append(" } ");
    heroContainer.appendChild(header);

    // Short intro paragraph
    const paragraph = document.createElement("p");
    paragraph.textContent =
      "Hi, my name is Adrian and I'm a passionate designer and coder currently looking for opportunities in web development or design. I consider myself a designer with coding skills, as I have been working with design much longer than with code. I feel most at home in Figma and CSS, but I find JavaScript and TypeScript exciting and want to deepen my knowledge in these languages. In my free time, I enjoy playing video games, especially FPS and survival games. I have also worked as a freelance designer at Knudsen Grafisk AS, and in 2011 I held an art exhibition in Bergen showcasing digital artwork I created in Photoshop.";
    paragraph.classList.add("hero-text");
    heroContainer.appendChild(paragraph);
  }

  // Render hero on initial page load
  createHeroContent();

  // ---------------------------------------------------------------------------
  // LOGO CLICK — Return to hero
  // Hides all section content and re-renders the hero view.
  // ---------------------------------------------------------------------------

  logo.addEventListener("click", () => {
    const omMegContent = document.querySelector(".om-meg-content");
    if (omMegContent) omMegContent.style.display = "none";

    const prosjekterContent = document.querySelector(".prosjekter-content");
    if (prosjekterContent) prosjekterContent.style.display = "none";

    const kontaktContent = document.querySelector(".kontakt-content");
    if (kontaktContent) kontaktContent.style.display = "none";

    createHeroContent();
    heroContainer.style.display = "";
  });

  // ---------------------------------------------------------------------------
  // NAVIGATION
  // Built inside a short timeout to guarantee the layout has settled before
  // we measure element dimensions for the menu scaling animation.
  // ---------------------------------------------------------------------------

  setTimeout(() => {
    let open = false; // Tracks whether the menu is currently open

    // --- Nav background (the expanding circle) ---
    const navBg = document.createElement("div");
    navBg.id = "nav-bg";
    navBg.classList.add("btn");
    rootElement.appendChild(navBg);

    // --- Hamburger toggle button ---
    const toggleBtn = document.createElement("div");
    toggleBtn.id = "toggle-btn";
    toggleBtn.classList.add("btn");
    rootElement.appendChild(toggleBtn);

    // Three spans make up the hamburger icon lines
    for (let i = 0; i < 3; i++) {
      toggleBtn.appendChild(document.createElement("span"));
    }

    // --- Nav wrapper, nav, and list ---
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    rootElement.appendChild(wrapper);

    const nav = document.createElement("nav");
    wrapper.appendChild(nav);

    const ul = document.createElement("ul");
    nav.appendChild(ul);

    // --- Menu items ---
    const menuItems = [
      { text: "About", href: "#about" },
      { text: "Projects", href: "#projects" },
      { text: "Contact", href: "#contact" },
    ];

    // Toggles the open state, triggers the animation, and updates the button class
    function toggleMenu() {
      open = !open;
      animateMenu();
      toggleBtn.classList.toggle("shown", open);
    }

    // Build each menu item and attach its click handler
    menuItems.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.classList.add("link");
      a.href = item.href;
      a.textContent = item.text;
      li.appendChild(a);
      ul.appendChild(li);

      if (item.text === "About") {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          showOmMegContent();
          if (open) toggleMenu();
        });
      } else if (item.text === "Projects") {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          showProsjekterContent();
          if (open) toggleMenu();
        });
      } else if (item.text === "Contact") {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          showKontaktContent();
          if (open) toggleMenu();
        });
      }
    });

    // --- Menu animation helpers ---
    // Calculates the translate and scale values needed to expand the nav
    // background circle to cover the entire viewport from its corner position.
    let offsetX, offsetY, scale;

    function calculateValues() {
      const elemH = navBg.getBoundingClientRect().height;
      const elemW = navBg.getBoundingClientRect().width;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const offsetValue = Number(
        getComputedStyle(navBg).getPropertyValue("--offset-value"),
      );
      offsetX = w / 2 - elemW / 2 - offsetValue;
      offsetY = h / 2 - elemH / 2 - offsetValue;
      const radius = Math.sqrt(h ** 2 + w ** 2); // Diagonal = minimum radius to fill viewport
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

    // Initial calculation + recalculate on window resize to keep scaling correct
    calculateValues();

    toggleBtn.addEventListener("click", toggleMenu, false);
    window.addEventListener("resize", () => {
      window.requestAnimationFrame(() => {
        calculateValues();
        animateMenu();
      });
    });
  }, 100); // Short delay to ensure layout dimensions are stable
});

// =============================================================================
// ABOUT SECTION
// Hides all other sections, then creates (or shows) the About content.
// The element is only created once and toggled on subsequent visits.
// =============================================================================

function showOmMegContent() {
  // Hide other sections
  const heroContainer = document.querySelector(".hero-container");
  if (heroContainer) heroContainer.style.display = "none";

  const prosjekterContent = document.querySelector(".prosjekter-content");
  if (prosjekterContent) prosjekterContent.style.display = "none";

  const kontaktContent = document.querySelector(".kontakt-content");
  if (kontaktContent) kontaktContent.style.display = "none";

  // Create the About section the first time, otherwise just make it visible
  let omMegContent = document.querySelector(".om-meg-content");
  if (!omMegContent) {
    omMegContent = document.createElement("div");
    omMegContent.classList.add("om-meg-content");

    // Section heading: "# About"
    const h2 = document.createElement("h2");
    h2.classList.add("om-meg-titel");

    const hashSpan = document.createElement("span");
    hashSpan.textContent = "#";
    hashSpan.classList.add("hash-symbol");
    h2.appendChild(hashSpan);
    h2.append("About");
    omMegContent.appendChild(h2);

    // Bio text
    const p = document.createElement("p");
    p.innerHTML =
      "My love for design is evident not only in my coding projects but also in my everyday life. I strongly believe that good design is more than just aesthetics; it's about creating an intuitive and effective user experience. This philosophy is reflected in my work, where I always strive for innovative solutions that balance functionality with a visually appealing look.<br><br>Playing video games, watching movies, and series not only give me a chance to relax but also provide inspiration. I learn about different storytelling methods, character development, and visual effects, all of which contribute to my creative thought process.<br><br>As a dedicated and curious developer, I am always looking for opportunities to apply my skills in real-world projects. I am eager to contribute to a team with my technical knowledge and creative insight. Take a look at my portfolio to see a selection of my projects, and feel free to contact me for any potential collaboration opportunities.<br><br>Thank you for taking the time to review my portfolio. I look forward to the opportunity to bring my skills and passion to your team.";
    p.classList.add("om-meg-text");
    omMegContent.appendChild(p);

    document.querySelector(".root").appendChild(omMegContent);
  } else {
    omMegContent.style.display = "block";
  }
}

// =============================================================================
// PROJECTS SECTION
// Hides all other sections, then creates (or shows) the carousel of projects.
// The carousel element is only built once; subsequent visits toggle visibility.
// =============================================================================

function showProsjekterContent() {
  // Hide other sections
  const heroContainer = document.querySelector(".hero-container");
  heroContainer.style.display = "none";

  const omMegContent = document.querySelector(".om-meg-content");
  if (omMegContent) omMegContent.style.display = "none";

  const kontaktContent = document.querySelector(".kontakt-content");
  if (kontaktContent) kontaktContent.style.display = "none";

  // Create the Projects section the first time, otherwise just make it visible
  let prosjekterContent = document.querySelector(".prosjekter-content");
  if (!prosjekterContent) {
    prosjekterContent = document.createElement("div");
    prosjekterContent.classList.add("prosjekter-content");
    document.querySelector(".root").appendChild(prosjekterContent);

    createAndAppendCarousel(prosjekterContent);
    enableSwipeForCarousel(); // Attach touch swipe support after the slider exists
  } else {
    prosjekterContent.style.display = "block";
  }
}

// -----------------------------------------------------------------------------
// CAROUSEL BUILDER
// Constructs the radio-button-driven slider and appends it to the given parent.
// Each slide contains a project image, title, description, tools, and links.
// -----------------------------------------------------------------------------

function createAndAppendCarousel(parentElement) {
  const carouselBox = document.createElement("div");
  carouselBox.className = "carousel-Box";

  const slider = document.createElement("div");
  slider.className = "slider";

  // Hidden radio inputs — one per slide — drive the CSS-only slide switching
  const inputIds = ["btn-1", "btn-2", "btn-3"];
  inputIds.forEach((id, index) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "toggle";
    input.id = id;
    if (index === 0) input.checked = true; // Show first slide by default
    slider.appendChild(input);
  });

  // Dot indicators at the bottom of the slider (hidden on wider screens)
  const sliderControls = document.createElement("div");
  sliderControls.className = "slider-controls";
  inputIds.forEach((id) => {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    sliderControls.appendChild(label);
  });
  slider.appendChild(sliderControls);

  // --- Project data ---
  const slideInfos = [
    {
      title: "Nomito",
      text: "Nomito is a smart web app that helps you cook with what you already have at home. The goal is to reduce food waste, save money, and make everyday cooking easier and more creative.",
      tools: "Next.js, JavaScript, CSS, HTML",
      imageSrc: "./images/nomito_vercel_app.jpeg",
      alt: "Screenshot of the Nomito web app",
      githubLink: "https://github.com/AdrianKnudsen/nomito",
      liveSiteLink: "https://nomito.vercel.app",
    },
    {
      title: "Wear & Tear",
      text: "A modern e-commerce web app built with Next.js for the frontend and Sanity as the backend CMS. Features product listings, dynamic pages, and a clean, responsive design. Work in progress.",
      tools: "Next.js, JavaScript, CSS, HTML",
      imageSrc: "./images/wearandtear_vercel_app.jpeg",
      alt: "Screenshot of the Wear & Tear e-commerce site",
      githubLink: "https://github.com/AdrianKnudsen/wearandtear",
      liveSiteLink: "https://wearandtear.vercel.app",
    },
    {
      title: "Luna Link",
      text: "This was a project I worked on while attending Kodehode. Personally, I was mainly responsible for the design, but I also handled the header and search/filtering logic. This was a project I learned a lot from, both in terms of coding and collaboration.",
      tools: "React, JavaScript, CSS, HTML",
      imageSrc: "./images/Luna Link.jpeg",
      alt: "Screenshot of the Luna Link project",
      githubLink: "https://github.com/AdrianK-B06/Luna-Link.git",
      liveSiteLink: "https://lunalink.netlify.app",
    },
  ];

  // Build each slide from its data object
  const slides = document.createElement("ul");
  slides.className = "slides";

  slideInfos.forEach((slideInfo) => {
    const li = document.createElement("li");
    li.className = "slide";

    const img = document.createElement("img");
    img.className = "slide-image";
    img.src = slideInfo.imageSrc;
    img.alt = slideInfo.alt;
    img.width = 320;
    img.height = 240;
    li.appendChild(img);

    const div = document.createElement("div");
    div.className = "slide-content";

    const h2 = document.createElement("h2");
    h2.className = "slide-title";
    h2.textContent = slideInfo.title;
    div.appendChild(h2);

    const p = document.createElement("p");
    p.className = "slide-text";
    p.textContent = slideInfo.text;
    div.appendChild(p);

    const toolsP = document.createElement("p");
    toolsP.className = "slide-tools";
    toolsP.textContent = "Tools: " + slideInfo.tools;
    div.appendChild(toolsP);

    const githubLink = document.createElement("a");
    githubLink.href = slideInfo.githubLink;
    githubLink.className = "slide-link";
    githubLink.textContent = "GitHub";
    githubLink.target = "_blank";
    div.appendChild(githubLink);

    const liveSiteLink = document.createElement("a");
    liveSiteLink.href = slideInfo.liveSiteLink;
    liveSiteLink.className = "slide-link";
    liveSiteLink.textContent = "Live Site";
    liveSiteLink.target = "_blank";
    div.appendChild(liveSiteLink);

    li.appendChild(div);
    slides.appendChild(li);
  });

  slider.appendChild(slides);
  carouselBox.appendChild(slider);
  parentElement.appendChild(carouselBox);
}

// =============================================================================
// CONTACT SECTION
// Hides all other sections, then creates (or shows) the Contact content.
// The element is only created once and toggled on subsequent visits.
// =============================================================================

function showKontaktContent() {
  // Hide other sections
  const heroContainer = document.querySelector(".hero-container");
  heroContainer.style.display = "none";

  const omMegContent = document.querySelector(".om-meg-content");
  if (omMegContent) omMegContent.style.display = "none";

  const prosjekterContent = document.querySelector(".prosjekter-content");
  if (prosjekterContent) prosjekterContent.style.display = "none";

  // Create the Contact section the first time, otherwise just make it visible
  let kontaktContent = document.querySelector(".kontakt-content");
  if (!kontaktContent) {
    kontaktContent = document.createElement("div");
    kontaktContent.classList.add("kontakt-content");

    // Heading
    const h2 = document.createElement("h2");
    h2.textContent = "Get in touch!";
    h2.classList.add("kontakt-header");
    kontaktContent.appendChild(h2);

    // Subtext
    const p = document.createElement("p");
    p.textContent = "Feel free to send an email!";
    p.classList.add("kontakt-text");
    kontaktContent.appendChild(p);

    // Decorative paper-plane icon
    const telegram = document.createElement("img");
    telegram.src = "./svg/telegram-plane.svg";
    telegram.alt = "Decorative paper plane icon";
    telegram.classList.add("telegram");
    kontaktContent.appendChild(telegram);

    // Clickable email address
    const mailLink = document.createElement("a");
    mailLink.href = "mailto:adrian@knudsen.no";
    mailLink.textContent = "adrian@knudsen.no";
    mailLink.classList.add("mail-link");
    kontaktContent.appendChild(mailLink);

    // --- Social links ---
    const socialLinksContainer = document.createElement("div");
    socialLinksContainer.classList.add("social-links-container");

    // GitHub
    const githubLinkAnchor = document.createElement("a");
    githubLinkAnchor.href = "https://github.com/AdrianKnudsen";
    githubLinkAnchor.target = "_blank";
    githubLinkAnchor.rel = "noopener noreferrer";

    const githubLogo = document.createElement("img");
    githubLogo.src = "./svg/github.svg";
    githubLogo.alt = "GitHub logo";
    githubLogo.classList.add("github-logo");
    githubLinkAnchor.appendChild(githubLogo);
    socialLinksContainer.appendChild(githubLinkAnchor);

    // LinkedIn
    const linkedinLinkAnchor = document.createElement("a");
    linkedinLinkAnchor.href =
      "https://www.linkedin.com/in/adrian-knudsen-4522012b6";
    linkedinLinkAnchor.target = "_blank";
    linkedinLinkAnchor.rel = "noopener noreferrer";

    const linkedinLogo = document.createElement("img");
    linkedinLogo.src = "./svg/social-linkedin.svg";
    linkedinLogo.alt = "LinkedIn logo";
    linkedinLogo.classList.add("linkedin-logo");
    linkedinLinkAnchor.appendChild(linkedinLogo);
    socialLinksContainer.appendChild(linkedinLinkAnchor);

    kontaktContent.appendChild(socialLinksContainer);
    document.querySelector(".root").appendChild(kontaktContent);
  } else {
    kontaktContent.style.display = "";
  }
}

// =============================================================================
// CAROUSEL SWIPE SUPPORT
// Attaches touch event listeners to the slider so users can swipe between
// slides on touch devices. Only horizontal swipes trigger slide changes —
// vertical scroll is left unaffected.
// =============================================================================

function enableSwipeForCarousel() {
  if (!("ontouchstart" in window)) return; // Skip on non-touch devices

  const slider = document.querySelector(".slider");
  if (!slider) return;

  let touchstartX = 0,
    touchstartY = 0,
    touchendX = 0,
    touchendY = 0;

  slider.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
  });

  slider.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    checkSwipeDirection();
  });

  function checkSwipeDirection() {
    const diffX = touchendX - touchstartX;
    const diffY = touchendY - touchstartY;

    // Only respond to horizontal swipes (ignore diagonal/vertical scrolling)
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) showNextSlide();
      else if (diffX > 0) showPreviousSlide();
    }
  }

  function showNextSlide() {
    const inputs = document.querySelectorAll('.slider input[type="radio"]');
    const currentIndex = Array.from(inputs).findIndex((input) => input.checked);
    inputs[(currentIndex + 1) % inputs.length].checked = true; // Wraps back to first slide
  }

  function showPreviousSlide() {
    const inputs = document.querySelectorAll('.slider input[type="radio"]');
    const currentIndex = Array.from(inputs).findIndex((input) => input.checked);
    inputs[(currentIndex - 1 + inputs.length) % inputs.length].checked = true; // Wraps to last slide
  }
}
