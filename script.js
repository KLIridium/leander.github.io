document.addEventListener('DOMContentLoaded', function() {
    // Name hover effect
    const nameLetters = document.querySelectorAll('.hover-name');
    
    nameLetters.forEach(letter => {
        letter.addEventListener('mouseover', () => {
            letter.style.transform = 'translateY(-5px)';
        });
        
        letter.addEventListener('mouseout', () => {
            letter.style.transform = 'translateY(0)';
        });
    });
    
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const rightSide = document.querySelector('.right-side');
    
    // Function to highlight the active section in the navigation
    function highlightActiveSection() {
        const scrollPosition = rightSide.scrollTop + 100; // Adding offset for better detection
        
        // Find which section is currently in view
        let activeSectionId = 'about';
        contentSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionId = section.id;
            }
        });
        
        // Update active nav item
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === activeSectionId) {
                item.classList.add('active');
            }
        });
    }
    
    // Set up click handlers for navigation items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            // Scroll to the section
            rightSide.scrollTo({
                top: targetSection.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });
    
    // Listen for scroll events to update active section
    rightSide.addEventListener('scroll', highlightActiveSection);
    
    // Initialize - highlight the first section
    highlightActiveSection();
    
    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                rightSide.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Profile picture modal functionality
    const profilePic = document.querySelector('.profile-pic');
    const profileModal = document.querySelector('.profile-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Show modal on profile picture click
    profilePic.addEventListener('click', function() {
        profileModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
        profileModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the image
    profileModal.addEventListener('click', function(e) {
        if (e.target === profileModal) {
            profileModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && profileModal.classList.contains('show')) {
            profileModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Image modal functionality for game development section
    const imageModal = document.querySelector('.image-modal');
    const modalImage = document.querySelector('.modal-image');
    const closeImageModal = document.querySelector('.image-modal .close-modal');
    
    // Function to open image modal
    function openImageModal(src, alt) {
        modalImage.src = src;
        modalImage.alt = alt;
        imageModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Close image modal
    closeImageModal.addEventListener('click', function() {
        imageModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the image
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('show')) {
            imageModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add click handlers to game development images
    const gameImages = document.querySelectorAll('.project-images img');
    gameImages.forEach(img => {
        img.addEventListener('click', function() {
            openImageModal(this.src, this.alt);
        });
    });
    
    // Certificate items click handler (simplified)
    const certItems = document.querySelectorAll('.certifications-list li');
    certItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            if (imageSrc) {
                openImageModal(imageSrc, this.textContent.trim() + ' Certificate');
            }
        });
    });


    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const leftSide = document.querySelector('.left-side');
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        leftSide.classList.toggle('mobile-open');
        mobileOverlay.classList.toggle('active');
    });
    
    // Close menu when clicking on overlay
    mobileOverlay.addEventListener('click', function() {
        leftSide.classList.remove('mobile-open');
        this.classList.remove('active');
    });
    
    // Close menu when clicking on a nav item (for mobile)
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                leftSide.classList.remove('mobile-open');
                mobileOverlay.classList.remove('active');
            }
        });
    });

    // Ensure proper mobile scaling
    function handleMobileScaling() {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (window.innerWidth <= 768) {
            viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes');
            // Ensure menu is closed when switching to mobile view
            leftSide.classList.remove('mobile-open');
            mobileOverlay.classList.remove('active');
        } else {
            viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
        }
    }
    
    // Initialize mobile scaling
    handleMobileScaling();
    window.addEventListener('resize', handleMobileScaling);
});

// Resume download functionality
const resumeBtn = document.getElementById('resume-download-btn');
const downloadNotification = document.querySelector('.download-notification');

resumeBtn.addEventListener('click', function(e) {
    // Show notification after a small delay to ensure download started
    setTimeout(() => {
        downloadNotification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            downloadNotification.classList.remove('show');
        }, 3000);
    }, 100);
});
