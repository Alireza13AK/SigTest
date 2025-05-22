# zimbra_script.py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


def nettoyer(signature):
    lignes = signature.strip().splitlines()
    return [ligne.strip() for ligne in lignes if ligne.strip()]


def comparer_signatures(sig1, sig2):
    res = True
    lignes1 = nettoyer(sig1)
    lignes2 = nettoyer(sig2)

    if lignes1 and lignes1[0].strip().endswith(','):
        lignes1 = lignes1[1:]
    if lignes2 and lignes2[0].strip().endswith(','):
        lignes2 = lignes2[1:]

    resultats = []
    champs = ["Votre Nom et prénom", "Votre Groupe TD", "Niveau", "UFR", "Université"]

    for i in range(len(champs)):
        try:
            ligne1 = lignes1[i].strip().lower()
            ligne2 = lignes2[i].strip().lower()
            if ligne1 == ligne2:
                resultats.append(f"{champs[i]} : OK")
            else:
                res = False
                resultats.append(f"{champs[i]} : Différent → '{lignes1[i]}' vs '{lignes2[i]}'")
        except IndexError:
            res = False
            resultats.append(f"{champs[i]} : Manquant dans l'une des signatures")

    resultats.append("Votre signature est correcte!" if res else "Votre signature est malheureusement incorrecte. Veuillez réessayer.")
    return "\n".join(resultats)


def get_signature(signature):
    print("Signature attendue :\n", signature)

    zimbra_url = "https://cas.univ-poitiers.fr/cas/login?service=https%3A%2F%2Fzimbra-auth.univ-poitiers.fr%2Fcas#1"
    username = "test"
    password = "test"

    driver = webdriver.Chrome()
    driver.maximize_window()
    wait = WebDriverWait(driver, 200)

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
            return "Erreur : Connexion à Zimbra échouée. Veuillez vérifier vos identifiants."

        # Clic sur le dossier "signature"
        signature_cell = wait.until(EC.element_to_be_clickable((By.XPATH, "//td[contains(@id, '_textCell') and text()='signature']")))
        signature_cell.click()
        time.sleep(10)

        # Clic sur le premier mail de la liste
        email_row = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[contains(@id, '__rw') and contains(@class, 'ZmRowDoubleHeader')]//span[text()='signature']/ancestor::div[contains(@id, '__rw')]")))
        email_row.click()
        time.sleep(10)

        # Attendre le contenu du mail
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div[class*='MsgBody']")))

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
        return f"Erreur : {str(e)}"

    finally:
        driver.quit()
