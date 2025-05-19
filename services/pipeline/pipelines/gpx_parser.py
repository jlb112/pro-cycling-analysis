import os
import gpxpy
import xml.etree.ElementTree as ET
import pandas as pd
import numpy as np
import logging
from haversine import haversine, Unit

# Set up logger for this module
logger = logging.getLogger(__name__)

# -------------------------------
# Function to parse metadata using ElementTree
# -------------------------------
def parse_metadata(file_path):
    """
    Parse the GPX file's metadata to extract the author's link (if present).
    Returns the link as a string, or "No link" if not found.
    """
    tree = ET.parse(file_path)
    root = tree.getroot()
    namespace = {"default": "http://www.topografix.com/GPX/1/1"}

    # Extract link from metadata/author/link
    link = root.find("default:metadata/default:author/default:link", namespace)
    link = link.attrib["href"] if link is not None else "No link"

    return link

# -------------------------------
# Fast Haversine calculation using numpy (avoids haversine package for speed)
# -------------------------------
def fast_haversine_np(df):
    """
    Vectorized calculation of distance between consecutive lat/lon points in a DataFrame.
    Returns a numpy array of distances in meters, with 0 for the first point.
    """
    lat = np.radians(df["latitude"].to_numpy())
    lon = np.radians(df["longitude"].to_numpy())
    
    dlat = lat[1:] - lat[:-1]
    dlon = lon[1:] - lon[:-1]

    a = np.sin(dlat / 2.0) ** 2 + np.cos(lat[:-1]) * np.cos(lat[1:]) * np.sin(dlon / 2.0) ** 2
    c = 2 * np.arcsin(np.sqrt(a))
    R = 6371000  # Earth radius in meters
    dist = R * c

    return np.insert(dist, 0, 0)  # Insert 0 for the first point

# -------------------------------
# Directory setup
# -------------------------------
gpx_dir = "data/raw"           # Directory containing raw GPX files
output_dir = "data/gpx_parsed" # Directory to save parsed CSVs

# Ensure the output directory exists
os.makedirs(output_dir, exist_ok=True)

# -------------------------------
# Function to parse all GPX files in the directory
# -------------------------------
def parse_gpx_file():
    """
    Parse all GPX files in gpx_dir, extract track points and metadata,
    compute distances and elevation stats, and save as CSV in output_dir.
    Skips files that have already been processed.
    """
    logger.info(f"Starting GPX parsing in directory: {gpx_dir}")

    new_files = []
    for file_name in os.listdir(gpx_dir):
        if file_name.endswith(".gpx"):
            file_path = os.path.join(gpx_dir, file_name)

            # Check if the corresponding CSV file already exists
            output_file = os.path.join(output_dir, f"{os.path.splitext(file_name)[0]}.csv")
            if os.path.exists(output_file):
                logger.info(f"Skipping {file_name}, already processed.")
                continue  # Skip the file if it's already processed

            logger.info(f"Processing {file_name}...")

            # Extract the file name (without extension) as the name
            name = os.path.splitext(os.path.basename(file_path))[0]
            # Parse metadata for author link
            link = parse_metadata(file_path)

            # Parse track points using gpxpy
            with open(file_path, 'r') as gpx_file:
                gpx = gpxpy.parse(gpx_file)

            route_info = []
            # Loop through all tracks, segments, and points in the GPX file
            for track in gpx.tracks:
                for segment in track.segments:
                    for point in segment.points:
                        route_info.append({
                            "latitude": point.latitude,
                            "longitude": point.longitude,
                            "elevation": point.elevation,
                            "time": point.time,
                            "name": name,
                            "link": link
                        })

            # Convert the list of points to a DataFrame
            route_df = pd.DataFrame(route_info)

            # Calculate distance between consecutive points
            route_df["distance"] = fast_haversine_np(route_df)
            # Calculate elevation difference between consecutive points
            route_df['elevation_diff'] = route_df['elevation'].diff().fillna(0)
            # Calculate cumulative elevation gain/loss
            route_df['cum_elevation'] = route_df['elevation_diff'].cumsum()
            # Calculate cumulative distance
            route_df['cum_distance'] = route_df['distance'].cumsum()

            # Export the DataFrame to CSV
            output_file = os.path.join(output_dir, f"{os.path.splitext(file_name)[0]}.csv")
            route_df.to_csv(output_file, index=False)
            logger.info(f"Saved parsed data to {output_file}")
            new_files.append(f"{os.path.splitext(file_name)[0]}.csv")
            
    logger.info("All GPX files in directory have been processed.")
    
    return new_files

# -------------------------------
# Run the parser if this script is executed directly
# -------------------------------
if __name__ == "__main__":
    parse_gpx_file()
