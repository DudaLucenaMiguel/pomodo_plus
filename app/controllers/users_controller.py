# app/controllers/users_controller.py
from typing import List, Optional
from sqlalchemy.orm import Session

from app.models.user import User
from app.utils.security import hash_password

def create_user(db: Session, username: str, email: str, password: str, full_name: Optional[str] = None) -> User:
    # valida unicidade
    if db.query(User).filter(User.username == username).first():
        raise ValueError("username já existe")
    if db.query(User).filter(User.email == email.lower()).first():
        raise ValueError("email já existe")

    user = User(
        username=username.strip(),
        email=email.strip().lower(),
        full_name=full_name,
        hashed_password=hash_password(password),
        is_active=True
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def list_users(db: Session) -> List[User]:
    return db.query(User).all()

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    return db.get(User, user_id)
