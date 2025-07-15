// =============== MOBILE MENU TOGGLE ===============
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        const expanded = mobileMenuButton.getAttribute("aria-expanded") === "true" || false;
        mobileMenuButton.setAttribute("aria-expanded", !expanded);
    });
}

// =============== SMOOTH SCROLLING ===============
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: "smooth",
            });
        }
    });
});

// =============== GALLERY FILTERING ===============
function filterGallery(category) {
    const cards = document.querySelectorAll(".gallery-card");
    cards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    // Highlight active filter button
    document.querySelectorAll(".gallery-filter-btn").forEach((btn) => {
        btn.classList.remove("active");
        if (btn.textContent.trim().toLowerCase() === category.toLowerCase()) {
            btn.classList.add("active");
        }
    });
}

// =============== LIGHTBOX MODAL ===============
function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-content");
    lightbox.style.display = "flex";
    lightboxImg.src = src;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Close lightbox on ESC key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});

// =============== TESTIMONIAL CAROUSEL ===============
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial-card");
const indicators = document.querySelectorAll(".testimonial-indicator");

function showTestimonial(index) {
    testimonials.forEach((t, i) => {
        t.classList.remove("visible", "opacity-100");
        t.classList.add("invisible", "opacity-0");
    });
    testimonials[index].classList.add("visible", "opacity-100");
    testimonials[index].classList.remove("invisible", "opacity-0");

    indicators.forEach((ind, i) => {
        ind.classList.remove("bg-purple-600");
        ind.classList.add("bg-purple-300");
    });
    indicators[index].classList.remove("bg-purple-300");
    indicators[index].classList.add("bg-purple-600");
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function goToTestimonial(index) {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
}

// Auto slide every 5 seconds
setInterval(nextTestimonial, 5000);

// =============== FADE-IN ANIMATION ON SCROLL ===============
const faders = document.querySelectorAll(".fade-in");
const observerOptions = { threshold: 0.2 };

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate only once
        }
    });
}, observerOptions);

faders.forEach((el) => observer.observe(el));

// =============== DARK MODE TOGGLE ===============
const darkModeToggle = document.getElementById("dark-mode-toggle");

if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const icon = darkModeToggle.querySelector("i");
        if (document.body.classList.contains("dark")) {
            icon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "dark");
            updateThemeColors("dark");
        } else {
            icon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "light");
            updateThemeColors("light");
        }
    });

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        darkModeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
        updateThemeColors("dark");
    } else {
        updateThemeColors("light");
    }
}

// =============== DYNAMIC THEME COLORS ===============
function updateThemeColors(theme) {
    const root = document.documentElement;

    if (theme === "dark") {
        root.style.setProperty("--primary", "#8B5CF6");
        root.style.setProperty("--secondary", "#A78BFA");
        root.style.setProperty("--accent", "#C4B5FD");
        root.style.setProperty("--dark", "#F3F4F6");
        root.style.setProperty("--light", "#1F2937");
        root.style.setProperty("--bg", "#111827");
        root.style.setProperty("--text", "#E5E7EB");
    } else {
        root.style.setProperty("--primary", "#6B46C1");
        root.style.setProperty("--secondary", "#9F7AEA");
        root.style.setProperty("--accent", "#D6BCFA");
        root.style.setProperty("--dark", "#1A202C");
        root.style.setProperty("--light", "#F7FAFC");
        root.style.setProperty("--bg", "#FAF5FF");
        root.style.setProperty("--text", "#1A202C");
    }

    document.body.style.backgroundColor = getComputedStyle(root).getPropertyValue("--bg");
    document.body.style.color = getComputedStyle(root).getPropertyValue("--text");
}

// =============== FORM VALIDATION ===============
const newsletterForm = document.querySelector("form");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
        const emailInput = this.querySelector("input[type='email']");
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailValue)) {
            e.preventDefault();
            alert("Please enter a valid email address.");
        }
    });
}

// =============== STICKY HEADER SHADOW ===============
window.addEventListener("scroll", () => {
    const header = document.querySelector("nav");
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add("shadow-md");
        } else {
            header.classList.remove("shadow-md");
        }
    }
});

// =============== ACCESSIBILITY ENHANCEMENTS ===============
document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("alt")) {
        img.setAttribute("alt", "Image");
    }
});

document.querySelectorAll("button").forEach((btn) => {
    if (!btn.hasAttribute("aria-label")) {
        btn.setAttribute("aria-label", btn.textContent.trim());
    }
});