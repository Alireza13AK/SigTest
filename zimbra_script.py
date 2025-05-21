# zimbra_script.py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os


def comparer_textes_multilignes(texte1, texte2):
    lignes1 = texte1.splitlines()
    lignes2 = texte2.splitlines()

    max_lignes = max(len(lignes1), len(lignes2))
    resultats = []


    for i in range(max_lignes):

        # compare ligne par ligne
        ligne_num = i + 1
        ligne1 = lignes1[i] if i < len(lignes1) else "<absente>"
        ligne2 = lignes2[i] if i < len(lignes2) else "<absente>"

        if ligne1 != ligne2:
            resultats.append(f"  Différence ligne {ligne_num} :")
            resultats.append(f"   - Texte 1 : {ligne1}")
            resultats.append(f"   - Texte 2 : {ligne2}")


    if not resultats:
        resultats.append("Les deux textes sont identiques.")

    return resultats


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

        resstring = str(texte == signature)

        resstring += " : " + str(comparer_textes_multilignes(signature, texte))

        return resstring










    except Exception as e:
        return f"Erreur : {str(e)}"

    finally:
        driver.quit()