document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.hero-image');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    // Fonction pour gérer les images mobiles
    function updateImagesForScreenSize() {
        const isMobile = window.innerWidth <= 768;
        images.forEach(img => {
            const mobileSrc = img.getAttribute('data-mobile-src');
            if (mobileSrc) {
                if (isMobile) {
                    img.setAttribute('src', mobileSrc);
                } else {
                    img.setAttribute('src', img.getAttribute('data-original-src') || img.getAttribute('src'));
                }
            }
        });
    }

    // Sauvegarder les sources originales
    images.forEach(img => {
        if (img.getAttribute('data-mobile-src')) {
            img.setAttribute('data-original-src', img.getAttribute('src'));
        }
    });

    function showImage(index) {
        // Masquer toutes les images et réinitialiser les indicateurs
        images.forEach(img => {
            img.style.opacity = '0';
            img.classList.remove('active');
        });
        indicators.forEach(ind => ind.classList.remove('active'));

        // Afficher l'image sélectionnée et activer l'indicateur correspondant
        images[index].style.opacity = '1';
        images[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    // Initialiser avec la première image
    updateImagesForScreenSize();
    showImage(0);

    // Démarrer le défilement automatique
    setInterval(nextImage, 3000);

    // Mettre à jour les images lors du redimensionnement
    window.addEventListener('resize', updateImagesForScreenSize);
});
