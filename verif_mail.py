from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Configuration
zimbra_url = "https://cas.univ-poitiers.fr/cas/login?service=https%3A%2F%2Fzimbra-auth.univ-poitiers.fr%2Fcas#1"
username = "test"
password = "test"

# Démarrer le navigateur
driver = webdriver.Chrome()  # Ou Firefox(), Edge(), etc.
driver.maximize_window()
wait = WebDriverWait(driver, 20)

# Étape 1 : Accéder à la page de connexion
driver.get(zimbra_url)

# Étape 2 : Connexion via CAS
wait.until(EC.presence_of_element_located((By.ID, "username"))).send_keys(username)
wait.until(EC.presence_of_element_located((By.ID, "password"))).send_keys(password)
driver.find_element(By.NAME, "submit").click()

# Étape 3 : Attendre la barre de recherche
time.sleep(5)
search_input = wait.until(EC.presence_of_element_located((By.ID, "zi_search_inputfield")))
search_input.send_keys("signature")
time.sleep(1)  # pause visuelle
search_button = driver.find_element(By.ID, "zb__Search__SEARCH")
search_button.click()


# Étape 4 : Attendre les filtres avancés
wait.until(EC.presence_of_element_located((By.ID, "z_filterPanel__SR-1_advancedPanel")))

# Étape : Cocher la case "Non lus"
checkbox = wait.until(EC.presence_of_element_located((By.ID, "zcb__SR-1__BasicFilter__UNREAD_input")))

# Si la case n’est pas cochée, on la clique
if not checkbox.is_selected():
    checkbox.click()
# CA NE MARCHE PAS: Quand c'est cliqué


time.sleep(1)  # petite pause visuelle


# Étape 5 : Cliquer sur le bouton "Dossier..."
folder_button = wait.until(EC.element_to_be_clickable((By.ID, "zb__SR-1__FOLDER")))
folder_button.click()

# Étape 6 : Sélectionner "Signature" dans le menu
def select_signature():
    items = driver.find_elements(By.CSS_SELECTOR, "#zm__SR-1__FOLDER div, #zm__SR-1__FOLDER td")
    for item in items:
        if item.text.strip().lower() == "signature":
            time.sleep(1)  # pause visuelle pour voir le menu s'ouvrir
            item.click()
            return True
    return False

wait.until(lambda driver: select_signature())
time.sleep(3)


# Étape : Cliquer sur l'email contenant "Signature"
email_row = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[contains(@id, '__rw') and contains(@class, 'ZmRowDoubleHeader')]//span[text()='signature']/ancestor::div[contains(@id, '__rw')]")))
email_row.click()
print("cliqué")
time.sleep(5)  # pause pour visualiser l'ouverture du mail

# Étape : Attendre le contenu de l'email après clic
email_body = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div[class*='MsgBody']")))
print("chargé")
time.sleep(10)


iframe= driver.find_element(By.XPATH, "//iframe")
driver.switch_to.frame(iframe)

div = driver.find_element(By.XPATH,"/html/body/div/div/div/div[2]")
texte = div.text

print(texte)


# Fin : tu peux ajouter une pause pour voir le résultat
time.sleep(5)
driver.quit()
