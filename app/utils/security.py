# app/utils/security.py
from werkzeug.security import generate_password_hash, check_password_hash

def hash_password(password: str) -> str:
    return generate_password_hash(password.strip())

def verify_password(hashed: str, plain: str) -> bool:
    return check_password_hash(hashed, plain.strip())
