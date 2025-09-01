document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const homeButton = document.getElementById('homeButton');
    const body = document.body;
    
    // Check for saved theme preference or respect prefers-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme') || 
                         (prefersDarkScheme.matches ? 'night' : 'day');
    
    // Set the initial theme
    if (currentTheme === 'night') {
        body.setAttribute('data-theme', 'night');
    } else {
        body.removeAttribute('data-theme');
    }
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const isNight = body.getAttribute('data-theme') === 'night';
        
        if (isNight) {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'day');
        } else {
            body.setAttribute('data-theme', 'night');
            localStorage.setItem('theme', 'night');
        }
    });

    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        document.querySelector('.background-buildings').style.transform = 
            `translateZ(-10px) scale(2) translateY(${scrollY * 0.2}px)`;
        document.querySelector('.foreground-buildings').style.transform = 
            `translateY(${scrollY * 0.05}px)`;
    });

});