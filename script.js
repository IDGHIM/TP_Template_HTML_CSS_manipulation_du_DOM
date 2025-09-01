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
