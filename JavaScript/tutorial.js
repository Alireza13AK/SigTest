document.addEventListener('DOMContentLoaded', function() {    
    /**
     * Récupération de la signature depuis les paramètres de l'URL.
     * Affiche dynamiquement les éléments de la page si la signature est présente.
     */
        
    // Récupération du paramètre "signature" dans l'URL
    const params = new URLSearchParams(window.location.search);
    const signature = params.get('signature');

    // Si une signature est présente dans l'URL
    if (signature) {
        
        // Afficher le titre
		document.getElementById('titre').style.display = 'inline-block';

        // Décoder la signature depuis l'URL et l'afficher dans le <pre>
        const decoded = decodeURIComponent(signature);
        document.getElementById('signature_display').textContent = decoded;
            
        // Afficher le bouton copier
        document.getElementById('copy_button').style.display = 'inline-block';
    }

        
    /**
     * Élément affichant la signature décodée.
     * @type {HTMLElement}
     */
        
    // Élément contenant la signature affichée
    const signature_texte = document.getElementById('signature_display');


    /**
     * Gère le clic sur le bouton de copie.
     * Permet de copier la signature dans le presse-papier et affiche une confirmation.
     *
     * @event click
     * @returns {void}
     */

    // Gestionnaire clic sur le bouton copier
    document.getElementById('copy_button').addEventListener('click', () => {

        // Sélectionner le contenu du <pre> signature_display
        const range = document.createRange();
        range.selectNodeContents(signature_texte);
            
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
            
        // Copier dans le presse-papier
        document.execCommand("copy");

		// Afficher le message que le texte a été copié
        const message = document.getElementById('copy_message');
        message.style.display = 'block';

    });

    /**
     * Une fois le DOM complètement chargé,
     * initialise l'action du bouton de vérification.
     *
     * Redirige vers mail_verif.html avec la signature encodée en paramètre.
     *
     * @event DOMContentLoaded
     * @returns {void}
     */

    // Quand le DOM est charg
    document.addEventListener('DOMContentLoaded', function () {
        // Bouton Vérification redirige vers mail_verif.html avec signature encodée en paramètre URL
        document.getElementById('next_button').addEventListener('click', () => {
            const encodedSig = encodeURIComponent(signature);
            window.location.href = `/mail_verif.html?signature=${encodedSig}`;
         });

    });
})