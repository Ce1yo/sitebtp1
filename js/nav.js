document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.toggle-button');
    const navbarLinks = document.querySelector('.navbar-links');
    const navbar = document.querySelector('.navbar');
    const menuItems = document.querySelectorAll('.navbar-links li');

    let isAnimating = false;
    let lastScrollTop = 0;
    let scrollTimeout;

    function closeMenu() {
        if (isAnimating) return;
        isAnimating = true;

        // Désactiver les transitions des éléments du menu
        menuItems.forEach(item => {
            item.style.transitionDelay = '0s';
        });

        toggleButton.classList.remove('active');
        navbarLinks.classList.remove('