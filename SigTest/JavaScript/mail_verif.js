document.addEventListener('DOMContentLoaded', function (){
     // Récupération du paramètre "signature" depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const signature = params.get('signature');
    console.log(signature);

    // Si une signature est présente, on l'affiche
    if (signature) {


        // Décode et affiche la signature
        const decoded = decodeURIComponent(signature);

        // Récupère l'élément contenant la signature
        signature_texte = decoded;


    }

    


    /**
     * Envoie une requête au serveur Flask pour vérifier la signature et l'email.
     * Affiche un message d'alerte si l'email n'est pas valide.
     *
     * @event click
     * @async
     * @returns {Promise<void>}
     */

    document.getElementById('fetchSignature').addEventListener('click', async () => {

        // Récupère l'email saisi et l'élément d'alerte
        const email = document.getElementById("email_etu").value;
        const alertemail = document.getElementById("alerteemail");

        // Vérifie que l'email est un email étudiant valide
        if (email.endsWith('@etu.univ-poitiers.fr' ) || email.endsWith('@univ-poitiers.fr' )) {
            alertemail.style.display = 'none';

            // Affiche un message temporaire de traitement
            const resultElement = document.getElementById('result');
            resultElement.innerText = "Vérification en cours ...";

            // Récupère la signature affichée
            const signature_verif = signature_texte;
            console.log(signature_verif);

            // Récupère l'email à nouveau
            const email_verif = document.getElementById("email_etu").value;
            console.log(email_verif);

        
            // Crée l'URL d'appel à l'API Flask
            const url = `http://127.0.0.1:5000/zimbra-signature?signature=${encodeURIComponent(signature_verif)}&email=${encodeURIComponent(email_verif)}`;

            try {
                // Effectue la requête et récupère la réponse en texte
                const response = await fetch(url);
                const text = await response.text();  // Récupère la réponse en texte

                // Affiche la réponse dans l'élément HTML
                resultElement.innerText = text;

            } catch (error) {
                // Affiche un message d'erreur si la requête échoue
                resultElement.innerText = "Erreur lors de la requête : " + error;
            }

        
        } else {
            // Affiche l'alerte si l'email est invalide
            alertemail.style.display = 'inline-block';
        }
    });
})