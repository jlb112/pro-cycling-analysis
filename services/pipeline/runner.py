# runner.py
import logging, sys
from dotenv import load_dotenv
from scrapers.LFR_gpx_scraper import get_track_ids, get_gpx_files
from pipelines.gpx_parser import parse_gpx_file
from pipelines.load_gpx_to_db import load_to_db

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
# INCLUDE Logic to skip scraping if completed
def main():
    configure_logging()
    load_dotenv(".env/dev.env")
    # which function to run (get_track_ids, or get_gpx_files), defaults to both
    which = sys.argv[1].lower() if len(sys.argv) > 1 else "all"
    if which in ("ids", "all"):
        ids = get_track_ids()
    else:
        ids = {"2025 Giro d'Italia Stage 8": "587244"} # Example for testing
    if ids:
        if which in ("gpx", "all"):
            get_gpx_files(ids)

        # Parse new gpx file and pass list of files for DB loader
        if which in ("parse", "all"):     
            new_files = parse_gpx_file()
        else: new_files = []
        # LOAD TO DB
        load_to_db(new_files)    
    

if __name__ == "__main__":
    main()
