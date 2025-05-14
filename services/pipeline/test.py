from db_utils import get_connection

conn = get_connection("staging") #"dev", "staging", "prod"
cursor = conn.cursor()
cursor.execute("SELECT * from public.test_table;")
print(cursor.fetchone())
