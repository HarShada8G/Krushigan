from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import APP_NAME, APP_VERSION, DEBUG, ALLOWED_ORIGINS
from app.database import init_db
from app.routers.auth import seed_demo_users
from app.routers import auth, farmer, weather, reports, officer, expert, ai

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
    description="Krushigan (कृषिगण) Backend API — AI-Powered Crop Disease Detection, Early Warning & Management Platform for Maharashtra Agriculture",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Startup: Initialize persistent SQLite/PostgreSQL database and seed demo users safely
@app.on_event("startup")
def on_startup():
    init_db()
    seed_demo_users()

# Production CORS setup with explicit allowed origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(farmer.router)
app.include_router(weather.router)
app.include_router(reports.router)
app.include_router(officer.router)
app.include_router(expert.router)
app.include_router(ai.router)

@app.get("/")
def root():
    return {
        "app": APP_NAME,
        "version": APP_VERSION,
        "tagline": "Detect Early. Predict Smarter. Act Faster.",
        "platform": "Krushigan — AI Crop Disease Detection Platform",
        "organization": "Agricultural Technology Initiative for Maharashtra",
        "docs": "/docs",
        "status": "operational"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Krushigan Backend API",
        "version": APP_VERSION,
        "field_data": True
    }
