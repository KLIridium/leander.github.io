// script.js
// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu after clicking a link
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Sticky navbar
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Form submission
document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    // In a real application, you would send this data to a server
    alert(`Thank you for subscribing with: ${email}`);
    this.reset();
});

// Product selection buttons
document.querySelectorAll('.product .btn').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('.level').textContent;
        alert(`Added ${productName} to your cart!`);
    });
});

// Video lazy loading for better performance
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    // In a real implementation, you might set the src attribute here
    // after the page has loaded to improve performance
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navBar = document.getElementById('nav-bar');

function toggleMenu() {
    menuToggle.classList.toggle('open');
    navBar.classList.toggle('nav-open');
    document.body.classList.toggle('no-scroll', navBar.classList.contains('nav-open'));
}

menuToggle.addEventListener('click', toggleMenu);

// Modal functionality for footer links
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const closeModal = document.querySelector('.close-modal');
const footerLinks = document.querySelectorAll('.footer-link');

footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const type = this.getAttribute('data-type');
        
        // Set modal content based on link type
        switch(type) {
            case 'privacy':
                modalTitle.textContent = 'Privacy Policy';
                modalText.textContent = 'Hi, This is a sample Privacy Policy. In a real application, this would contain your actual privacy policy information.';
                break;
            case 'terms':
                modalTitle.textContent = 'Terms & Conditions';
                modalText.textContent = 'Hi, This is a sample Terms & Conditions. In a real application, this would contain your actual terms and conditions.';
                break;
            case 'contact':
                modalTitle.textContent = 'Contact Us';
                modalText.textContent = 'Hi, This is a sample Contact information. In a real application, this would contain your actual contact details.';
                break;
        }
        
        // Show the modal
        modal.classList.add('show');
    });
});

// Close modal when clicking the X
closeModal.addEventListener('click', function() {
    modal.classList.remove('show');
});

// Close modal when clicking outside the modal content
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Close menu when clicking outside on mobile
window.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && 
        navBar.classList.contains('nav-open') && 
        !e.target.closest('#nav-bar') && 
        !e.target.closest('#menu-toggle')) {
        toggleMenu();
    }
});