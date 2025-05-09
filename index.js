document.addEventListener('DOMContentLoaded', function () {
  // Sélectionner tous les champs obligatoires
  const requiredFields = [
      document.getElementById('nom_etu'),
      document.getElementById('prenom_etu'),
      document.getElementById('groupe_td_etu'),
      document.getElementById('formation_etu'),
      //document.getElementById('lieu_etu'),
      document.getElementById('composante_etu'),
      document.getElementById('diplome_etu')
  ];
  
  const button = document.getElementById('submit');

  // Fonction pour vérifier si tous les champs obligatoires sont remplis
  function checkFormCompletion() {
      let allFilled = true;

      // Vérifier si chaque champ obligatoire est rempli ou sélectionné
      requiredFields.forEach(function(input) {
          if ((input.tagName === "INPUT" && input.value.trim() === '') || 
              (input.tagName === "SELECT" && input.value === '')) {
              allFilled = false;
          }
      });

      // Afficher ou masquer le bouton de soumission en fonction de la validité du formulaire
      if (allFilled) {
          button.style.display = 'inline-block';
      } else {
          button.style.display = 'none';
      }
  }

  // Ajouter un écouteur d'événement pour chaque champ obligatoire
  requiredFields.forEach(function(input) {
      input.addEventListener('input', checkFormCompletion);
      input.addEventListener('change', checkFormCompletion); // Pour les champs select
  });

  // Vérifier l'état du formulaire dès le chargement
  checkFormCompletion();

    window.addEventListener('pageshow', function () {
        checkFormCompletion(); // Revalide les champs après retour arrière
    });

    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', function () {
        setTimeout(checkFormCompletion, 0); // attendre que le reset s'applique avant de vérifier
    });
});

document.addEventListener('DOMContentLoaded', function () {
  const inputnom = document.getElementById('nom_etu');
  const inputprenom = document.getElementById('prenom_etu');
  const inputtd = document.getElementById('groupe_td_etu');
  const inputformation = document.getElementById('formation_etu');
  const inputnetudes = document.getElementById('diplome_etu');
  //const inputlieu = document.getElementById('lieu_etu');
  const inputcomposante = document.getElementById('composante_etu');
  const inputtelephone = document.getElementById('telephone_etu');
  const submitButton = document.getElementById('submit');
  const alertmess = document.getElementById('alerte');


  // Fonction pour générer la signature


    function niv_etudes(annee) {
        switch (annee){
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


    let signature;

    const generateSignature = () => {
        alertmess.style.display = 'none';
        const prenomFormate = inputprenom.value.charAt(0).toUpperCase() + inputprenom.value.slice(1).toLowerCase();

        const parts = inputformation.value.split("–");
        const result = parts.pop().trim();

        signature = `${prenomFormate} ${(inputnom.value).toUpperCase()}\n`;
        signature += `Groupe de TD N°${inputtd.value}\n`;
        const formation= `${niv_etudes(inputnetudes.options[inputnetudes.selectedIndex].text)} ${inputformation.options[inputformation.selectedIndex].text}`;
        const partsf = formation.split("–").map(part => part.trim());
        partsf.pop();
        const resultf = partsf.join(" – ");

        signature += resultf + `\n`;
        signature += `${inputcomposante.value}\n`;
        //signature += `${inputlieu.options[inputlieu.selectedIndex].text}\n`;
        signature += result + `\n`;
      
      // Ajouter le numéro de téléphone si renseigné
      if (inputtelephone.value.trim() !== '') {
          signature += `Tel. : ${inputtelephone.value}`;
      }
   

     
  };
  
  // Lorsque l'utilisateur clique sur le bouton "Verification", générer la signature
  submitButton.addEventListener('click', function() {

      const phoneValue = inputtelephone.value.trim();

      if (phoneValue !== '' && phoneValue.length !== 10) {
          event.preventDefault(); // Empêche l'action par défaut (soumission ou suite du traitement)
          alertmess.style.display = 'inline-block';


          return;
      }
      generateSignature();

         // On récupère la signature générée
         const encodedSig = encodeURIComponent(signature);
         window.location.href = `tutorial.html?signature=${encodedSig}`;

    // Redirection vers tutorial.html avec la signature en paramètre
    window.location.href = `tutorial.html?signature=${encodedSignature}`;
  });


});

document.addEventListener('DOMContentLoaded', function () {
    const inputnom = document.getElementById('nom_etu');
    const inputprenom = document.getElementById('prenom_etu');
    const inputtd = document.getElementById('groupe_td_etu');
    const inputformation = document.getElementById('formation_etu');
    const inputnivetudes = document.getElementById('diplome_etu');
    //const inputlieu = document.getElementById('lieu_etu');
    const inputcomposante = document.getElementById('composante_etu');
    const inputtelephone = document.getElementById('telephone_etu');
    const resetButton = document.getElementById('reset');
    const alertmess = document.getElementById('alerte');

    function resetSignature() {
        alertmess.style.display = 'none';
        inputnom.value = '';
        inputprenom.value = '';
        inputtd.value = '';
        inputformation.selectedIndex = 0;
        inputnivetudes.selectedIndex = 0;
        //inputlieu.selectedIndex = 0;
        inputcomposante.selectedIndex = 0;
        inputtelephone.value = '';

        //faire disparaitre le bouton vérification

    }

    resetButton.addEventListener('click', function () {
        resetSignature();
    });
});
