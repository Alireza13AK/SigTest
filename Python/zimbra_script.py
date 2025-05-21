# zimbra_script.py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os


def nettoyer(signature):
    # Supprime les lignes vides et les espaces en trop
    lignes = signature.strip().splitlines()
    lignes_nettoyees = [ligne.strip() for ligne in lignes if ligne.strip()]
    return lignes_nettoyees

def comparer_signatures(sig1, sig2):

    res = True
    
    lignes1 = nettoyer(sig1)
    lignes2 = nettoyer(sig2)

    # Ignore la ligne si elle se termine par une virgule (ex: "Cordialement,")
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

    if res :
        resultats.append(f"Votre signature est correcte!")
    else :
        resultats.append(f"Votre signature est malheureusement incorrecte. Veuillez réessayer.")

    return "\n".join(resultats)


def get_signature(signature):
    print(signature)
    # Configuration
    zimbra_url = "https://cas.univ-poitiers.fr/cas/login?service=https%3A%2F%2Fzimbra-auth.univ-poitiers.fr%2Fcas#1"
    username = "test"
    password = "test"

    driver = webdriver.Chrome()
    driver.maximize_window()
    wait = WebDriverWait(driver, 20)

    try:
        driver.get(zimbra_url)
        wait.until(EC.presence_of_element_located((By.ID, "username"))).send_keys(username)
        wait.until(EC.presence_of_element_located((By.ID, "password"))).send_keys(password)
        driver.find_element(By.NAME, "submit").click()

        time.sleep(5)
        search_input = wait.until(EC.presence_of_element_located((By.ID, "zi_search_inputfield")))
        search_input.send_keys("signature")
        time.sleep(1)
        driver.find_element(By.ID, "zb__Search__SEARCH").click()

        wait.until(EC.presence_of_element_located((By.ID, "z_filterPanel__SR-1_advancedPanel")))
        checkbox = wait.until(EC.presence_of_element_located((By.ID, "zcb__SR-1__BasicFilter__UNREAD_input")))
        if not checkbox.is_selected():
            checkbox.click()

        time.sleep(1)
        folder_button = wait.until(EC.element_to_be_clickable((By.ID, "zb__SR-1__FOLDER")))
        folder_button.click()

        def select_signature():
            items = driver.find_elements(By.CSS_SELECTOR, "#zm__SR-1__FOLDER div, #zm__SR-1__FOLDER td")
            for item in items:
                if item.text.strip().lower() == "signature":
                    time.sleep(1)
                    item.click()
                    return True
            return False

        wait.until(lambda driver: select_signature())
        time.sleep(3)

        email_row = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[contains(@id, '__rw') and contains(@class, 'ZmRowDoubleHeader')]//span[text()='signature']/ancestor::div[contains(@id, '__rw')]")))
        email_row.click()

        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div[class*='MsgBody']")))

        iframe = driver.find_element(By.XPATH, "//iframe")
        driver.switch_to.frame(iframe)
        div = driver.find_element(By.XPATH, "/html/body/div/div/div/div[last()]")
        texte = div.text
        print(texte)

        print(texte)

        resstring = str(comparer_signatures(signature, texte))

        return resstring










    except Exception as e:
        return f"Erreur : {str(e)}"

    finally:
        driver.quit()