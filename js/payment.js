// Sélection du mode de paiement
const paymentOptions = document.querySelectorAll('.payment-option');
let selectedProvider = null;

paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Retire la sélection précédente
        paymentOptions.forEach(opt => opt.classList.remove('selected'));
        // Ajoute la sélection au nouvel élément
        option.classList.add('selected');
        selectedProvider = option.dataset.provider;
    });
});

// Gestion du formulaire de paiement
const paymentForm = document.getElementById('payment-form');
const phoneInput = document.getElementById('phone');
const amountInput = document.getElementById('amount');

// Validation du numéro de téléphone RDC
function validatePhoneNumber(phone) {
    // Format RDC: +243 XX XXX XXXX
    const phoneRegex = /^(\+243|0)[1-9]\d{8}$/;
    return phoneRegex.test(phone);
}

// Formatage du montant
amountInput.addEventListener('input', (e) => {
    // Enlève tous les caractères non numériques
    let value = e.target.value.replace(/[^\d]/g, '');
    // Limite à deux décimales
    if (value.length > 2) {
        value = value.slice(0, -2) + '.' + value.slice(-2);
    }
    // Met à jour la valeur
    e.target.value = value;
});

paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const phone = phoneInput.value.trim();
    const amount = parseFloat(amountInput.value);

    // Validation
    if (!selectedProvider) {
        alert('Veuillez sélectionner un mode de paiement');
        return;
    }

    if (!validatePhoneNumber(phone)) {
        alert('Veuillez entrer un numéro de téléphone RDC valide');
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert('Veuillez entrer un montant valide');
        return;
    }

    // Simulation de l'envoi de la requête de paiement
    const submitButton = paymentForm.querySelector('.payment-submit');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement en cours...';

    try {
        // Simulation d'une requête API (à remplacer par votre véritable API de paiement)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulation de succès
        submitButton.innerHTML = '<i class="fas fa-check"></i> Paiement initié!';
        submitButton.style.backgroundColor = '#4CAF50';

        // Message de succès
        alert(`Un message USSD a été envoyé à votre téléphone ${phone}. Veuillez suivre les instructions pour confirmer le paiement.`);

        // Réinitialisation du formulaire après 3 secondes
        setTimeout(() => {
            paymentForm.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-lock"></i> Payer Maintenant';
            submitButton.style.backgroundColor = '';
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            selectedProvider = null;
        }, 3000);

    } catch (error) {
        // Gestion des erreurs
        submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erreur';
        submitButton.style.backgroundColor = '#f44336';
        alert('Une erreur est survenue lors du traitement du paiement. Veuillez réessayer.');

        // Réactivation du bouton après 3 secondes
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-lock"></i> Payer Maintenant';
            submitButton.style.backgroundColor = '';
        }, 3000);
    }
}); 