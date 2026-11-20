from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import APP_NAME, APP_VERSION, DEBUG
from app.routers import auth, farmer, weather, reports, officer, expert

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
    description="CropGuardian Backend API - AI-Powered Crop Disease Detection, Early Warning & Management Platform for Maharashtra Agriculture",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

@app.get("/")
def root():
    return {
        "app": APP_NAME,
        "version": APP_VERSION,
        "tagline": "Detect Early. Predict Smarter. Act Faster.",
        "team": "KRANTIKARI",
        "problemStatementId": "26131",
        "organization": "Government of Maharashtra Initiative Concept",
        "docs": "/docs",
        "demoMode": True
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "CropGuardian Backend API",
        "version": APP_VERSION,
        "demo_mode": True
    }
