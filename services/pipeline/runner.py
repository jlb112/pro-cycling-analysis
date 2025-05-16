from scrapers.LFR_gpx_scraper import get_track_ids
from scrapers.LFR_gpx_scraper import get_gpx_file

track_ids = get_track_ids()
print("Track IDs:", track_ids)

get_gpx_file(track_ids)


