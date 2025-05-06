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
  const generateSignature = () => {
      signature = `${inputprenom.value} ${inputnom.value}\n`;
      signature += `Groupe de TD N° ${inputtd.value}\n`;
      signature += `UFR: ${inputformation.options[inputformation.selectedIndex].text}\n`;
      signature += `Université de Poitiers\n`;
      
      // Ajouter le numéro de téléphone si renseigné
      if (inputtelephone.value.trim() !== '') {
          signature += `Tel: ${inputtelephone.value}`;
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

