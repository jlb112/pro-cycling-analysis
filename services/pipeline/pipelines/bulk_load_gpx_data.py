import os
import csv
import sys
from datetime import datetime
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../config')))
from db_utils import get_connection

conn = get_connection("dev")
cursor = conn.cursor()

error_files = []

data_dir = "../analysis/data/gpx_parsed"
for fname in os.listdir(data_dir):
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
                        distance = round(float(row['distance']), 0) if row['distance'] else None
                        elevation_diff = round(float(row['elevation_diff']), 0) if row['elevation_diff'] else None
                        cum_elevation = round(float(row['cum_elevation']), 0) if row['cum_elevation'] else None
                        cum_distance = round(float(row['cum_distance']), 0) if row['cum_distance'] else None

                        cursor.execute("""
                            INSERT INTO public.parsed_gpx_points
                            (full_name, latitude, longitude, elevation, time, distance, elevation_diff, cum_elevation, cum_distance, inserted_at)
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
                        """, (
                            full_name, latitude, longitude, elevation, time, distance,
                            elevation_diff, cum_elevation, cum_distance
                        ))
                    except Exception as row_e:
                        print(f"Row error in {fname}: {row_e}")
                        error_files.append(f"{fname} (row: {row})")
            print(f"Inserted: {fname}")
        except Exception as e:
            print(f"Error processing {fname}: {e}")
            error_files.append(fname)

conn.commit()
cursor.close()
conn.close()

if error_files:
    print("\nFiles/rows with processing errors:")
    for ef in error_files:
        print(ef)
else:
    print("\nNo processing errors.")