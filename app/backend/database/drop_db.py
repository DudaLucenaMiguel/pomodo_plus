import sqlite3

caminho_banco = "C:/Users/dudal/OneDrive/Documentos/GitHub/pomodo_plus/app/backend/database/pomodoroplus.db"

conn = sqlite3.connect(caminho_banco)
cursor = conn.cursor()

# Buscar todas as tabelas do banco, exceto as internas do SQLite
cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
tabelas = [t[0] for t in cursor.fetchall()]

for tabela in tabelas:
    cursor.execute(f"DELETE FROM {tabela};")
    # Reiniciar o autoincremento (opcional)
    cursor.execute(f"DELETE FROM sqlite_sequence WHERE name='{tabela}';")

conn.commit()
conn.close()

print("Todas as tabelas foram limpas, mas mantidas intactas.")
