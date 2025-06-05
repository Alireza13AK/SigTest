# zimbra_script.py

# Importations de bibliothèques pour faire fonctionner le programme
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import time
<<<<<<< HEAD
=======
import platform
>>>>>>> main


# Sépare les lignes et efface les espaces
def nettoyer(signature): 
    lignes = signature.strip().splitlines()

    # Renvoi d'un tableau des différentes lignes de la signature
    return [ligne.strip() for ligne in lignes if ligne.strip()]


# Compare entre la signature générée via le formulauire et la signature dans le message envoyé
def comparer_signatures(sig1, sig2):

    # Appel de la fonction nettoyer() pour les 2 signatures
    lignes1 = nettoyer(sig1)
    lignes2 = nettoyer(sig2)

    # Suppression de la première ligne si elle contient une virgule ("Cordialement,")
    if lignes1 and lignes1[0].strip().endswith(','):
        lignes1 = lignes1[1:]
    if lignes2 and lignes2[0].strip().endswith(','):
        lignes2 = lignes2[1:]
    
    # Initialisation des tableaux et d'un booléen (vrai ou faux)
    resultats = []
    champs = ["Votre Nom et prénom", "Votre Groupe TD", "Niveau", "UFR", "Université"]
    res = True

    # Boucle qui itère 5 fois vu que la longueur du tableau "champs" est de 5
    for i in range(len(champs)):

        # On essaye de voir (pour une ligne) de comparer chaque ligne des 2 signatures
        try:
            # Suppression des espaces et on met ces chaînes de caractères en minuscule 
            ligne1 = lignes1[i].strip().lower()
            ligne2 = lignes2[i].strip().lower()

            # Si les 2 lignes sont différentes
            if ligne1 == ligne2:
                # On ajoute la ligne de "champs" à "resutlats" et on dit OK
                resultats.append(f"{champs[i]} : OK")

            # Sinon    
            else:
                # On ajoute la ligne de "champs" à "resutlats" et on dit la différence entre ces 2 lignes
                res = False
                resultats.append(f"{champs[i]} : Différent → '{lignes1[i]}' vs '{lignes2[i]}'")

        # Se déclenche si il y a un erreur dans le try (si une des signature est trop courte dans ce cas)
        except IndexError:
            # On ajoute la ligne de "champs" à "resutlats" et on dit qu'il manque une ligne dans une des 2 lignes
            res = False
            resultats.append(f"{champs[i]} : Manquant dans l'une des signatures")

    # Si "res" est resté à VRAI, alors on ajoute à cette même chaîne que c'est CORRECT, sinon on dit que c'est INCORRECT
    resultats.append("Votre signature est correcte!" if res else "Votre signature est malheureusement incorrecte. Veuillez réessayer.")
    return "\n".join(resultats)



# On va prendre la signature et on va dire si ça coïncide avec 
def get_signature(signature,email):
    print("Signature attendue :\n", signature)

    zimbra_url = "https://cas.univ-poitiers.fr/cas/login?service=https%3A%2F%2Fzimbra-auth.univ-poitiers.fr%2Fcas#1"
    username = "test"
    password = "test"

    # Ouvre une nouvelle fenêtre sur Google Chrome
    driver = webdriver.Chrome()
    driver.maximize_window()
    wait = WebDriverWait(driver, 20)
    actions = ActionChains(driver)



    try:
        driver.get(zimbra_url)

        # Connexion
        wait.until(EC.presence_of_element_located((By.ID, "username"))).send_keys(username)
        wait.until(EC.presence_of_element_located((By.ID, "password"))).send_keys(password)
        driver.find_element(By.NAME, "submit").click()

        # ✅ Vérifier que la boîte mail est chargée (indique que la connexion est réussie)
        try:
            print("Connexion réussie.")
        except:
            driver.quit()
            return "Erreur : Connexion à Zimbra échouée. Veuillez vérifier vos identifiants."

        # Clic sur le dossier filtré "signature"
        signature_cell = wait.until(EC.element_to_be_clickable((By.XPATH, "//td[contains(@id, '_textCell') and text()='signature']")))
        signature_cell.click()
        time.sleep(3)

        # Clic sur la flèche du dossier filtré "signature"
        signature_arrow_cell = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="zti__main_Mail__3012_extraCell"]')))
        signature_arrow_cell.click()
        time.sleep(1)

        # Clic sur "éditer les propriétés"
        propr_edit = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#EDIT_PROPS')))
        propr_edit.click()
        time.sleep(2)

        # Appui 2 fois TAB
        actions.send_keys(Keys.TAB).send_keys(Keys.TAB).perform()
        time.sleep(1)
        
        # Selon la plateforme (windows, linux, mac) faire "CTRL + A" ou "CMD + A" pour sélectionner le texte
<<<<<<< HEAD
        import platform
=======
       
>>>>>>> main
        if platform.system() == 'Darwin':  # macOS
            actions.key_down(Keys.COMMAND).send_keys('a').key_up(Keys.COMMAND)
        else:  # Windows/Linux
            actions.key_down(Keys.CONTROL).send_keys('a').key_up(Keys.CONTROL)

        # Remplacer le texte par celui-ci pour changer l'adresse mail du filtrage
        actions.send_keys(Keys.DELETE)
        actions.send_keys(f"signature is:unread from:{email}").perform()
        time.sleep(1)
        
        # Appui bouton OK
        ok_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="FolderProperties_button2_title"]')))
        ok_button.click()
        time.sleep(1)
        
        # Rafraîchir le dossier en le recliquant dessus
        signature_cell.click()
        time.sleep(2)

        # Clic sur le premier mail de la liste
        email_row = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[contains(@id, '__rw') and contains(@class, 'ZmRowDoubleHeader')]//span[text()='signature']/ancestor::div[contains(@id, '__rw')]")))
        email_row.click()
        time.sleep(10)

        # Attendre le contenu du mail
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div[class*='MsgBody']")))

    except:
        driver.quit()
        return "Aucun mail avec l'objet \"Signature\" n'a été envoyé avec cette adresse mail"

    try:
        # Passer dans l'iframe
        iframe = wait.until(EC.presence_of_element_located((By.XPATH, "//iframe")))
        driver.switch_to.frame(iframe)

        # Récupérer la signature dans le contenu du mail
        div = wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div/div/div/div[last()]")))
        texte = div.text
        print("Signature reçue :\n", texte)

        resstring = comparer_signatures(signature, texte)
        return resstring

    except Exception as e:
        driver.quit()
        return f"Erreur : Votre message ne comporte pas de signature\nErreur : {str(e)}"

    finally:
        driver.quit()
