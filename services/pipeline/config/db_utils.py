# services/pipeline/db_utils.py

import os
from dotenv import load_dotenv
import psycopg2

def get_connection(env="dev"):
    # Map env name to .env filename
    env_file_map = {
        "dev": "dev.env",
        "staging": "staging.env",
        "prod": "prod.env"
    }

    if env not in env_file_map:
        raise ValueError(f"Invalid environment '{env}'. Choose from 'dev', 'staging', or 'prod'.")

    # Load the correct .env file from the same folder as this script
    env_filename = env_file_map[env]
    dotenv_path = os.path.join(os.path.dirname(__file__), "../.env", env_filename)
    
    load_dotenv(dotenv_path)

    try:
        conn = psycopg2.connect(
            host=os.getenv("PGHOST"),
            port=os.getenv("PGPORT"),
            database=os.getenv("PGDATABASE"),
            user=os.getenv("PGUSER"),
            password=os.getenv("PGPASSWORD")
        )
        return conn
    except Exception as e:
        print(f"[{env.upper()}] Error connecting to the database:", e)
        return None
