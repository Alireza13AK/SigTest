# app.py
# Import des modules nécessaires pour créer une API web avec Flask
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS # Pour autoriser les requêtes cross-origin (CORS)
import zimbra_script # Module personnalisé contenant la fonction get_signature
import os


# Initialisation de l'application Flask
app = Flask(__name__)
# Activation du CORS pour permettre les appels API depuis d'autres origines (ex: frontend local)
CORS(app)

# Route principale ('/') qui renvoie le fichier HTML 'mail_verif.html' situé dans le répertoire courant
@app.route('/')
def home():
    return send_from_directory('.', 'mail_verif.html')

# Route API '/zimbra-signature' qui prend en paramètre GET 'signature'
# Appelle la fonction get_signature du module zimbra_script avec la signature fournie en argument
# Retourne le résultat de cette fonction directement en réponse HTTP
@app.route('/zimbra-signature')
def run_script():
    signature = request.args.get('signature') # Récupère la valeur du paramètre 'signature' dans l'URL
    result = zimbra_script.get_signature(signature) # Appel de la fonction de traitement
    return result # Renvoie la réponse (probablement au format JSON)
    
# Point d'entrée principal de l'application
# Démarre le serveur Flask accessible sur toutes les interfaces réseau (0.0.0.0)
# Mode debug activé pour faciliter le développement (rechargement automatique, messages d'erreur détaillés)
if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)