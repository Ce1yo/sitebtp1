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
        navbarLinks.classList.remove('active');
        navbar.classList.remove('menu-open');
        document.body.classList.remove('menu-open');

        setTimeout(() => {
            isAnimating = false;
        }, 300);
    }

    function openMenu() {
        if (isAnimating) return;
        isAnimating = true;

        toggleButton.classList.add('active');
        navbarLinks.classList.add('active');
        navbar.classList.add('menu-open');
        document.body.classList.add('menu-open');

        // Activer les transitions des éléments du menu
        menuItems.forEach((item, index) => {
            item.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
        });

        setTimeout(() => {
            isAnimating = false;
        }, 300);
    }

    // Gestion du scroll
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDelta = scrollTop - lastScrollTop;
        const isMobile = window.innerWidth <= 768;
        
        // Ne rien faire si on est tout en haut de la page
        if (scrollTop <= 0) {
            navbar.classList.remove('nav-hidden');
            return;
        }

        // Ignorer les petits mouvements de scroll
        if (Math.abs(scrollDelta) < 5) return;

        // Déterminer la direction du scroll
        if (scrollDelta > 0) {
            // Scroll vers le bas
            if (!navbarLinks.classList.contains('active')) {
                // Sur mobile, cacher le menu plus rapidement
                if (isMobile && scrollTop > 50) {
                    navbar.classList.add('nav-hidden');
                } 
                // Sur desktop, attendre un peu plus
                else if (!isMobile && scrollTop > 100) {
                    navbar.classList.add('nav-hidden');
                }
            }
        } else {
            // Scroll vers le haut - toujours montrer le menu
            navbar.classList.remove('nav-hidden');
        }

        lastScrollTop = scrollTop;
    }

    // Optimisation des performances avec debouncing
    function debounceScroll() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            handleScroll();
            scrollTimeout = null;
        }, 10);
    }

    // Écouter l'événement de scroll
    window.addEventListener('scroll', debounceScroll, { passive: true });

    // Gestion du clic sur le bouton toggle
    toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = navbarLinks.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Fermer le menu en cliquant sur un lien
    navbarLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbarLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // Gérer la navigation active
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.navbar-links a');
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Empêcher le défilement lors de l'ouverture du menu
    document.body.addEventListener('touchmove', (e) => {
        if (document.body.classList.contains('menu-open')) {
            e.preventDefault();
        }
    }, { passive: false });
});
