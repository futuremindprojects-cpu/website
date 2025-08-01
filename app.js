/* ====================================
   PROJECT DATA AND CONFIGURATION
   ==================================== */

// Project data from the provided JSON
// author: Future Minds
const projectsData = {
  projects: [
    {
      title: "IoT Automation",
      description:
        "Smart home automation, sensor networks, and IoT device integration projects",
      icon: "🏠",
      features: [
        "Arduino & Raspberry Pi",
        "Sensor Integration",
        "Mobile App Control",
        "Real-time Monitoring",
      ],
    },
    {
      title: "AI & Machine Learning",
      description:
        "Intelligent systems, predictive analytics, and machine learning applications",
      icon: "🤖",
      features: [
        "Computer Vision",
        "Natural Language Processing",
        "Predictive Models",
        "Deep Learning",
      ],
    },
    {
      title: "RFID Systems",
      description:
        "RFID-based attendance, library management, and access control systems",
      icon: "📱",
      features: [
        "Attendance Systems",
        "Access Control",
        "Inventory Management",
        "Library Systems",
      ],
    },
    {
      title: "Web Development",
      description:
        "Modern web applications with responsive design and latest technologies",
      icon: "💻",
      features: [
        "Responsive Design",
        "Full-Stack Development",
        "E-commerce Solutions",
        "CMS Development",
      ],
    },
    // {
    //   title: "Mobile Apps",
    //   description:
    //     "Cross-platform mobile applications for Android and iOS platforms",
    //   icon: "📱",
    //   features: [
    //     "Native Apps",
    //     "Cross-Platform",
    //     "UI/UX Design",
    //     "Backend Integration",
    //   ],
    // },
    {
      title: "Embedded Systems",
      description:
        "Microcontroller-based projects and embedded software development",
      icon: "⚡",
      features: [
        "Microcontroller Programming",
        "PCB Design",
        "Firmware Development",
        "Hardware Integration",
      ],
    },
  ],
  features: [
    { title: "Expert Team", description: "Experienced developers and engineers", icon: "👥" },
    { title: "Quality Assurance", description: "Rigorous testing and quality checks", icon: "✅" },
    { title: "Timely Delivery", description: "Projects delivered on or before deadline", icon: "⏰" },
    { title: "24/7 Support", description: "Round-the-clock technical support", icon: "🆘" },
  ],
  testimonials: [
    {
      name: "Rahul Sharma",
      course: "Computer Science Engineering",
      feedback:
        "Excellent project development service! Got my IoT project completed with detailed documentation.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      course: "Electronics & Communication",
      feedback:
        "Professional team that delivered my RFID attendance system project on time with complete explanation.",
      rating: 5,
    },
    {
      name: "Amit Kumar",
      course: "Information Technology",
      feedback:
        "Great experience! The AI project was well-designed and helped me understand machine learning concepts.",
      rating: 5,
    },
  ],
};

/* ====================================
   DOM ELEMENTS AND GLOBAL VARIABLES
   ==================================== */
let navToggle,
  navList,
  navLinks,
  header,
  servicesGrid,
  featuresGrid,
  testimonialsGrid,
  contactForm,
  formInputs,
  messageModal,
  modalTitle,
  modalMessage,
  modalClose,
  modalBackdrop,
  typedText;

// IntersectionObserver options for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

/* ====================================
   UTILITY FUNCTIONS
   ==================================== */
