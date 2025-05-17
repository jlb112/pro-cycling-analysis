# runner.py
import logging, sys
from dotenv import load_dotenv
from scrapers.LFR_gpx_scraper import get_track_ids, get_gpx_files

# Logging configuration
def configure_logging():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)-8s %(name)s: %(message)s",
        handlers=[
            logging.StreamHandler(sys.stdout),
            logging.FileHandler("pipeline.log", encoding="utf-8")
        ]
    )

# Run the scraper
def main():
    configure_logging()
    load_dotenv(".env/dev.env")
    # which function to run (get_track_ids, or get_gpx_files), defaults to both
    which = sys.argv[1].lower() if len(sys.argv) > 1 else "all"
    if which in ("ids", "all"):
        ids = get_track_ids()
    else:
        ids = []

    if which in ("gpx", "all"):
        get_gpx_files(ids)

if __name__ == "__main__":
    main()
