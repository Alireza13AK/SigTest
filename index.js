document.addEventListener('DOMContentLoaded', function () {
  // Sélectionner tous les champs obligatoires
  const requiredFields = [
      document.getElementById('nom_etu'),
      document.getElementById('prenom_etu'),
      document.getElementById('groupe_td_etu'),
      document.getElementById('formation_etu'),
      document.getElementById('lieu_etu'),
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
});

document.addEventListener('DOMContentLoaded', function () {
  // Sélectionner tous les champs obligatoires
  const requiredFields = [
      document.getElementById('nom_etu'),
      document.getElementById('prenom_etu'),
      document.getElementById('groupe_td_etu'),
      document.getElementById('formation_etu'),
      document.getElementById('lieu_etu'),
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
});

document.addEventListener('DOMContentLoaded', function () {
  const inputnom = document.getElementById('nom_etu');
  const inputprenom = document.getElementById('prenom_etu');
  const inputtd = document.getElementById('groupe_td_etu');
  const inputformation = document.getElementById('formation_etu');
  const inputtelephone = document.getElementById('telephone_etu');
  const submitButton = document.getElementById('submit'); 
  let signature;
  
  
  // Fonction pour générer la signature
  const inputnetudes = document.getElementById('diplome_etu');

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

const generateSignature = () => {
      signature = `${inputprenom.value} ${inputnom.value}\n`;
      signature += `Groupe de TD N°${inputtd.value}\n`;
      signature += `${niv_etudes(inputnetudes.options[inputnetudes.selectedIndex].text)}\n`;
      signature += `UFR: ${inputformation.options[inputformation.selectedIndex].text}\n`;
      signature += `Université de Poitiers\n`;
      
      // Ajouter le numéro de téléphone si renseigné
      if (inputtelephone.value.trim() !== '') {
          signature += `Tel. : ${inputtelephone.value}`;
      }
   

     
  };
  
  // Lorsque l'utilisateur clique sur le bouton "Verification", générer la signature
  submitButton.addEventListener('click', function () {
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
    const inputlieu = document.getElementById('lieu_etu');
    const inputtelephone = document.getElementById('telephone_etu');
    const resetButton = document.getElementById('reset'); 

    function resetSignature() {
        inputnom.value = '';
        inputprenom.value = '';
        inputtd.value = '';
        inputformation.selectedIndex = 0;
        inputnivetudes.selectedIndex = 0;
        inputlieu.selectedIndex = 0;
        inputtelephone.value = '';
    }

    resetButton.addEventListener('click', function () {
        resetSignature();
    });
});