const debounce = (func, wait = 100, immediate = false) => {
  let timeout;
  return (...args) => {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
};

const generateStars = (rating = 5) =>
  Array.from({ length: 5 })
    .map((_, i) => `<span class="star">${i < rating ? "★" : "☆"}</span>`) // prettier-ignore
    .join("");

const getInitials = (name = "User") =>
  name
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .toUpperCase();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^[+]?\d{7,16}$/.test(phone.replace(/[^\d+]/g, ""));

/* ====================================
   RENDER FUNCTIONS
   ==================================== */
const renderServices = () => {
  if (!servicesGrid) return;
  servicesGrid.innerHTML = projectsData.projects
    .map(
      (p) => `
    <div class="service-card animate-fade-in">
      <span class="service-card__icon">${p.icon}</span>
      <h3 class="service-card__title">${p.title}</h3>
      <p class="service-card__description">${p.description}</p>
      <ul class="service-card__features">
        ${p.features.map((f) => `<li>${f}</li>`).join("")}
      </ul>
    </div>`
    )
    .join("");
};

const renderFeatures = () => {
  if (!featuresGrid) return;
  featuresGrid.innerHTML = projectsData.features
    .map(
      (f) => `
    <div class="feature-card animate-fade-in">
      <span class="feature-card__icon">${f.icon}</span>
      <h3 class="feature-card__title">${f.title}</h3>
      <p class="feature-card__description">${f.description}</p>
    </div>`
    )
    .join("");
};

const renderTestimonials = () => {
  if (!testimonialsGrid) return;
  testimonialsGrid.innerHTML = projectsData.testimonials
    .map(
      (t) => `
    <div class="testimonial-card animate-fade-in">
      <div class="testimonial-card__rating">${generateStars(t.rating)}</div>
      <p class="testimonial-card__feedback">“${t.feedback}”</p>
      <div class="testimonial-card__author">
        <div class="testimonial-card__avatar">${getInitials(t.name)}</div>
        <div class="testimonial-card__info">
          <h4>${t.name}</h4>
          <span>${t.course}</span>
        </div>
      </div>
    </div>`
    )
    .join("");
};

/* ====================================
   NAVIGATION FUNCTIONS
   ==================================== */
const toggleMobileNav = () => {
  if (!navToggle || !navList) return;
  navList.classList.toggle("show");
  navToggle.classList.toggle("active");
};

const closeMobileNav = () => {
  if (!navList || !navToggle) return;
  navList.classList.remove("show");
  navToggle.classList.remove("active");
};

const handleNavClick = (e) => {
  const href = e.currentTarget.getAttribute("href");
  if (!href.startsWith("#")) return;
  e.preventDefault();
  const target = document.querySelector(href);
  if (!target) return;
  const offset = header ? header.offsetHeight + 20 : 80;
  window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
  navLinks.forEach((l) => l.classList.remove("active"));
  e.currentTarget.classList.add("active");
  closeMobileNav();
};

const updateHeaderOnScroll = () => {
  if (!header) return;
  const scrolled = window.scrollY > 50;
  header.style.background = scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.1)";
  header.style.backdropFilter = "blur(10px)";
  header.style.boxShadow = scrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none";
};

/* ====================================
   TYPING ANIMATION
   ==================================== */
const initTypingAnimation = () => {
  if (!typedText) return;
  const phrases = ["Projects", "Solutions", "Innovation", "Excellence"];
  let phraseIdx = 0,
    charIdx = 0,
    deleting = false;

  const type = () => {
    const phrase = phrases[phraseIdx];
    typedText.textContent = deleting ? phrase.slice(0, --charIdx) : phrase.slice(0, ++charIdx);
    if (!deleting && charIdx === phrase.length) {
      deleting = true;
      setTimeout(type, 2000);
    } else if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, deleting ? 80 : 120);
    }
  };
  type();
};

/* ====================================
   FORM VALIDATION & SUBMISSION (WEB3FORMS)
   ==================================== */
const showFieldError = (field, msg) => {
  field.classList.add("error");
  const errSpan = document.getElementById(`${field.id}-error`);
  if (errSpan) errSpan.textContent = msg;
};

