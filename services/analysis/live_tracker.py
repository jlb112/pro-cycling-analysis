import requests
import time
import json
from datetime import datetime, timedelta
import os

URL = "https://www.ilgirodabruzzo.it/en/live-feed/tappa/1/"
SAVE_DIR = "data/live_data/raw"
os.makedirs(SAVE_DIR, exist_ok=True)

def fetch_and_save(is_final_run=False):
    try:
        response = requests.get(URL)
        response.raise_for_status()
        data = response.json()

        timestamp = datetime.utcnow().strftime('%Y%m%dT%H%M%SZ')
        timeline = data.get("timeline", {})
        linea = timeline.get("linea", {})
        dati_tappa = timeline.get("dati_tappa", {})
        velocita_media = dati_tappa.get("velocita_media", None)
        distanza_arrivo = linea.get("box_testa_corsa", {}).get("distanza_arrivo", None)

        snapshot = {
            "timestamp": timestamp,
            "velocita_media": velocita_media,
            "distanza_arrivo": distanza_arrivo,
            "linea": linea
        }

        # On final run, get "T_SOLO_TITOLO" entries
        if is_final_run:
            entries = []
            categorie = data.get("cronaca_sintesi", {}).get("categorie", [])
            for cat in categorie:
                for entry in cat.get("entries", []):
                    if entry.get("template") == "T_SOLO_TITOLO":
                        entries.append(entry)
            snapshot["solo_titolo_entries"] = entries

        # Save to file
        filename = os.path.join(SAVE_DIR, f"{timestamp}.json")
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(snapshot, f, ensure_ascii=False, indent=2)

        print(f"[{timestamp}] Data saved. Final: {is_final_run}")
    
    except Exception as e:
        print(f"Error fetching data: {e}")

def run_every_five_minutes(duration_hours=3):
    start_time = datetime.utcnow()
    end_time = start_time + timedelta(hours=duration_hours)
    
    run_count = 0
    while True:
        now = datetime.utcnow()
        time_remaining = (end_time - now).total_seconds()
        is_final = time_remaining <= 300  # Last 5-minute interval

        fetch_and_save(is_final_run=is_final)

        run_count += 1
        if is_final:
            print("✅ Final run complete. Exiting.")
            break
        else:
            time.sleep(120)

# Uncomment to start the script
run_every_five_minutes()
