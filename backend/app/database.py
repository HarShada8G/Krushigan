import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import DATABASE_URL

logger = logging.getLogger("krushigan.database")

def normalize_database_url(url: str) -> str:
    """
    Normalizes database connection URLs.
    Render and other PaaS providers supply 'postgres://' which SQLAlchemy 1.4+ rejects.
    Converts 'postgres://' to standard 'postgresql://'.
    """
    if not url:
        return "sqlite:///./krushigan.db"
    url_stripped = url.strip()
    if url_stripped.startswith("postgres://"):
        return url_stripped.replace("postgres://", "postgresql://", 1)
    return url_stripped

ACTIVE_DB_URL = normalize_database_url(DATABASE_URL)

connect_args = {}
if ACTIVE_DB_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

try:
    engine = create_engine(
        ACTIVE_DB_URL,
        connect_args=connect_args,
        pool_pre_ping=True
    )
except Exception as e:
    # Safe error logging without exposing database credentials
    logger.error("Failed to connect to configured database. Initializing safe SQLite fallback.")
    ACTIVE_DB_URL = "sqlite:///./krushigan.db"
    engine = create_engine(
        ACTIVE_DB_URL,
        connect_args={"check_same_thread": False},
        pool_pre_ping=True
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """FastAPI database session dependency."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db(target_engine=None):
    """Initializes tables in the target engine without dropping existing data."""
    eng = target_engine or engine
    from app.models.db_models import UserModel
    Base.metadata.create_all(bind=eng)
