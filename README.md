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
./Python/app.py
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

