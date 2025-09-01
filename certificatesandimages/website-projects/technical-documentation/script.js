document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.main-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const burgerMenu = document.getElementById('burger-menu');
    const closeMenu = document.getElementById('close-menu');
    const navbar = document.getElementById('navbar');
    const homeNavButton = document.querySelector('.home-nav-button');
    
    // Function to check screen size and adjust menu accordingly
    function checkScreenSize() {
        if (window.innerWidth > 815) {
            // Large screen - ensure navbar is visible and buttons are hidden
            navbar.classList.remove('active');
            burgerMenu.style.display = 'none';
            closeMenu.style.display = 'none';
        } else {
            // Small screen - show burger menu if navbar is closed
            burgerMenu.style.display = navbar.classList.contains('active') ? 'none' : 'flex';
            closeMenu.style.display = navbar.classList.contains('active') ? 'flex' : 'none';
        }
    }
    
    // Function to highlight active section in navbar
    function highlightNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Toggle mobile menu
    function toggleMenu() {
        navbar.classList.toggle('active');
        if (navbar.classList.contains('active')) {
            burgerMenu.style.display = 'none';
            closeMenu.style.display = 'flex';
        } else {
            burgerMenu.style.display = 'flex';
            closeMenu.style.display = 'none';
        }
    }
    
    // Add event listeners for menu toggling
    burgerMenu.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);
    
    // Close menu when a nav link is clicked (on mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 815) {
                toggleMenu();
            }
        });
    });
    
    // Home button functionality
    homeNavButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Close menu on mobile after clicking
        if (window.innerWidth <= 815) {
            toggleMenu();
        }
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', highlightNav);
    
    // Add click event to smoothly scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Special case for home button
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });
    
    // Handle window resize to fix menu state issues
    window.addEventListener('resize', function() {
        checkScreenSize();
    });
    
    // Initial calls
    checkScreenSize();
    highlightNav();
});