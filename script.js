// Mobile menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  hamburger.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", String(open));
  hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Category filter
const filterBtns = document.querySelectorAll(".filterBtn");
const cards = document.querySelectorAll("#workGrid .card");
const emptyMsg = document.getElementById("emptyMsg");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("isActive"));
    btn.classList.add("isActive");
    const f = btn.dataset.filter;
    let visible = 0;
    cards.forEach((card) => {
      const show = f === "all" || card.dataset.cat === f;
      card.classList.toggle("hide", !show);
      if (show) visible += 1;
    });
    emptyMsg.hidden = visible !== 0;
  });
});

// Fade in on scroll
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("isVisible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("isVisible"));
}

// Testimonials
const quotes = [
  {
    text: "\u201CMara gave our catalog the pace of a good novel. Readers linger. Retailers noticed. It is the best money we spent all year.\u201D",
    name: "June Keller",
    role: "Director, Light Studies Gallery",
    initials: "JK"
  },
  {
    text: "\u201CSharp eye, calm process, zero drama. Our identity finally sounds like us on our best day.\u201D",
    name: "Theo Marsh",
    role: "Founder, Juniper and Co",
    initials: "TM"
  },
  {
    text: "\u201CEvery edit made the piece stronger. Her newsletter advice doubled our open rate in one quarter.\u201D",
    name: "Priya Anand",
    role: "Editor, Oatline Journal",
    initials: "PA"
  }
];
let qi = 0;
const quoteP = document.querySelector(".quote p");
const quoteFooter = document.querySelector(".quote footer");
const quoteCount = document.getElementById("quoteCount");

function renderQuote() {
  const q = quotes[qi];
  quoteP.textContent = q.text;
  quoteFooter.innerHTML = "";
  const av = document.createElement("span");
  av.className = "quoteAvatar";
  av.textContent = q.initials;
  const who = document.createElement("span");
  const strong = document.createElement("strong");
  strong.textContent = q.name;
  who.appendChild(strong);
  who.appendChild(document.createElement("br"));
  who.appendChild(document.createTextNode(q.role));
  quoteFooter.appendChild(av);
  quoteFooter.appendChild(who);
  quoteCount.textContent = (qi + 1) + " of " + quotes.length;
}

document.getElementById("nextQuote").addEventListener("click", () => {
  qi = (qi + 1) % quotes.length;
  renderQuote();
});
document.getElementById("prevQuote").addEventListener("click", () => {
  qi = (qi - 1 + quotes.length) % quotes.length;
  renderQuote();
});
renderQuote();

// Contact form validation
const form = document.getElementById("contactForm");
const fName = document.getElementById("fName");
const fEmail = document.getElementById("fEmail");
const fMsg = document.getElementById("fMsg");
const eName = document.getElementById("eName");
const eEmail = document.getElementById("eEmail");
const eMsg = document.getElementById("eMsg");
const formOk = document.getElementById("formOk");

function setErr(input, errEl, msg) {
  errEl.textContent = msg;
  input.closest(".field").classList.toggle("invalid", Boolean(msg));
  return !msg;
}

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const okName = setErr(fName, eName, fName.value.trim().length >= 2 ? "" : "Please enter your name.");
  const okEmail = setErr(
    fEmail,
    eEmail,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fEmail.value.trim()) ? "" : "Please enter a valid email address."
  );
  const okMsg = setErr(fMsg, eMsg, fMsg.value.trim().length >= 10 ? "" : "Please add a few details (10 characters or more).");
  if (okName && okEmail && okMsg) {
    formOk.hidden = false;
    form.reset();
    setTimeout(() => { formOk.hidden = true; }, 6000);
  } else {
    formOk.hidden = true;
  }
});

[fName, fEmail, fMsg].forEach((input) => {
  input.addEventListener("input", () => {
    input.closest(".field").classList.remove("invalid");
    const err = input.closest(".field").querySelector(".err");
    if (err) err.textContent = "";
  });
});