const validateContactForm = () => {
  if (!contactForm) return false;
  let valid = true;
  const fields = contactForm.querySelectorAll("input[required], select[required], textarea[required]");
  fields.forEach((f) => {
    f.classList.remove("error");
    const errSpan = document.getElementById(`${f.id}-error`);
    if (errSpan) errSpan.textContent = "";
    const val = f.value.trim();
    let err = "";
    if (!val) err = `${f.name.replace(/-/g, " ")} is required`;
    else {
      switch (f.name) {
        case "name":
          if (val.length < 2) err = "Name must be at least 2 characters";
          else if (!/^[A-Za-z\s]+$/.test(val)) err = "Name should contain only letters and spaces";
          break;
        case "email":
          if (!isValidEmail(val)) err = "Invalid email address";
          break;
        case "phone":
          if (!isValidPhone(val)) err = "Invalid phone number";
          break;
        case "message":
          if (val.length < 10) err = "Message must be at least 10 characters";
          if (val.length > 2000) err = "Message too long (max 2000)";
          break;
      }
    }
    if (err) {
      showFieldError(f, err);
      valid = false;
    }
  });
  return valid;
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  if (!validateContactForm()) {
    showModal("❌ Validation Error", "Please correct the highlighted errors and try again.");
    return;
  }
  const btn = contactForm.querySelector("button[type='submit']");
  const original = btn.textContent;
  btn.textContent = "📤 Sending...";
  btn.disabled = true;
  btn.style.opacity = 0.7;

  try {
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: new FormData(contactForm) });
    const json = await res.json();
    if (json.success) {
      showModal("✅ Message Sent!", `Thank you ${contactForm.name.value}! We have received your ${contactForm["project-type"].value} inquiry and will respond within 24 hours.`);
      contactForm.reset();
    } else throw new Error(json.message || "Submission failed");
  } catch (err) {
    console.error(err);
    showModal("❌ Submission Failed", "An error occurred while sending your message. Please try again later or email us directly.");
  } finally {
    btn.textContent = original;
    btn.disabled = false;
    btn.style.opacity = 1;
  }
};

/* ====================================
   MODAL HELPERS
   ==================================== */
const showModal = (title, msg) => {
  if (!messageModal) return;
  modalTitle.textContent = title;
  modalMessage.textContent = msg;
  messageModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};
const hideModal = () => {
  messageModal.classList.add("hidden");
  document.body.style.overflow = "";
};

/* ====================================
   SCROLL ANIMATIONS
   ==================================== */
const initScrollAnimations = () => {
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("animate-fade-in");
        obs.unobserve(e.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll("section, .service-card, .feature-card, .testimonial-card").forEach((el, idx) => {
    setTimeout(() => observer.observe(el), idx * 50);
  });
};

/* ====================================
   DOM & EVENT INITIALISATION
   ==================================== */
const initDOM = () => {
  navToggle = document.getElementById("nav-toggle");
  navList = document.getElementById("nav-list");
  navLinks = document.querySelectorAll(".nav__link");
  header = document.getElementById("header");
  servicesGrid = document.getElementById("services-grid");
  featuresGrid = document.getElementById("features-grid");
  testimonialsGrid = document.getElementById("testimonials-grid");
  contactForm = document.getElementById("contact-form");
  messageModal = document.getElementById("message-modal");
  modalTitle = document.getElementById("modal-title");
  modalMessage = document.getElementById("modal-message");
  modalClose = document.getElementById("modal-close");
  modalBackdrop = document.getElementById("modal-backdrop");
  typedText = document.getElementById("typed-text");
};

const initEvents = () => {
  navToggle && navToggle.addEventListener("click", toggleMobileNav);
  navLinks.forEach((l) => l.addEventListener("click", handleNavClick));
  contactForm && contactForm.addEventListener("submit", handleFormSubmit);
  modalClose && modalClose.addEventListener("click", hideModal);
  modalBackdrop && modalBackdrop.addEventListener("click", hideModal);
  document.addEventListener("keydown", (e) => e.key === "Escape" && !messageModal.classList.contains("hidden") && hideModal());
  window.addEventListener("scroll", debounce(updateHeaderOnScroll, 15));
};

/* ====================================
   INITIALISATION
   ==================================== */
const init = () => {
  console.log("🚀 Future Minds – Initialising");
  initDOM();
  renderServices();
  renderFeatures();
  renderTestimonials();
  initEvents();
  initTypingAnimation();
  initScrollAnimations();
  updateHeaderOnScroll();
  console.log("✅ Future Minds – Ready");
};

document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();

// ServiceWorker placeholder (optional PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    /* navigator.serviceWorker.register("/sw.js").catch(console.error); */
  });
}

// Dev-mode global helpers
if (location.hostname === "localhost") {
  window.FM = { projectsData, validateContactForm, showModal };
  console.log("🔧 Dev helpers available at window.FM");
}
