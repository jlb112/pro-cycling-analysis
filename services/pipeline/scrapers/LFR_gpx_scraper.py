import time
import os
import sys
import requests
import re
import glob
import logging
from datetime import datetime
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from bs4 import BeautifulSoup
import shutil

# Set up logger for this module
logger = logging.getLogger(__name__)

# -------------------------------
# SESSION SETUP FOR TRACK ID REQUESTS
# -------------------------------

def build_session():
    """
    Build a requests.Session with custom headers and retry logic.
    This helps avoid being blocked and handles transient network errors.
    """
    s = requests.Session()
    s.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    })
    # Configure retry strategy for robustness
    retries = Retry(total=5, backoff_factor=1, status_forcelist=[500,502,503,504], allowed_methods=["GET","HEAD"])
    adapter = HTTPAdapter(max_retries=retries)
    s.mount("https://", adapter)
    s.mount("http://", adapter)
    return s

# -------------------------------
# GET TRACK IDs FOR TODAY'S UWT MEN'S EVENTS
# -------------------------------

def get_track_ids():
    """
    Scrape the LFR calendar for today's date and extract track IDs for
    UCI WorldTour Men's Elite (2.UWT - ME) races.
    Returns a list of track IDs as strings.
    """
    url = "https://www.la-flamme-rouge.eu/index.php"
    logger.info("Fetching calendar page: %s", url)
    sess = build_session()
    try:
        r = sess.get(url, timeout=10)
        r.raise_for_status()
    except Exception as e:
        logger.exception("Failed to fetch calendar")
        return []

    soup = BeautifulSoup(r.text, "html.parser")
    # Find the table cell for today's date
    today = soup.select_one("td.day.day--today")
    if not today:
        logger.warning("No <td class='day day--today'> found")
        return []

    ids = {}
    # Loop through all links in today's cell
    for a in today.find_all("a", href=True):
        meta = a.select_one("div.race__meta")
        # Only consider links with the correct race type (.UWT - ME)
        if meta and ".UWT - ME -" in meta.get_text(strip=True):
            m = re.search(r"/maps/viewtrack/(\d+)", a["href"])
            n = a.select_one("div.race__name")
            if n and m:
                year = str(datetime.now().year)
                # Join all text parts separated by <br> with a space
                name = f"{year} " + " ".join(n.stripped_strings)
                track_id = int(m.group(1))
                ids[name] = track_id
                logger.info("Discovered track: %s -> %s", name, track_id)
                

    return ids

# -------------------------------
# SELENIUM GPX FILE DOWNLOADER
# -------------------------------

from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

# -------------------------------
# HELPER: WAIT FOR FILE TO DOWNLOAD
# -------------------------------

def wait_for_new_gpx(directory, timeout=30, poll_interval=0.5):
    """
    Wait up to `timeout` seconds for *new* .gpx file(s) to appear
    in `directory`, ignoring those already there when we started.
    Returns a list of the new filepaths, or raises a TimeoutError.
    """
    # 1) snapshot the files that already exist
    before = set(glob.glob(os.path.join(directory, "*.gpx")))

    end_time = time.time() + timeout
    while time.time() < end_time:
        # a) wait out any .crdownload temp files first
        if glob.glob(os.path.join(directory, "*.crdownload")):
            time.sleep(poll_interval)
            continue

        # b) find all .gpx now and subtract the old ones
        now = set(glob.glob(os.path.join(directory, "*.gpx")))
        new_file = now - before
        if new_file:
            return next(iter(new_file))  # one file only because download is inside track for loop - so one new at a time

        time.sleep(poll_interval)

    raise TimeoutError(f"No new .gpx downloaded in {directory} after {timeout}s")

# -------------------------------
# MAIN GPX DOWNLOAD FUNCTION
# -------------------------------

