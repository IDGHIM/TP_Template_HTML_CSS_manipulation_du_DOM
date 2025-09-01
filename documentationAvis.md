Formulaire HTML
(Nom, Commentaire, Note)
        │
        ▼
Événement "submit" sur le formulaire
  - Empêche le rechargement de la page
  - Récupère les valeurs saisies
  - Crée un objet {author, comment, rating}
  - Ajoute cet objet EN HAUT du tableau reviews
        │
        ▼
Tableau reviews (stockage temporaire des avis)
  - Contient tous les avis actuels (existant + nouvel avis)
        │
        ▼
Fonction renderReviews()
  ├─ Vide la zone d’affichage (reviews-list)
  ├─ Pour chaque avis :
  │    ├─ Clone le template HTML
  │    ├─ Remplit le clone avec le nom, commentaire et étoiles
  │    ├─ Ajoute un listener sur le bouton "Supprimer"
  │    └─ Ajoute le clone dans la zone d’affichage
  └─ Affiche tous les avis mis à jour
        │
        ▼
Bouton "Supprimer"
  - Supprime l’avis correspondant du tableau reviews
  - Rappelle renderReviews() pour mettre à jour l’affichage
