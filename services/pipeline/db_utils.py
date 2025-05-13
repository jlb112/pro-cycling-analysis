# services/pipeline/db_utils.py

import os
from dotenv import load_dotenv
import psycopg2

# Load environment variables from .env in the same folder
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

def get_connection():
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
        print("Error connecting to the database:", e)
        return None
