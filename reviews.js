// Gestion avis clients avec filtre simple
document.addEventListener("DOMContentLoaded", () => {
  // Tableau des avis existants
  const reviews = [
    { author: "Alice", comment: "Super produit !", rating: 5 },
    { author: "Bob", comment: "Très utile.", rating: 4 },
    { author: "Claire", comment: "Moyen, peut mieux faire.", rating: 3 }
  ];

  // Récupération des éléments HTML
  const list = document.getElementById("reviews-list");
  const template = document.getElementById("review-template");
  const form = document.getElementById("review-form");

  let currentFilter = "all";

  // Création automatique des boutons de filtre
  const filterContainer = document.createElement("div");
  filterContainer.id = "filters";

  const filters = ["all", 5, 4, 3, 2, 1];
  filters.forEach(f => {
    const btn = document.createElement("button");
    btn.textContent = f === "all" ? "Tous" : `${f} ⭐`;
    btn.dataset.filter = f;
    btn.classList.add("filter-btn");
    filterContainer.appendChild(btn);
  });

  // Insérer les boutons avant la liste des avis
  list.parentNode.insertBefore(filterContainer, list);

  // Récupération des boutons après création
  const filterBtns = filterContainer.querySelectorAll(".filter-btn");

  // Fonction pour filtrer les avis
  function getFilteredReviews() {
    if (currentFilter === "all") return reviews;
    return reviews.filter(r => r.rating == currentFilter);
  }

  // Fonction pour afficher les avis
  function renderReviews() {
    list.innerHTML = "";
    const filtered = getFilteredReviews();

    filtered.forEach((review, index) => {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".review-author").textContent = review.author;
      clone.querySelector(".review-comment").textContent = review.comment;
      clone.querySelector(".review-rating").textContent = "⭐".repeat(review.rating);

      // Bouton supprimer
      clone.querySelector(".delete-btn").addEventListener("click", () => {
        const realIndex = reviews.indexOf(filtered[index]);
        reviews.splice(realIndex, 1);
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

  // Gestion du clic sur les boutons de filtre
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      renderReviews();
    });
  });

  // Affichage initial
  renderReviews();
});
