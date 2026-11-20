import os

APP_NAME = "CropGuardian API"
APP_VERSION = "1.0.0"
DEBUG = os.getenv("DEBUG", "True").lower() == "true"
DEMO_MODE = os.getenv("DEMO_MODE", "True").lower() == "true"
SECRET_KEY = os.getenv("SECRET_KEY", "cropguardian_hackathon_sih26131_secret_2026")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

# Weather API (Open-Meteo or IMD/OpenWeather fallback)
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY", "")
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./cropguardian.db")
