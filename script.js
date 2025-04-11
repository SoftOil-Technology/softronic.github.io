// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
function checkVisibility() {
    const elements = document.querySelectorAll('.reveal-text, .reveal-image, .reveal-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Element is partially visible
        if (elementTop < window.innerHeight * 0.9 && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

// Check visibility on page load
document.addEventListener('DOMContentLoaded', () => {
    checkVisibility();
    
    // Add animation to stagger cards
    const cards = document.querySelectorAll('.reveal-card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Check visibility on scroll
window.addEventListener('scroll', checkVisibility);

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const message = this.querySelector('#message').value;
        
        if (!name || !email || !message) {
            alert('Por favor complete todos los campos requeridos.');
            return;
        }
        
        // Here you would normally send the form data to a server
        // For demo purposes, just show a success message
        this.innerHTML = `
            <div style="text-align: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--success); margin: 0 auto 1rem;">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <path d="m9 11 3 3L22 4"></path>
                </svg>
                <h3>¡Mensaje enviado!</h3>
                <p>Gracias por contactarnos. Nos pondremos en contacto con usted pronto.</p>
            </div>
        `;
    });
}

// Sticky header
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add this CSS rule dynamically
const style = document.createElement('style');
style.textContent = `
    .navbar.scrolled {
        background-color: rgba(255, 255, 255, 0.98);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: var(--header-height);
        left: 0;
        width: 100%;
        background-color: white;
        padding: 2rem;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        z-index: 999;
    }
    
    .menu-toggle.active span:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
    }
    
    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-toggle.active span:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
    }
`;
document.head.appendChild(style);