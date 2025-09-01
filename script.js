// Fonction d'affichage des questions

function afficherQuestionsCasques(questions) {
  const container = document.querySelector("#casques");
  container.innerHTML = "";

  questions.forEach((question) => {
    const item = document.createElement("div");
    item.innerHTML = `
    <details>
        <summary>${question.titre}</summary>
        <p>${question.description}</p>
    </details>`;

    container.appendChild(item);
  });
}

afficherQuestionsCasques(questionsCasques);

// ----------- Drones ----------- //

function afficherQuestionsDrones(questions) {
  const container = document.querySelector("#drones");
  container.innerHTML = "";

  questions.forEach((question) => {
    const item = document.createElement("div");
    item.innerHTML = `
      <details>
          <summary>${question.titre}</summary>
          <p>${question.description}</p>
      </details>`;

    container.appendChild(item);
  });
}

afficherQuestionsDrones(questionsDrones);

// ----------- Stratégie ----------- //

function afficherQuestionsStrategie(questions) {
  const container = document.querySelector("#strategie");
  container.innerHTML = "";

  questions.forEach((question) => {
    const item = document.createElement("div");
    item.innerHTML = `
        <details>
            <summary>${question.titre}</summary>
            <p>${question.description}</p>
        </details>`;

    container.appendChild(item);
  });
}

afficherQuestionsStrategie(questionsStrategie);

// ----------- Recherche ----------- //
// Fonction de tri
const triQuestions = (questions, typeTri) => {
  if (typeTri === "alphabetique") {
    return [...questions].sort((a, b) => a.titre.localeCompare(b.titre));
  } else {
    return [...questions].sort(
      (a, b) => new Date(b.dateCreation) - new Date(a.dateCreation)
    );
  }
};

// Fonction de création de la searchbar et affichage des résultats
function searchBar(questions, typeTri) {
  const container = document.querySelector(".searchbar");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Rechercher";

  container.appendChild(input);

  const resultat = document.createElement("div");

  container.appendChild(resultat);

  input.addEventListener("input", () => {
    const recherche = input.value.toLowerCase().trim();

    const resultatsFiltres = triQuestions(questions, typeTri).filter((a) =>
      a.titre.toLowerCase().includes(recherche)
    );

    resultat.innerHTML = "";

    resultatsFiltres.forEach((a) => {
      const p = document.createElement("p");
      p.textContent = a.titre;
      resultat.appendChild(p);
    });
  });
}

searchBar(questions, "alphabetique");