def get_gpx_files(track_ids = {"Giro d'Italia Stage 7": 587221}):
    """
    Use Selenium to log in to LFR and download GPX files for the given track IDs.
    Downloads are saved to data/raw (relative to script).
    Accepts a dict: {name: track_id, ...}
    """
    # assume dotenv already loaded by runner
    username = os.getenv("LFR_USERNAME")
    password = os.getenv("LFR_PASSWORD")

    # Set download directory (relative path for portability)
    download_dir = os.path.abspath("data/raw")
    os.makedirs(download_dir, exist_ok=True)

    # Set Chrome options for headless download and custom download directory
    chrome_opts = webdriver.ChromeOptions()
    chrome_opts.add_argument("--headless")
    chrome_opts.add_argument("--window-size=1920,1080")
    prefs = {
        "credentials_enable_service": False,
        "profile.password_manager_enabled": False,
        "download.default_directory": download_dir,
        "download.prompt_for_download": False,
        "download.directory_upgrade": True,
        "safebrowsing.enabled": True,
        "profile.default_content_settings.popups": 0,
        "profile.default_content_setting_values.automatic_downloads": 1
    }
    chrome_opts.add_experimental_option("prefs", prefs)

    # Start Chrome WebDriver
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),
                              options=chrome_opts)
    wait = WebDriverWait(driver, 10)

    try:
        logger.info("Logging in to LFR")
        driver.get("https://www.la-flamme-rouge.eu/ucp.php?mode=login")
        # Dismiss cookie banners if present
        for selector in [".cc-dismiss", ".fc-cta-consent"]:
            try:
                btn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, selector)))
                btn.click()
                logger.debug("Clicked %s banner", selector)
            except Exception:
                logger.debug("No %s banner found", selector)

        # Fill login form
        driver.find_element(By.NAME, "username").send_keys(username)
        driver.find_element(By.NAME, "password").send_keys(password)
        driver.find_element(By.NAME, "login").click()

        # Wait for login redirect to index.php
        wait.until(EC.url_contains("index.php"))
        logger.info("Login successful, dismissing post login banners")

        # Dismiss post-login cookie consent if present
        try:
            accept_button = driver.find_element(
                By.XPATH,
                "//div[contains(@class, 'fc-consent-root')]"
                "//button[@class='fc-button fc-cta-consent fc-primary-button']"
            )
            accept_button.click()
            logger.info("Post-login cookie consent dismissed")
        except Exception as e:
            logger.debug("No post-login consent pop-up found: %s", e)

        # Download GPX for each track ID in the dictionary
        for name, tid in track_ids.items():
            logger.info("Fetching GPX for track '%s' (ID: %s)", name, tid)
            driver.get(f"https://www.la-flamme-rouge.eu/maps/viewtrack/{tid}")
            logger.info(f"url = https://www.la-flamme-rouge.eu/maps/viewtrack/{tid}")
            
            # Find all iframes and try switching to each until the pop up button is found
            iframes = driver.find_elements(By.TAG_NAME, "iframe")
            for iframe in iframes:
                driver.switch_to.frame(iframe)
                try:
                    accept_button = driver.find_element(By.XPATH, "//div[@id='dismiss-button' and contains(@class, 'btn skip')]")
                    accept_button.click()
                    logger.info("Additional ad pop up dismissed")
                    driver.switch_to.default_content()
                    break
                except Exception:
                    logger.info("No ad pop up found")
                    driver.switch_to.default_content()
                    continue


            wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "Export GPX"))).click()
            logger.info("Clicked GPX export for %s", tid)
            try:
                filepath = wait_for_new_gpx(download_dir, timeout=60)
                logger.info("Download complete: %s", filepath)
                # Sanitize name for filesystem (remove/replace problematic characters)
                #safe_name = "".join(c if c.isalnum() or c in " ._-" else "_" for c in name)
                new_path = os.path.join(download_dir, f"{name}.gpx")
                # If file with this name already exists, add a number suffix
                base, ext = os.path.splitext(new_path)
                counter = 1
                while os.path.exists(new_path):
                    new_path = f"{base}_{counter}{ext}"
                    counter += 1
                logger.info("Renaming to %s", new_path)
                shutil.move(filepath, new_path)
                logger.info("Renamed GPX to: %s", new_path)
            except TimeoutError as e:
                logger.error("Download did not complete for %s (%s): %s", name, tid, e)

    finally:
        driver.quit()
        logger.info("WebDriver closed")

# -------------------------------
# FOR STANDALONE FUNCTION TESTING
# -------------------------------

if __name__ == "__main__":
    # e.g. python myscript.py get_track_ids
    if sys.argv[1].lower() == "get_track_ids":
        get_track_ids()
    elif sys.argv[1].lower() == "get_gpx_files":
        get_gpx_files()
    else:
        print("Usage: python myscript.py [get_track_ids|get_gpx_file]")