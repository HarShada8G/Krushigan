import os

APP_NAME = "Krushigan API"
APP_VERSION = "1.0.0"
DEBUG = os.getenv("DEBUG", "True").lower() == "true"
DEMO_MODE = os.getenv("DEMO_MODE", "True").lower() == "true"
SECRET_KEY = os.getenv("SECRET_KEY", "krushigan_platform_secure_key_2026")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

# Weather API (Open-Meteo or IMD/OpenWeather fallback)
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY", "")
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./krushigan.db")

# Google Gemini AI Assistant & Vision API Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

# Production-Safe CORS Configuration
FRONTEND_ORIGINS_RAW = os.getenv("FRONTEND_ORIGINS", "")
if DEBUG:
    # Development: Include local dev servers and any explicit FRONTEND_ORIGINS
    dev_defaults = ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000"]
    env_origins = [orig.strip() for orig in FRONTEND_ORIGINS_RAW.split(",") if orig.strip()]
    ALLOWED_ORIGINS = list(dict.fromkeys(dev_defaults + env_origins))
else:
    # Strict Production: Only explicitly allowed domains, never wildcard '*', never implicit localhost
    ALLOWED_ORIGINS = [orig.strip() for orig in FRONTEND_ORIGINS_RAW.split(",") if orig.strip() and orig.strip() != "*"]



