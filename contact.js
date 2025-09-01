const form = document.getElementById("contactForm");
const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  message: document.getElementById("message")
};
const errors = {
  name: document.getElementById("error-name"),
  email: document.getElementById("error-email"),
  message: document.getElementById("error-message")
};

// Regex email correct (note: \s, pas \\s)
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validation d’un champ
function validateField(field) {
  const value = fields[field].value.trim();
  let error = "";

  if (!value) {
    error = "Ce champ est obligatoire.";
  } else if (field === "email" && !isValidEmail(value)) {
    error = "Veuillez entrer un email valide.";
  }

  errors[field].textContent = error;
  return error === "";
}

// Alias pour compatibilité si tu utilises encore isValidateField(...)
function isValidateField(field) {
  return validateField(field);
}

// Validation globale
function validateForm() {
  return ["name", "email", "message"].every(validateField);
}

// Validation en temps réel (optionnel mais pratique)
Object.keys(fields).forEach((field) => {
  fields[field].addEventListener("input", () => validateField(field));
  fields[field].addEventListener("blur", () => validateField(field));
});

// Soumission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm()) {
    form.reset();
    showModal();
  }
});

// Modale de confirmation (créée dynamiquement)
function showModal() {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <h2>Message envoyé ✅</h2>
    <p>Merci de nous avoir contactés, nous reviendrons vers vous rapidement.</p>
  `;

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Fermer";
  closeBtn.addEventListener("click", () => overlay.remove());

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });

  modal.appendChild(closeBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}