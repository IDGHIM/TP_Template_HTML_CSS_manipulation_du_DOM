// Configuration des prix et options
const CONFIG = {
    baseVersion: {
        standard: 499,
        pro: 699,
        ultimate: 899
    },
    colors: {
        silver: 0,
        black: 0,
        blue: 50,
        red: 50,
        gold: 100
    },
    capacities: {
        '512gb': 0,
        '1tb': 200,
        '2tb': 400
    },
    extras: {
        garantie: 99,
        support: 149,
        accessoires: 79,
        formation: 199,
        livraison: 29
    }
};

// État actuel de la configuration
let currentConfig = {
    version: 'standard',
    color: 'silver',
    capacity: '512gb',
    extras: []
};

// Éléments DOM
let elements = {};

// Fonction d'initialisation des éléments DOM
function initializeElements() {
    elements = {
        colorOptions: document.querySelectorAll('.color-option'),
        capacityOptions: document.querySelectorAll('.capacity-option'),
        versionOptions: document.querySelectorAll('.version-option'),
        extraCheckboxes: document.querySelectorAll('.extra-checkbox'),
        selectedVersion: document.getElementById('selected-version'),
        selectedColor: document.getElementById('selected-color'),
        selectedCapacity: document.getElementById('selected-capacity'),
        selectedExtras: document.getElementById('selected-extras'),
        basePrice: document.getElementById('base-price'),
        optionsPrice: document.getElementById('options-price'),
        optionsPriceContainer: document.getElementById('options-price-container'),
        totalPrice: document.getElementById('total-price'),
        addToCartBtn: document.getElementById('add-to-cart')
    };
}

// Fonction pour calculer le prix total
function calculateTotalPrice() {
    const basePrice = CONFIG.baseVersion[currentConfig.version];
    const colorPrice = CONFIG.colors[currentConfig.color];
    const capacityPrice = CONFIG.capacities[currentConfig.capacity];
    
    let extrasPrice = 0;
    currentConfig.extras.forEach(extra => {
        extrasPrice += CONFIG.extras[extra];
    });

    const optionsTotal = colorPrice + capacityPrice + extrasPrice;
    const totalPrice = basePrice + optionsTotal;

    return {
        base: basePrice,
        options: optionsTotal,
        total: totalPrice
    };
}

// Fonction pour mettre à jour l'affichage des prix
function updatePriceDisplay() {
    const prices = calculateTotalPrice();
    
    if (elements.basePrice) {
        elements.basePrice.textContent = `${prices.base}€`;
    }
    
    if (elements.optionsPrice && elements.optionsPriceContainer) {
        if (prices.options > 0) {
            elements.optionsPrice.textContent = `+${prices.options}€`;
            elements.optionsPriceContainer.style.display = 'flex';
        } else {
            elements.optionsPriceContainer.style.display = 'none';
        }
    }
    
    if (elements.totalPrice) {
        elements.totalPrice.textContent = `${prices.total}€`;
    }
}

// Fonction pour mettre à jour le résumé de configuration
function updateConfigSummary() {
    // Version
    const versionNames = {
        standard: 'Standard',
        pro: 'Pro',
        ultimate: 'Ultimate'
    };
    
    if (elements.selectedVersion) {
        elements.selectedVersion.textContent = versionNames[currentConfig.version];
    }

    // Couleur
    const colorNames = {
        silver: 'Argent',
        black: 'Noir',
        blue: 'Bleu',
        red: 'Rouge',
        gold: 'Or'
    };
    
    if (elements.selectedColor) {
        elements.selectedColor.textContent = colorNames[currentConfig.color];
    }

    // Capacité
    const capacityNames = {
        '512gb': '512 GB SSD',
        '1tb': '1 TB SSD',
        '2tb': '2 TB SSD'
    };
    
    if (elements.selectedCapacity) {
        elements.selectedCapacity.textContent = capacityNames[currentConfig.capacity];
    }

    // Extras
    const extraNames = {
        garantie: 'Garantie étendue 5 ans',
        support: 'Support premium 24/7',
        accessoires: 'Pack d\'accessoires',
        formation: 'Formation personnalisée',
        livraison: 'Livraison express 24h'
    };

    if (elements.selectedExtras) {
        elements.selectedExtras.innerHTML = '';
        currentConfig.extras.forEach(extra => {
            const div = document.createElement('div');
            div.className = 'summary-item';
            div.innerHTML = `<span>Extra :</span><span>${extraNames[extra]}</span>`;
            elements.selectedExtras.appendChild(div);
        });
    }
}

// Fonction pour mettre à jour l'interface complète
function updateUI() {
    updatePriceDisplay();
    updateConfigSummary();
}

// Fonction pour gérer les clics sur les options de couleur
function handleColorClick(button) {
    elements.colorOptions.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentConfig.color = button.dataset.color;
    updateUI();
}

// Fonction pour gérer les clics sur les options de capacité
function handleCapacityClick(button) {
    elements.capacityOptions.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentConfig.capacity = button.dataset.capacity;
    updateUI();
}

