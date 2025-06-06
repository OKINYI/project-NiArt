// Mobile Menu Toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// Lightbox Functionality
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-content');
    lightbox.style.display = 'flex';
    lightboxImg.src = src;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Gallery Filter
function filterGallery(category) {
    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Testimonial Carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;
const indicators = document.querySelectorAll('.testimonial-indicator');

function updateTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.opacity = '0';
        testimonial.classList.remove('visible');
        testimonial.classList.add('invisible');
        indicators[i].classList.remove('bg-primary-600');
        indicators[i].classList.add('bg-primary-300');
    });
    
    testimonials[index].style.opacity = '1';
    testimonials[index].classList.remove('invisible');
    testimonials[index].classList.add('visible');
    indicators[index].classList.remove('bg-primary-300');
    indicators[index].classList.add('bg-primary-600');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonial(currentTestimonial);
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonial(index);
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
    updateTestimonial(0);
    setInterval(nextTestimonial, 5000);
    
    // Intersection Observer for animations
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    
    fadeEls.forEach(el => observer.observe(el));
});