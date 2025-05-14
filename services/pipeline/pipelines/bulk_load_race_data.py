import os
import json
import re
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from db_utils import get_connection

def parse_filename(filename):
    # Example: 2018_Abu_Dhabi_Tour_stage_1.json or 2018_Milan_San_Remo.json
    base = os.path.basename(filename).replace(".json", "")
    m = re.match(r"(\d{4})_(.+?)(?:_stage_(\d+))?$", base)
    if not m:
        raise ValueError(f"Filename {filename} does not match expected pattern")
    year = int(m.group(1))
    race_name = m.group(2).replace("_", " ")
    stage_num = int(m.group(3)) if m.group(3) else None
    if stage_num:
        type_ = "stage"
        full_name = f"{race_name} {year} Stage {stage_num}"
    else:
        type_ = "one_day"
        full_name = f"{race_name} {year}"
    return full_name, race_name, year, type_, stage_num

conn = get_connection("dev")
cursor = conn.cursor()

error_files = []

data_dir = "../analysis/data"
for fname in os.listdir(data_dir):
    if fname.endswith(".json"):
        file_path = os.path.join(data_dir, fname)
        with open(file_path, "r", encoding="utf-8") as f:
            race_data = json.load(f)
        try:
            full_name, race_name, year, type_, stage_num = parse_filename(fname)
            cursor.execute("""
                INSERT INTO public.raw_race_results
                (full_name, race_name, year, type, stage_num, race_data, inserted_at)
                VALUES (%s, %s, %s, %s, %s, %s, NOW())
                ON CONFLICT (full_name) DO NOTHING
            """, (full_name, race_name, year, type_, stage_num, json.dumps(race_data)))
            print(f"Inserted: {full_name}")
        except Exception as e:
            print(f"Error processing {fname}: {e}")
            error_files.append(fname)

conn.commit()
cursor.close()
conn.close()

if error_files:
    print("\nFiles with processing errors:")
    for ef in error_files:
        print(ef)
else:
    print("\nNo processing errors.")