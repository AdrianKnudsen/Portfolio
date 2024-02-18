let open = false;

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
    "Hei, jeg heter Adrian og er en ivrig kode student ved Kodehode i Bergen. Jeg ser på meg selv som en designer med kode kunnskaper, da jeg har holdt på med design mye lengre enn koding. Jeg trives best i Figma og med Css, men syntes JavaScript og TypeScript er spennende og ønsker å fordype meg enda mer i disse språkene. På fritiden liker jeg å spille dataspill og favoritt sjanger er fps og survival spill. Tidligere har jeg også jobbet som freelance designer hos Knudsen Grafisk AS. I 2011 hadde jeg en kunstutstilling i Bergen hvor jeg viste fram digital kunst jeg hadde laget i Photoshop.";
  paragraph.classList.add("hero-text");

  // Creating the navigation background
  const navBg = document.createElement("div");
  navBg.id = "nav-bg";
  navBg.classList.add("btn");

  // Creating the toggle button
  const toggleBtn = document.createElement("div");
  toggleBtn.id = "toggle-btn";
  toggleBtn.classList.add("btn");

  // Creating the spans for hamburger icon
  for (let i = 0; i < 3; i++) {
    const span = document.createElement("span");
    toggleBtn.appendChild(span);
  }

  // Create the navigation wrapper
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  // Create the nav element
  const nav = document.createElement("nav");

  // Create the ul element
  const ul = document.createElement("ul");

  // Defining the menu items
  const menuItems = [
    { text: "Om Meg", href: "#om-meg" },
    { text: "Prosjekter", href: "#prosjekter" },
    { text: "Kontakt", href: "#kontakt" },
  ];

  // Create li elements for each menu item
  menuItems.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.classList.add("link");
    a.href = item.href;
    a.textContent = item.text;
    li.appendChild(a);
    ul.appendChild(li);
  });

  // Appending the ul to the nav, and the nav to the wrapper
  nav.appendChild(ul);
  wrapper.appendChild(nav);

  // Append the elements to the root element
  rootElement.appendChild(logo);
  rootElement.appendChild(img);
  rootElement.appendChild(header);
  rootElement.appendChild(paragraph);
  rootElement.appendChild(navBg);
  rootElement.appendChild(toggleBtn);
  rootElement.appendChild(wrapper);

  // Calculate values for animation
  let scale, offsetX, offsetY;
  const calculateValues = () => {
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
  };

  // Initial calculation
  calculateValues();

  // Menu animation functions
  const openMenu = () => {
    navBg.style.setProperty("--translate-x", `${offsetY}px`);
    navBg.style.setProperty("--translate-y", `-${offsetX}px`);
    navBg.style.setProperty("--scale", scale);
  };

  const closeMenu = () => {
    navBg.style.setProperty("--scale", 1);
    navBg.style.setProperty("--translate-x", 0);
    navBg.style.setProperty("--translate-y", 0);
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

  // Event listeners
  toggleBtn.addEventListener("click", toggleMenu, false);
  window.addEventListener("resize", resizeHandler, false);
});
