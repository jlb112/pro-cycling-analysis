import time
import os
import sys
import requests
import re
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from bs4 import BeautifulSoup

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

# FOR TRACKS IN CALENDAR on today's date, IF 2.UWT - ME - take id

def get_track_ids():
    url = "https://www.la-flamme-rouge.eu/index.php"
    s = requests.Session()
    s.headers.update({
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/114.0.0.0 Safari/537.36"
        ),
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    })

    retries = Retry(
        total=5,
        backoff_factor=1,
        status_forcelist=[500, 502, 503, 504],
        allowed_methods=["GET", "HEAD"]
    )
    adapter = HTTPAdapter(max_retries=retries)
    s.mount("https://", adapter)
    s.mount("http://",  adapter)

    try:
        resp = s.get(url, timeout=10)
        resp.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch {url}: {e!r}")
        return []

    soup = BeautifulSoup(resp.text, "html.parser")
    today_td = soup.select_one("td.day.day--today")
    if not today_td:
        print("Could not find a <td class='day day--today'> element.")
        return []

    track_ids = []
    for a in today_td.find_all("a", href=True):
        meta_div = a.select_one("div.race__meta")
        if not meta_div:
            continue
        meta_text = meta_div.get_text(strip=True)
        if "- 2.UWT - ME -" in meta_text:
            href = a["href"]
            m = re.search(r'/maps/viewtrack/(\d+)', href)
            if m:
                track_id = m.group(1)
                track_ids.append(track_id)
                

    return track_ids



def get_gpx_file(track_ids = ['587221']):
    # Import list of track ids to scrape

    load_dotenv(os.path.join(os.path.dirname(__file__), "../.env", "dev.env"))

    username = os.getenv("LFR_USERNAME")
    password = os.getenv("LFR_PASSWORD")

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

    # Fill out the login form with user and password
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

    # FOR Track ID IN TRACK IDS
    for track_id in track_ids:
    
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
        print(f"Downloaded track: {track_id}")

    time.sleep(20)

    # Close the browser when done
    driver.quit()

    print("I ran get gpx data")


# FOR STANDALONE FUNCTION TESTING

if __name__ == "__main__":
    # e.g. python myscript.py foo
    if sys.argv[1].lower() == "get_track_ids":
        get_track_ids()
    elif sys.argv[1].lower() == "get_gpx_file":
        get_gpx_file()
    else:
        print("Usage: python myscript.py [get_track_ids|get_gpx_file]")