document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    const imageButtons = document.querySelectorAll('.image-selector button');
    
    function changeHeroImage(imageNumber) {
        heroSection.style.backgroundImage = `url('images/accueil${imageNumber}.jpg')`;
        // Mettre à jour la classe active
        imageButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-image="${imageNumber}"]`).classList.add('active');
    }

    // Initialiser avec la première image
    changeHeroImage(1);

    // Ajouter les écouteurs d'événements aux boutons
    imageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imageNumber = this.getAttribute('data-image');
            changeHeroImage(imageNumber);
        });
    });
});
