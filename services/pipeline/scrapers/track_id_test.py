import time
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from bs4 import BeautifulSoup
import re

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

if __name__ == "__main__":
    track_ids = get_track_ids()
    if track_ids:
        print("Found UWT ME links:")
        for track_id in track_ids:
            print(track_id)
    else:
        print("No matching links found today.")





