// Structure générale
document.addEventListener("DOMContentLoaded", () => {

    // Tableau des avis existants
    const reviews = [
        { author: "Alice", comment: "Super produit !", rating: 5 },
        { author: "Bob", comment: "Très utile.", rating: 4 }
    ];

    // Récupération des éléments HTML
    const list = document.getElementById("reviews-list");
    const template = document.getElementById("review-template");
    const form = document.getElementById("review-form");

    // Fonction pour afficher les avis
    function renderReviews() {
        list.innerHTML = "";
        reviews.forEach((review, index) => {
            const clone = template.content.cloneNode(true);
            clone.querySelector(".review-author").textContent = review.author;
            clone.querySelector(".review-comment").textContent = review.comment;
            clone.querySelector(".review-rating").textContent = "⭐".repeat(review.rating);

            // Bouton supprimer
            clone.querySelector(".delete-btn").addEventListener("click", () => {
                reviews.splice(index, 1);
                renderReviews();
            });

            list.appendChild(clone);
        });
    }

    // Gestion du formulaire
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const author = document.getElementById("author").value;
        const comment = document.getElementById("comment").value;
        const rating = parseInt(document.getElementById("rating").value);

        reviews.unshift({ author, comment, rating });
        renderReviews();
        form.reset();
    });

    renderReviews(); // affichage initial
});
