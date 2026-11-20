import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["app"] == "CropGuardian API"
    assert data["team"] == "KRANTIKARI"
    assert data["problemStatementId"] == "26131"

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_farmer_profile():
    response = client.get("/api/farmer/profile")
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert data["district"] == "Akola"

def test_weather():
    response = client.get("/api/weather/current?district=Akola")
    assert response.status_code == 200
    data = response.json()
    assert data["district"] == "Akola"
    assert "temperature" in data

def test_analyze_crop():
    payload = {
        "image_data": "data:image/jpeg;base64,mock",
        "crop": "Tomato",
        "growth_stage": "Flowering"
    }
    response = client.post("/api/reports/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "detectedProblem" in data
    assert "recommendations" in data

def test_officer_dashboard():
    response = client.get("/api/officer/dashboard")
    assert response.status_code == 200
    assert "stats" in response.json()

def test_officer_hotspots():
    response = client.get("/api/officer/hotspots")
    assert response.status_code == 200
    assert len(response.json()) > 0
