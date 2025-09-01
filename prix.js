document.addEventListener('DOMContentLoaded', () => {
    const prixTotal = document.getElementById('prix-total');

    const prixOffres = {
        Starter: 299,
        Pro: 499,
        Enterprise: 799
    };

    let offreChoisie = null;
    const boutons = document.querySelectorAll('#offres button');
    const optionsSup = document.querySelectorAll('.option-sup');

    function calculerPrixTotal() {
        if (!offreChoisie) return prixTotal.textContent = "Prix total : 0€";

        let total = prixOffres[offreChoisie];

        optionsSup.forEach(opt => {
            if (opt.checked) total += parseInt(opt.value);
        });

        prixTotal.textContent = `Prix total : ${total}€`;
    }

    boutons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe choisie de toutes les offres
            document.querySelectorAll('.offre').forEach(div => div.classList.remove('choisie'));

            // Ajouter la classe à l'offre sélectionnée
            btn.parentElement.classList.add('choisie');

            // Récupérer le nom de l'offre choisie
            offreChoisie = btn.parentElement.dataset.offre;

            calculerPrixTotal();
        });
    });

    optionsSup.forEach(opt => {
        opt.addEventListener('change', calculerPrixTotal);
    });
});
