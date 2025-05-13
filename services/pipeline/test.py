from db_utils import get_connection

conn = get_connection()
cursor = conn.cursor()
cursor.execute("SELECT * from public.test_table;")
print(cursor.fetchone())
