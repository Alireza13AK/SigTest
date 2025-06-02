/**
 * Script principal exécuté une fois que le DOM est complètement chargé.
 */

document.addEventListener('DOMContentLoaded', function () {
    // === Sélection des éléments ===
    const inputnom = document.getElementById('nom_etu');
    const inputprenom = document.getElementById('prenom_etu');
    const inputtd = document.getElementById('groupe_td_etu');
    const inputformation = document.getElementById('formation_etu');
    const inputautreformation = document.getElementById("autre_formation_etu");
    const inputnivetudes = document.getElementById('diplome_etu');
    const inputcomposante = document.getElementById('composante_etu');
    const inputtelephone = document.getElementById('telephone_etu');
    const resetButton = document.getElementById('reset');
    const submitButton = document.getElementById('submit');
    const alertmess = document.getElementById('alerteautre');
    const alertmess2 = document.getElementById('alertephone');
    const titre_composante = document.getElementById("composante");
    const titre_autreformation = document.getElementById("autre_formation");

    const requiredFields = [
        inputnom,
        inputprenom,
        inputtd,
        inputformation,
        inputcomposante,
        inputnivetudes
    ];


    /**
     * Retourne l’index de la composante correspondant à une formation.
     * 
     * @param {string} formation - Nom complet de la formation sélectionnée.
     * @returns {number|string} Index de la composante ou "Autre" si inconnu.
     */

    function compCheck(formation) {
        switch (formation) {

            // Sciences Humaines et Arts
            case "Histoire – Poitiers":
            case "Psychologie – Poitiers":
            case "Géographie et aménagement – Poitiers":
            case "Philosophie – Poitiers":
            case "Musicologie – Poitiers":
            case "Sociologie – Poitiers":
            case "Histoire de l’art et archéologie – Poitiers":
                return 14;

            // Sciences Fondamentales et Appliquées
            case "CMI Informatique – Poitiers":
            case "CMI Géosciences appliquées – Poitiers":
            case "Chimie – Poitiers":
            case "Sciences pour l’ingénieur – Poitiers":
            case "Physique – Poitiers":
            case "Mathématiques – Poitiers":
            case "CMI Biologie-santé – Poitiers":
            case "Sciences de la vie – Poitiers":
            case "Sciences de la terre – Poitiers":
            case "CMI Chimie – Poitiers":
            case "Informatique – Poitiers":
                return 8;

            // Lettres et langues
            case "LLCER Anglais – Poitiers":
            case "LLCER Anglais avec accès Santé – Poitiers":
            case "LLCER Espagnol – Poitiers":
            case "LLCER Espagnol avec accès Santé – Poitiers":
            case "Lettres – Poitiers":
            case "Arts du spectacle – Poitiers":
            case "Sciences du langage – Poitiers":
            case "Sciences du langage avec accès Santé – Poitiers":
            case "LEA – Poitiers":
                return 12;

            // Droit et sciences sociales
            case "Droit – Poitiers":
            case "Droit – Angoulême":
            case "Droit – Niort":
            case "AES – Poitiers":
                return 10;

            // Faculté des sciences du sport
            case "STAPS – Poitiers":
            case "STAPS – Angoulême":
            case "STAPS avec accès santé – Poitiers":
            case "DEUST Animation et gestion des activités physiques et sportives – Poitiers":
            case "DEUST Animation – parcours Activités aquatiques – Poitiers":
            case "DEUST Animation – parcours Pleine nature – Poitiers":
            case "DEUST Métiers de la forme – Angoulême":
            case "DEUST Préparateur/technicien en pharmacie – CFA/Poitiers (distanciel)":
                return 9;

            // Sciences économiques, IAE
            case "Économie Gestion – Poitiers":
            case "Économie Gestion avec accès Santé – Poitiers":
                return 4;

            // Institut de préparation à l'administration générale
            case "Administration publique – Poitiers":
                return 1;

            // IUT Poitiers-Châtellerault-Niort
            case "BUT Mesures physiques – Châtellerault":
            case "BUT Chimie – Poitiers":
            case "BUT HSE – Niort":
            case "BUT Réseaux et télécommunications – Châtellerault":
            case "BUT Science des Données – Niort":
            case "BUT Métiers de la transition énergétique – Poitiers":
            case "BUT GEA – Poitiers":
            case "BUT GEA – Niort":
            case "BUT Génie mécanique et productique – Poitiers":
            case "BUT Génie électrique et informatique industrielle – Poitiers":
            case "BUT Techniques de commercialisation – Châtellerault":
                return 6;

            // IUT d'Angoulême
            case "BUT MMI – Angoulême":
            case "BUT QLIO – Angoulême":
            case "BUT Génie mécanique et productique – Angoulême":
            case "BUT Génie électrique et informatique industrielle – Angoulême":
            case "BUT Techniques de commercialisation – Angoulême":
                return 7;

            // Double mentions
            case "Double licence Droit-Philosophie – Poitiers":
            case "Double licence Droit-LEA – Poitiers":
                return 3; // A REVOIR CA

            // Santé
            case "LAS Médecine – Poitiers":
            case "LAS Maïeutique – Poitiers":
            case "LAS Odontologie – Poitiers":
            case "LAS Pharmacie – Poitiers":
            case "LAS Masso-kinésithérapie – Poitiers":
            case "Certificat de capacité d’orthophonie – Poitiers":
                return 13;

            // Défaut
            default:
                return "Autre";
        }
    }


    /**
     * Affiche ou masque les champs liés à "Autre formation" selon la sélection.
     * Met également à jour les valeurs et exigences associées.
     */

    // === Affichage conditionnel de l'autre formation ===
    function autreFormCheck() {
        const selectedIndex = inputformation.selectedIndex;

        if (selectedIndex === 0) {
            inputcomposante.style.display = 'block';
            titre_composante.style.display = 'block';
            inputautreformation.style.display = 'block';
            titre_autreformation.style.display = 'block';
            inputcomposante.required = true;
            inputcomposante.selectedIndex = 0;
            inputautreformation.required = true;

        } else {
            inputcomposante.style.display = 'none';
            titre_composante.style.display = 'none';
            inputcomposante.selectedIndex = 0;

            inputautreformation.style.display = 'none';
            titre_autreformation.style.display = 'none';
            inputautreformation.value = '';
            alertmess.style.display = 'none';
            inputautreformation.required = false;
            inputcomposante.required = false;
            //let valeurComp = composanteCheck(inputformation.options[inputformation.selectedIndex].text);
            //inputcomposante.required = false;

            inputcomposante.selectedIndex = compCheck(inputformation.options[inputformation.selectedIndex].text);
            //inputcomposante.value = ;

            console.log("Formation sélectionnée:", inputformation.options[inputformation.selectedIndex].text);
            console.log("Composante détectée:", compCheck(inputformation.options[inputformation.selectedIndex].text));
        }
    }


    /**
     * Vérifie si tous les champs obligatoires sont remplis,
     * puis affiche ou masque le bouton de soumission en conséquence.
     *
     * @function
     * @returns {void}
     */

    // === Vérification des champs obligatoires ===
    function checkFormCompletion() {
        let allFilled = true;

        requiredFields.forEach(function (input) {
            if ((input.tagName === "INPUT" && input.value.trim() === '') ||
                (input.tagName === "SELECT" && input.value === '')) {
                allFilled = false;
            }
        });

        submitButton.style.display = allFilled ? 'inline-block' : 'none';
    }


    /**
     * Retourne le code correspondant au niveau d'études
     * en fonction de la chaîne de texte donnée.
     * 
     * @param {string} annee - Niveau d'études sous forme textuelle (ex : "Bac +3").
     * @returns {string|undefined} Code du niveau d'études correspondant (ex : "L3"),
     *                             ou undefined si aucun cas ne correspond.
     */

        function niv_etudes(annee) {
        switch (annee) {
            case "Bac +1":
                return "L1";
            case "Bac +2":
                return "L2";
            case "Bac +3":
                return "L3";
            case "Bac +4":
                return "M1";
            case "Bac +5":
                return "M2";
            case "Doctorant":
                return "Doctorant";
            default: 
                return "";
        }
    }


    /**
     * Génère la signature formatée à partir des valeurs du formulaire.
     * 
     * Formate le prénom et nom, ajoute le groupe de TD, la formation,
     * la composante, l'université, et éventuellement le téléphone.
     * 
     * @function
     * @returns {string} La signature complète formatée en chaîne de caractères.
     */

    // === Génération de la signature ===

    function generateSignature() {
        alertmess.style.display = 'none';

        const prenomFormate = inputprenom.value.charAt(0).toUpperCase() + inputprenom.value.slice(1).toLowerCase();
        let signature = `Cordialement,\n\n`
        signature += `${prenomFormate} ${inputnom.value.toUpperCase()}\n`;
        signature += `Groupe de TD N°${inputtd.value}\n`;

        if (inputformation.selectedIndex === 0 && inputautreformation.value.trim() !== '') {
            signature += `${niv_etudes(inputnivetudes.options[inputnivetudes.selectedIndex].text)} ${inputautreformation.value}\n`;
            signature += `${inputcomposante.value}\nUniversité de Poitiers\n`;
        } else {
            const formation = `${niv_etudes(inputnivetudes.options[inputnivetudes.selectedIndex].text)} ${inputformation.options[inputformation.selectedIndex].text}`;
            const parts = formation.split("–").map(part => part.trim());
            parts.pop(); // retirer ville
            signature += parts.join(" – ") + '\n';
            const composanteValue = inputcomposante.options[compCheck(inputformation.options[inputformation.selectedIndex].text)].text;
            signature += `${composanteValue}\nUniversité de Poitiers\n`;

        }

        if (inputformation.selectedIndex === 0 && inputautreformation.value.trim() !== '') {

        }
        else

        if (inputtelephone.value.trim() !== '') {
            signature += `Tél : ${inputtelephone.value}`;
        }

        return signature;
    }

    /**
     * Gère l'événement click du bouton de soumission du formulaire.
     * Valide les champs "Autre formation" et téléphone,
     * affiche les alertes et redirige avec la signature encodée.
     * 
     * @param {Event} event - L'événement click.
     */

    // === Gestion du bouton submit ===
    submitButton.addEventListener('click', function (event) {
        const autreValue = inputautreformation.value.trim();
        const phoneValue = inputtelephone.value.trim();

        // Vérifie si "Autre formation" est visible mais vide
        if (inputformation.selectedIndex === 0 && autreValue === '') {
            event.preventDefault();
            alertmess.style.display = 'inline-block';
            return;
        }

        alertmess.style.display = 'none';

        // Vérifie si le téléphone est mal formaté (10 chiffres = 14 caractères avec espaces)
        if (phoneValue !== '' && phoneValue.length !== 14) {
            event.preventDefault();
            alertmess2.style.display = 'inline-block';
            return;
        }

        alertmess2.style.display = 'none';

        const signature = generateSignature();
        const encodedSig = encodeURIComponent(signature);
        window.location.href = `HTML/tutorial.html?signature=${encodedSig}`;
    });


    /**
     * Formate automatiquement la saisie du numéro de téléphone
     * en insérant un espace tous les deux chiffres.
     * 
     * @param {InputEvent} e - L'événement d'entrée sur le champ téléphone.
     */

    // === Auto-espace du téléphone ===
    inputtelephone.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '').substring(0, 10);
        e.target.value = value.match(/.{1,2}/g)?.join(' ') || '';
    });

    

    /**
     * Réinitialise tous les champs du formulaire.
     * Masque les messages d’alerte et réactive les vérifications de champs obligatoires.
     * 
     * @event click
     * @returns {void}
     */

    // === Remise à zéro du formulaire ===
    resetButton.addEventListener('click', function () {
        alertmess.style.display = 'none';
        alertmess2.style.display = 'none';

        inputnom.value = '';
        inputprenom.value = '';
        inputtd.value = '';
        inputformation.selectedIndex = 0;
        inputautreformation.value = '';
        inputnivetudes.selectedIndex = 0;
        inputcomposante.selectedIndex = 0;
        inputtelephone.value = '';

        autreFormCheck();
        setTimeout(checkFormCompletion, 0); // attendre que les valeurs soient réinitialisées
    });


    /**
     * Ajoute des écouteurs d'événements à chaque champ obligatoire
     * pour surveiller leur complétion en temps réel.
     *
     * @function
     * @returns {void}
     */

    // === Écouteurs sur les champs obligatoires ===
    requiredFields.forEach(function (input) {
        input.addEventListener('input', checkFormCompletion);
        input.addEventListener('change', checkFormCompletion);
    });


    /**
     * Surveille les changements dans la liste déroulante de formation.
     * Met à jour dynamiquement les champs associés.
     *
     * @event change
     * @returns {void}
     */

    // === Écouteur pour changement de formation ===
    inputformation.addEventListener('change', autreFormCheck);


    /**
     * Réexécute les fonctions de validation lors du retour à la page via le navigateur (pageshow).
     *
     * @event pageshow
     * @returns {void}
     */

    // === Revalidation après retour arrière navigateur ===
    window.addEventListener('pageshow', function () {
            // === Revalidation après retour arrière navigateur ===
        checkFormCompletion();
        autreFormCheck();
    });

    // === Initialisation ===
    checkFormCompletion();
    autreFormCheck();
});