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

    // === Affichage conditionnel de l'autre formation ===
    function autreFormCheck(event) {
        const selectedIndex = inputformation.selectedIndex;

        if (selectedIndex === 0) {
            inputcomposante.style.display = 'block';
            titre_composante.style.display = 'block';
            inputautreformation.style.display = 'block';
            titre_autreformation.style.display = 'block';
        } else {
            inputcomposante.style.display = 'none';
            titre_composante.style.display = 'none';
            inputcomposante.selectedIndex = 0;

            inputautreformation.style.display = 'none';
            titre_autreformation.style.display = 'none';
            inputautreformation.value = '';
            alertmess.style.display = 'none';
        }
    }

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

    // === Génération de la signature ===
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
        }
    }

    function generateSignature() {
        alertmess.style.display = 'none';
        const prenomFormate = inputprenom.value.charAt(0).toUpperCase() + inputprenom.value.slice(1).toLowerCase();
        let signature = `${prenomFormate} ${inputnom.value.toUpperCase()}\n`;
        signature += `Groupe de TD N°${inputtd.value}\n`;

        if (inputformation.selectedIndex === 0 && inputautreformation.value.trim() !== '') {
            signature += `${niv_etudes(inputnivetudes.options[inputnivetudes.selectedIndex].text)} ${inputautreformation.value}\n`;
        } else {
            const formation = `${niv_etudes(inputnivetudes.options[inputnivetudes.selectedIndex].text)} ${inputformation.options[inputformation.selectedIndex].text}`;
            const parts = formation.split("–").map(part => part.trim());
            parts.pop(); // retirer ville
            signature += parts.join(" – ") + '\n';
        }

        signature += `${inputcomposante.value}\nUniversité de Poitiers\n`;

        if (inputtelephone.value.trim() !== '') {
            signature += `Tél. : ${inputtelephone.value}`;
        }

        return signature;
    }

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
        window.location.href = `tutorial.html?signature=${encodedSig}`;
    });

    // === Auto-espace du téléphone ===
    inputtelephone.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '').substring(0, 10);
        e.target.value = value.match(/.{1,2}/g)?.join(' ') || '';
    });

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

    // === Écouteurs sur les champs obligatoires ===
    requiredFields.forEach(function (input) {
        input.addEventListener('input', checkFormCompletion);
        input.addEventListener('change', checkFormCompletion);
    });

    // === Écouteur pour changement de formation ===
    inputformation.addEventListener('change', autreFormCheck);

    // === Revalidation après retour arrière navigateur ===
    window.addEventListener('pageshow', function () {
        checkFormCompletion();
        autreFormCheck();
    });

    // === Initialisation ===
    checkFormCompletion();
    autreFormCheck();
});
