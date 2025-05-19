import os
import csv
import sys
import logging
from datetime import datetime

# Add parent directory to sys.path for db_utils import
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../config')))
from db_utils import get_connection

# Set up logger for this module
logger = logging.getLogger(__name__)

error_files = []

def load_to_db(new_files):
    """
    Loads parsed GPX CSV files into the public.parsed_gpx_points table in the database.
    Each CSV row is inserted as a point with all relevant fields.
    Args:
        new_files (list): List of CSV filenames to process (should be in data/gpx_parsed).
    """
    conn = get_connection("dev")
    cursor = conn.cursor()
    data_dir = "data/gpx_parsed"
    logger.info("Starting GPX CSV load for %d files.", len(new_files))

    for fname in new_files:
        if fname.endswith(".csv"):
            file_path = os.path.join(data_dir, fname)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    reader = csv.DictReader(f)
                    for row in reader:
                        try:
                            # Parse and clean fields
                            full_name = row['name']
                            latitude = float(row['latitude'])
                            longitude = float(row['longitude'])
                            elevation = float(row['elevation']) if row['elevation'] else None
                            time = row['time'] if row['time'] else None
                            # Round to 2 decimal places for precision
                            distance = round(float(row['distance']), 2) if row['distance'] else None
                            elevation_diff = round(float(row['elevation_diff']), 2) if row['elevation_diff'] else None
                            cum_elevation = round(float(row['cum_elevation']), 2) if row['cum_elevation'] else None
                            cum_distance = round(float(row['cum_distance']), 2) if row['cum_distance'] else None

                            cursor.execute("""
                                INSERT INTO public.parsed_gpx_points
                                (full_name, latitude, longitude, elevation, time, distance, elevation_diff, cum_elevation, cum_distance, inserted_at)
                                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
                            """, (
                                full_name, latitude, longitude, elevation, time, distance,
                                elevation_diff, cum_elevation, cum_distance
                            ))
                        except Exception as row_e:
                            logger.error(f"Row error in {fname}: {row_e}")
                            error_files.append(f"{fname} (row: {row})")
                logger.info(f"Inserted: {fname}")
            except Exception as e:
                logger.error(f"Error processing {fname}: {e}")
                error_files.append(fname)

    conn.commit()
    cursor.close()
    conn.close()

    if error_files:
        logger.warning("\nFiles/rows with processing errors:")
        for ef in error_files:
            logger.warning(ef)
    else:
        logger.info("\nNo processing errors.")

if __name__ == "__main__":
    """
    If run as a script, load all CSV files in data/gpx_parsed into the database.
    """
    all_files = [f for f in os.listdir("data/gpx_parsed") if f.endswith(".csv")]
    load_to_db(all_files)

