// Function: loadLanguage
// Description: Charge un fichier de traduction JSON en fonction de la langue choisie.
// Parameters: 
//   - lang: le code de la langue (ex: 'fr', 'en')
//   - callback: fonction à exécuter avec les traductions chargées
// Returns: void
function loadLanguage(lang, callback) {
    // Détection automatique du chemin
    const currentPath = window.location.pathname;
    const isInHtmlFolder = currentPath.includes('/HTML/');
    const prefix = isInHtmlFolder ? '../' : '';
    const filePath = `${prefix}Langage/${lang}.json`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const translations = JSON.parse(xhr.responseText);
            callback(translations);
        } else {
            console.error('Erreur lors du chargement des traductions:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Erreur lors de la requête:', xhr.statusText);
    };
    xhr.send();
}


// Function: applyTranslations
// Description: Applique les traductions aux éléments HTML en fonction de leurs IDs.
// Parameters: 
//   - translations: objet contenant les clés correspondant aux IDs des éléments HTML
// Returns: void
function applyTranslations(translations) {
    Object.entries(translations).forEach(function ([key, value]) {
        const element = document.getElementById(key);

        if (!element) return;

        if (element instanceof HTMLInputElement) {
            element.value = value;
        } else {
            element.textContent = value;
        }
    });
}

// Initialisation de la langue à partir du localStorage ou par défaut en 'fr'
const selectedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
loadLanguage(selectedLanguage, applyTranslations);

// Gestion du changement de langue via une liste déroulante
const languageSelect = document.getElementById('language');
if (languageSelect) {
    languageSelect.value = selectedLanguage;

    languageSelect.addEventListener('change', function (event) {
        const selectedLang = event.target.value;

        localStorage.setItem('selectedLanguage', selectedLang);

        loadLanguage(selectedLang, applyTranslations);
    });
}
