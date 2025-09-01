document.addEventListener('DOMContentLoaded', () => {
    // Éléments DOM
    const prixTotal = document.getElementById('prix-total');
    const budgetInput = document.getElementById('budget-input');
    const budgetMsg = document.getElementById('budget-message');
    const promoBtn = document.getElementById('promo-btn');
    const promoTimerDisplay = document.getElementById('promo-timer');
    const boutons = document.querySelectorAll('#offres .offre button');
    const optionsSup = document.querySelectorAll('.option-sup');

    // Prix de base
    const prixOffres = {
        Starter: 299,
        Pro: 499,
        Enterprise: 799
    };

    // Variables
    let offreChoisie = null;
    let promoActive = false;
    let promoTimer = null;
    let budgetMax = null;

    // Calculer le total
    function calculerPrixTotal() {
        if (!offreChoisie) {
            prixTotal.textContent = "Prix total : 0€";
            budgetMsg.textContent = "";
            return;
        }

        // Prix de l'offre choisie
        let total = prixOffres[offreChoisie];

        // Ajouter options supplémentaires
        optionsSup.forEach(opt => {
            if (opt.checked) total += parseInt(opt.value);
        });

        // Appliquer promo si active
        if (promoActive) total = Math.round(total * 0.8);

        // Afficher le total
        prixTotal.textContent = `Prix total : ${total}€`;

        // Vérifier le budget
        if (budgetMax) {
            if (total > budgetMax) {
                budgetMsg.textContent = "Ton budget dépasse ";
                budgetMsg.style.color = "red";
            } else {
                budgetMsg.textContent = "Ton choix respecte ton budget ";
                budgetMsg.style.color = "green";
            }
        } else {
            budgetMsg.textContent = "";
        }
    }

    // Sélection des offres
    boutons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.offre').forEach(div => div.classList.remove('choisie'));
            btn.parentElement.classList.add('choisie');
            offreChoisie = btn.parentElement.dataset.offre;
            calculerPrixTotal();
        });
    });

    // Options supplémentaires
    optionsSup.forEach(opt => {
        opt.addEventListener('change', calculerPrixTotal);
    });

    // Promo
    promoBtn.addEventListener('click', () => {
        promoActive = true;
        startPromoTimer(30); // 30 secondes
        calculerPrixTotal();
    });

    function startPromoTimer(duration) {
        let timeLeft = duration;
        clearInterval(promoTimer);

        promoTimer = setInterval(() => {
            promoTimerDisplay.textContent = `Promo restante : ${timeLeft}s`;
            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(promoTimer);
                promoTimerDisplay.textContent = "Promo expirée";
                promoActive = false;
                calculerPrixTotal();
            }
        }, 1000);
    }

    // Budget
    budgetInput.addEventListener('input', (e) => {
        budgetMax = parseInt(e.target.value) || null;
        calculerPrixTotal();
    });
});