// Fonction pour gérer les clics sur les versions
function handleVersionClick(button) {
    elements.versionOptions.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentConfig.version = button.dataset.version;
    updateUI();
}

// Fonction pour gérer les changements d'extras
function handleExtraChange(checkbox) {
    const extraName = checkbox.dataset.extra;
    
    if (checkbox.checked) {
        if (!currentConfig.extras.includes(extraName)) {
            currentConfig.extras.push(extraName);
        }
    } else {
        currentConfig.extras = currentConfig.extras.filter(extra => extra !== extraName);
    }
    
    updateUI();
}

// Fonction pour gérer l'ajout au panier
function handleAddToCart() {
    const prices = calculateTotalPrice();
    const config = {
        version: currentConfig.version,
        color: currentConfig.color,
        capacity: currentConfig.capacity,
        extras: currentConfig.extras,
        price: prices.total
    };

    // Ici vous pouvez ajouter la logique pour envoyer les données à votre backend
    // ou les stocker dans un panier
    
    alert(`Configuration ajoutée au panier !\n\nVersion: ${config.version.toUpperCase()}\nCouleur: ${config.color}\nCapacité: ${config.capacity}\nExtras: ${config.extras.join(', ') || 'Aucun'}\n\nPrix total: ${config.price}€`);
    
    // Exemple d'envoi vers une API 
    /*
    fetch('/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(config)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Produit ajouté au panier:', data);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
    */
}

// Fonction d'initialisation des événements
function initializeEventListeners() {
    // Gestionnaires d'événements pour les couleurs
    elements.colorOptions.forEach(button => {
        button.addEventListener('click', () => handleColorClick(button));
    });

    // Gestionnaires d'événements pour les capacités
    elements.capacityOptions.forEach(button => {
        button.addEventListener('click', () => handleCapacityClick(button));
    });

    // Gestionnaires d'événements pour les versions
    elements.versionOptions.forEach(button => {
        button.addEventListener('click', () => handleVersionClick(button));
    });

    // Gestionnaires d'événements pour les extras
    elements.extraCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => handleExtraChange(checkbox));
    });

    // Gestionnaire pour le bouton d'ajout au panier
    if (elements.addToCartBtn) {
        elements.addToCartBtn.addEventListener('click', handleAddToCart);
    }
}

// Fonction pour réinitialiser la configuration
function resetConfiguration() {
    currentConfig = {
        version: 'standard',
        color: 'silver',
        capacity: '512gb',
        extras: []
    };

    // Réinitialiser l'interface
    elements.colorOptions.forEach(btn => btn.classList.remove('active'));
    elements.capacityOptions.forEach(btn => btn.classList.remove('active'));
    elements.versionOptions.forEach(btn => btn.classList.remove('active'));
    elements.extraCheckboxes.forEach(checkbox => checkbox.checked = false);

    // Activer les options par défaut
    const defaultColor = document.querySelector('[data-color="silver"]');
    const defaultCapacity = document.querySelector('[data-capacity="512gb"]');
    const defaultVersion = document.querySelector('[data-version="standard"]');

    if (defaultColor) defaultColor.classList.add('active');
    if (defaultCapacity) defaultCapacity.classList.add('active');
    if (defaultVersion) defaultVersion.classList.add('active');

    updateUI();
}

// Fonction pour obtenir la configuration actuelle
function getCurrentConfiguration() {
    const prices = calculateTotalPrice();
    return {
        ...currentConfig,
        pricing: prices
    };
}

// Fonction pour définir une configuration
function setConfiguration(config) {
    if (config.version && CONFIG.baseVersion[config.version]) {
        currentConfig.version = config.version;
    }
    
    if (config.color && CONFIG.colors.hasOwnProperty(config.color)) {
        currentConfig.color = config.color;
    }
    
    if (config.capacity && CONFIG.capacities[config.capacity]) {
        currentConfig.capacity = config.capacity;
    }
    
    if (config.extras && Array.isArray(config.extras)) {
        currentConfig.extras = config.extras.filter(extra => CONFIG.extras[extra]);
    }

    // Mettre à jour l'interface pour refléter la nouvelle configuration
    updateInterfaceFromConfig();
    updateUI();
}

// Fonction pour mettre à jour l'interface selon la configuration
function updateInterfaceFromConfig() {
    // Couleurs
    elements.colorOptions.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.color === currentConfig.color);
    });

    // Capacités
    elements.capacityOptions.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.capacity === currentConfig.capacity);
    });

    // Versions
    elements.versionOptions.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.version === currentConfig.version);
    });

    // Extras
    elements.extraCheckboxes.forEach(checkbox => {
        checkbox.checked = currentConfig.extras.includes(checkbox.dataset.extra);
    });
}

// Fonction d'initialisation principale
function initializeConfigurator() {
    initializeElements();
    initializeEventListeners();
    updateUI();
}

// Initialisation automatique quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initializeConfigurator);

// Exposition des fonctions utiles dans l'objet global (optionnel)
window.TechNovaConfigurator = {
    getCurrentConfiguration,
    setConfiguration,
    resetConfiguration,
    updateUI
};