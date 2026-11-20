import time
from typing import List
from fastapi import APIRouter
from app.models.schemas import (
    HotspotSchema, 
    BroadcastAlertSchema, 
    BroadcastAlertCreate,
    LearningMetricsSchema,
    CropReportSchema
)
from app.routers.reports import STORED_REPORTS

router = APIRouter(prefix="/api/officer", tags=["Government Officer Portal"])

# Authentic Maharashtra District coordinates
MAHARASHTRA_HOTSPOTS: List[HotspotSchema] = [
    HotspotSchema(
        district="Akola",
        marathiName="अकोला",
        lat=20.7002,
        lng=77.0082,
        riskLevel="high",
        activeReportsCount=84,
        confirmedCasesCount=52,
        primaryCrop="Tomato",
        prevalentDisease="Early Blight (Alternaria)",
        recentWeather="High Humidity (82%), Rain 18mm",
        trend="increasing",
        talukasHighRisk=["Akot", "Telhara", "Balapur"],
        isDemoData=True
    ),
    HotspotSchema(
        district="Nashik",
        marathiName="नाशिक",
        lat=19.9975,
        lng=73.7898,
        riskLevel="severe",
        activeReportsCount=118,
        confirmedCasesCount=89,
        primaryCrop="Onion / Tomato",
        prevalentDisease="Purple Blotch & Downy Mildew",
        recentWeather="Overcast, High Moisture 88%",
        trend="increasing",
        talukasHighRisk=["Niphad", "Yeola", "Dindori", "Sinnar"],
        isDemoData=True
    ),
    HotspotSchema(
        district="Amravati",
        marathiName="अमरावती",
        lat=20.9374,
        lng=77.7796,
        riskLevel="medium",
        activeReportsCount=62,
        confirmedCasesCount=38,
        primaryCrop="Cotton",
        prevalentDisease="Cotton Aphids & Bollworm",
        recentWeather="Warm 31°C, Humidity 68%",
        trend="stable",
        talukasHighRisk=["Achalpur", "Morshi", "Warud"],
        isDemoData=True
    ),
    HotspotSchema(
        district="Nagpur",
        marathiName="नागपूर",
        lat=21.1458,
        lng=79.0882,
        riskLevel="medium",
        activeReportsCount=45,
        confirmedCasesCount=29,
        primaryCrop="Soybean",
        prevalentDisease="Yellow Mosaic & Stem Fly",
        recentWeather="Partly Cloudy, 30°C",
        trend="decreasing",
        talukasHighRisk=["Katol", "Saoner", "Umred"],
        isDemoData=True
    ),
    HotspotSchema(
        district="Pune",
        marathiName="पुणे",
        lat=18.5204,
        lng=73.8567,
        riskLevel="low",
        activeReportsCount=31,
        confirmedCasesCount=14,
        primaryCrop="Sugarcane / Vegetables",
        prevalentDisease="Early Shoot Borer",
        recentWeather="Pleasant 27°C, Humidity 62%",
        trend="stable",
        talukasHighRisk=["Junnar", "Shirur", "Baramati"],
        isDemoData=True
    )
]

STORED_ALERTS: List[BroadcastAlertSchema] = [
    BroadcastAlertSchema(
        id="ALT-2026-089",
        title="Akola Tomato Early Blight Warning",
        district="Akola",
        taluka="Akot & Telhara",
        crop="Tomato",
        diseaseOrPest="Early Blight",
        riskLevel="high",
        messageHi="टमाटर किसानों के लिए सतर्कता: अगले 48 घंटों में उच्च आर्द्रता के कारण अगेती झुलसा का खतरा है। तुरंत निचली पत्तियों की जांच करें।",
        targetCount=1240,
        dispatchedAt="2026-11-19 04:00 PM",
        deliveryStatus="simulated_sent",
        authorOfficer="Dr. Sunita Deshmukh (DAO Akola)"
    )
]

@router.get("/dashboard")
def get_dashboard_summary():
    return {
        "stats": {
            "totalReports": 1420,
            "confirmedCases": 980,
            "activeRiskAlerts": 14,
            "pendingVerification": 38,
            "highRiskVillages": 27,
            "isDemo": True
        },
        "headline": "Maharashtra Crop Health Surveillance Command Center (Active)",
        "district": "Akola & State HQ"
    }

@router.get("/hotspots", response_model=List[HotspotSchema])
def get_hotspots():
    return MAHARASHTRA_HOTSPOTS

@router.get("/reports", response_model=List[CropReportSchema])
def get_officer_reports():
    return STORED_REPORTS

@router.get("/validation-queue", response_model=List[CropReportSchema])
def get_validation_queue():
    return [r for r in STORED_REPORTS if r.status in ["pending", "ai_analyzed"]]

@router.post("/alerts", response_model=BroadcastAlertSchema)
def broadcast_alert(alert_input: BroadcastAlertCreate):
    new_alert = BroadcastAlertSchema(
        id=f"ALT-2026-{int(time.time()) % 1000:03d}",
        title=alert_input.title,
        district=alert_input.district,
        taluka=alert_input.taluka,
        crop=alert_input.crop,
        diseaseOrPest=alert_input.diseaseOrPest,
        riskLevel=alert_input.riskLevel,
        messageHi=alert_input.messageHi,
        messageMr=alert_input.messageMr,
        messageEn=alert_input.messageEn,
        authorOfficer=alert_input.authorOfficer,
        targetCount=1240,
        dispatchedAt=time.strftime("%Y-%m-%d %I:%M %p"),
        deliveryStatus="simulated_sent"
    )
    STORED_ALERTS.insert(0, new_alert)
    return new_alert

@router.get("/analytics", response_model=LearningMetricsSchema)
def get_analytics():
    return LearningMetricsSchema(
        totalAnalyzed=1420,
        pendingValidation=38,
        expertConfirmed=1140,
        expertCorrected=185,
        unknownMarked=57,
        datasetReadyCount=1325,
        currentModelVersion="MobileNetV3-CropHealth-v1.4",
        candidateModelVersion="EfficientNetB2-Retrain-Candidate-v1.5",
        benchmarkAccuracy=91.8,
        latestRetrainCandidateDate="2026-11-15"
    )
