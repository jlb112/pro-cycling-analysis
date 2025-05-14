import time
import os
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import undetected_chromedriver as uc
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

load_dotenv(os.path.join('../.env', 'dev.env'))  # Replace with dynamic loader

options = webdriver.ChromeOptions()

options.add_argument('--headless')  # run without GUI
options.add_argument('--window-size=1920,1080')  # ensures full page loads correctly
# Set Chrome options to disable password manager popup
prefs = {
    "credentials_enable_service": False,
    "profile.password_manager_enabled": False
}
options.add_experimental_option("prefs", prefs)
options.add_argument("--start-maximized")

driver = webdriver.Chrome(options=options)

# Start the driver with the options
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# STEP 1: Open homepage
driver.get("https://www.la-flamme-rouge.eu/ucp.php?mode=login&redirect=index.php")
print(driver.title)



# time.sleep(4)

# Try to dismiss the "Got it!" cookie banner if it appears
try:
    wait = WebDriverWait(driver, 5)
    got_it_button = wait.until(EC.element_to_be_clickable(
        (By.CSS_SELECTOR, ".cc-btn.cc-dismiss")
    ))
    got_it_button.click()
    print("Cookie banner dismissed.")
except:
    print("No cookie banner to dismiss.")

time.sleep(2)

# Locate the cookie consent accept button inside the fc-consent-root div
try:
    accept_button = driver.find_element(By.XPATH, "//div[contains(@class, 'fc-consent-root')]//button[@class='fc-button fc-cta-consent fc-primary-button']")
    accept_button.click()
except Exception as e:
    print("No cookie consent pop-up or button not found:", e)


# STEP 3: Wait for the login pop-up to appear
time.sleep(5)

#login_button = driver.find_element(By.XPATH, "//a[span[text()='Login']]")
#login_button.click()

# STEP 4: Enter username and password in the pop-up


username = os.getenv("LFR_USERNAME")
password = os.getenv("LFR_PASSWORD")

print(username, password)


# Fill out the login form in the pop-up
driver.find_element(By.NAME, "username").send_keys(username)
driver.find_element(By.NAME, "password").send_keys(password)

# STEP 5: Submit the login form (press the login button inside the pop-up)
login_button = driver.find_element(By.NAME, "login")
login_button.click()

# STEP 6: Wait for login to complete
time.sleep(5)

try:
    accept_button = driver.find_element(By.XPATH, "//div[contains(@class, 'fc-consent-root')]//button[@class='fc-button fc-cta-consent fc-primary-button']")
    accept_button.click()
except Exception as e:
    print("No cookie consent pop-up or button not found:", e)


time.sleep(5)
# STEP 7: Visit the track page
track_id = 598802
driver.get(f"https://www.la-flamme-rouge.eu/maps/viewtrack/{track_id}")


try:
    accept_button = driver.find_element(By.XPATH, "//div[contains(@class, 'fc-consent-root')]//button[@class='fc-button fc-cta-consent fc-primary-button']")
    accept_button.click()
except Exception as e:
    print("No cookie consent pop-up or button not found:", e)
# STEP 8: Wait for the page to load and confirm login
time.sleep(5)

# STEP 9: Extract or scrape track data
# For example, extracting track data from the page
#track_data = driver.execute_script("return window._trackData")
#print(track_data)

# You can also download the GPX if there's a download link
gpx_button = driver.find_element(By.LINK_TEXT, "Export GPX")
gpx_button.click()

time.sleep(20)

# Close the browser when done
driver.quit()