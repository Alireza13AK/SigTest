# Signature

## Développeurs

- Alireza AKHLAGHI
- Owen ABRIL

# Architecture du Projet

SigTest\
├── CSS/             
├── HTML/          
├── Images/\
├── JavaScript/               
├── PDF/\
├── Python/\
├── Video/\
├── index.html\
├── README.md


# Lancement du site web avec Selenium et Python

## Prérequis:

- Python installé (version 3.8 ou supérieure recommandée)
- Git
- Visual Studio Code (VSCode)
- Un navigateur compatible (par exemple : Chrome ou Firefox)
- Le WebDriver correspondant (par exemple : chromedriver pour Chrome)

---

## Installation:

### 1. Cloner le dépôt Git

Dans le terminal de VSCode, exécutez la commande suivante :
```bash
git clone https://github.com/Alireza13AK/SigTest.git
cd SigTest
```


### 2. Installer Selenium

Toujours dans le terminal :

```bash
pip install selenium
pip install chromedriver-autoinstaller
```

Le module chromedriver-autoinstaller télécharge et configure automatiquement le ChromeDriver correspondant à votre version de Google Chrome.

> **Si vous n'avez pas pip installé :**  
> Vous pouvez l’installer manuellement avec les commandes suivantes dans PowerShell :

> ```powershell
> curl.exe -o get-pip.py https://bootstrap.pypa.io/get-pip.py
> python get-pip.py
> ```

> Si la commande python ne fonctionne pas, essayez python3 get-pip.py.

> ```powershell
> python3 get-pip.py
> ```

---

## Lancement de l'application

Dans le terminal :

```bash
start index.html && python Python/app.py
```

---

## Lancement manuel du site Web

Si vous souhaitez simplement visualiser le site web (sans automatisation Selenium), vous pouvez ouvrir manuellement le fichier `index.html`.
Plusieurs options :

Via Live Server dans VSCode (recommandé) :

- Installez l'extension "Live Server" dans VSCode.
- Faites un clic droit sur `index.html` > "Open with Live Server".


Ouverture directe dans le navigateur :

Double-cliquez sur `index.html`, ou ouvrez un navigateur puis faites glisser `index.html` dedans.


---

## Licence

### 🔁 Processus de génération de signature électronique

```mermaid
sequenceDiagram
    participant U as Utilisateur
    participant HP as Page d'accueil (index.html)
    participant FP as Page formulaire (formulaire.html)
    participant JS as JavaScript (validation)
    participant TP as Page tutoriel (tutorial.html)
    participant VP as Page vérification (mail_verif.html)
    participant Z as Zimbra (messagerie)

    Note over U,Z: Processus de génération de signature électronique

    U->>HP: Accède à la page d'accueil
    HP-->>U: Affiche vidéo explicative et informations
    
    U->>HP: Clique sur "Commencer le formulaire"
    HP->>FP: Redirection vers formulaire.html
    
    FP-->>U: Affiche le formulaire vide
    
    Note over U,FP: Saisie des informations obligatoires
    U->>FP: Saisit prénom (*)
    U->>FP: Saisit nom (*)
    U->>FP: Saisit groupe TD (1-99) (*)
    U->>FP: Sélectionne formation (*)
    
    alt Formation = "Autre formation"
        FP-->>U: Affiche champ "Autre formation"
        U->>FP: Saisit formation personnalisée (*)
    end
    
    U->>FP: Sélectionne niveau d'études (*)
    U->>FP: Sélectionne composante (*)
    U->>FP: Saisit téléphone (optionnel)
    
    U->>FP: Clique sur "Étape suivante"
    FP->>JS: Déclenche validation du formulaire
    
    alt Validation échoue
        JS-->>FP: Affiche messages d'erreur
        FP-->>U: Montre champs à corriger
        Note over U,FP: L'utilisateur corrige les erreurs
    else Validation réussit
        JS->>TP: Redirection vers tutorial.html
        JS->>TP: Transmet données pour génération signature
    end
    
    TP-->>U: Affiche signature générée
    TP-->>U: Affiche tutoriel vidéo et instructions
    TP-->>U: Bouton "Copier" pour la signature
    
    Note over U,TP: Consultation du tutoriel
    U->>TP: Visualise la vidéo tutorielle
    U->>TP: Consulte les étapes d'implémentation
    U->>TP: Copie la signature générée
    
    Note over U,Z: Implémentation dans Zimbra
    U->>Z: Ouvre Zimbra (nouveau message)
    U->>Z: Accède aux Préférences > Signatures
    U->>Z: Colle la signature copiée
    U->>Z: Configure l'utilisation de la signature
    U->>Z: Enregistre les paramètres
    
    U->>TP: Clique sur "Étape suivante"
    TP->>VP: Redirection vers mail_verif.html
    
    VP-->>U: Page de vérification avec instructions
    
    Note over U,VP: Vérification manuelle et automatique
    U->>Z: Ouvre Zimbra (nouveau message)
    Z-->>U: Interface de création message
    U->>U: Vérifie présence de la signature
    
    alt Signature absente
        U->>TP: Retour au tutoriel
        Note over U,TP: Révision des étapes d'implémentation
    else Signature présente
        Note over U,VP: Vérification automatique
        U->>VP: Saisit adresse email étudiante
        U->>VP: Clique sur "Vérification"
        VP->>VP: Valide format email (@etu.univ-poitiers.fr)
        
        alt Email invalide
            VP-->>U: Affiche alerte format email
        else Email valide
            VP-->>U: Confirmation de la vérification
        end
    end
    
    Note over U,Z: Processus terminé - Signature active dans Zimbra
