// Gestion de la navigation responsive
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animation du bouton hamburger
    navToggle.classList.toggle('active');
});

// Gestion du bouton scroll-to-top
const scrollTopButton = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animation des cartes de service au scroll
const serviceCards = document.querySelectorAll('.service-card');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

serviceCards.forEach(card => {
    observer.observe(card);
});

// Validation du formulaire
const bookingForm = document.getElementById('booking-form');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupération des valeurs du formulaire
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const eventDate = document.getElementById('event-date').value;
    const eventType = document.getElementById('event-type').value;

    // Validation
    let isValid = true;
    let errorMessage = '';

    // Validation du nom
    if (name.length < 2) {
        isValid = false;
        errorMessage += 'Le nom doit contenir au moins 2 caractères.\n';
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        errorMessage += 'Veuillez entrer une adresse email valide.\n';
    }

    // Validation du téléphone
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone)) {
        isValid = false;
        errorMessage += 'Veuillez entrer un numéro de téléphone valide.\n';
    }

    // Validation de la date
    const today = new Date();
    const selectedDate = new Date(eventDate);
    if (selectedDate < today) {
        isValid = false;
        errorMessage += 'La date de l\'événement doit être dans le futur.\n';
    }

    // Validation du type d'événement
    if (!eventType) {
        isValid = false;
        errorMessage += 'Veuillez sélectionner un type d\'événement.\n';
    }

    if (isValid) {
        // Animation de succès
        const submitButton = bookingForm.querySelector('.submit-button');
        submitButton.innerHTML = '✓ Envoyé!';
        submitButton.style.backgroundColor = '#4CAF50';
        
        // Réinitialisation du formulaire après 2 secondes
        setTimeout(() => {
            bookingForm.reset();
            submitButton.innerHTML = 'Envoyer la Demande';
            submitButton.style.backgroundColor = '';
        }, 2000);

        // Ici, vous pourriez ajouter le code pour envoyer les données à un serveur
        console.log('Formulaire validé :', {
            name,
            email,
            phone,
            eventDate,
            eventType
        });
    } else {
        alert(errorMessage);
    }
});

// Effet parallax sur la section hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Animation des labels du formulaire
const formInputs = document.querySelectorAll('.form-group input, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });

    // Pour maintenir le label en haut si l'input a une valeur
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
}); 