# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

DATABASE_URL = "sqlite:///users.db"  # cria users.db na pasta raiz do projeto

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # exigência do SQLite em apps web
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

class Base(DeclarativeBase):
    """Base comum para todos os models."""
    pass
