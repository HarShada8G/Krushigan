from typing import List, Optional, Literal, Dict, Any
from pydantic import BaseModel, Field

# User & Auth Schemas
class UserBase(BaseModel):
    username: str
    phone: Optional[str] = None
    email: Optional[str] = None
    role: Literal["farmer", "officer", "expert", "admin"] = "farmer"
    district: Optional[str] = "Akola"
    designation: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str
    role: Optional[Literal["farmer", "officer", "expert", "admin"]] = "farmer"

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserBase

# Farmer Profile Schemas
class FarmerProfileSchema(BaseModel):
    id: str
    name: str
    phone: str
    state: str = "Maharashtra"
    district: str = "Akola"
    taluka: str = "Akot"
    village: str = "Kavtha Kadu"
    currentCrop: str = "Tomato"
    cropVariety: Optional[str] = "Abhinav"
    growthStage: str = "Flowering"
    landAreaAcre: Optional[float] = 3.5
    locationConsent: bool = True
    latitude: Optional[float] = 21.0975
    longitude: Optional[float] = 77.0583

# Weather & Risk Schemas
class ForecastDay(BaseModel):
    day: str
    temp: float
    humidity: float
    rainProb: float
    condition: str

class WeatherSchema(BaseModel):
    district: str
    temperature: float
    humidity: float
    rainfallProbability: float
    windSpeedKmh: float
    condition: str
    conditionHi: str
    conditionMr: str
    icon: str
    forecast3Days: List[ForecastDay]
    isDemoData: bool = True

# AI Diagnosis & 3-Tier Recommendation Schemas
class GreenTier(BaseModel):
    title: str
    items: List[str]

class YellowTier(BaseModel):
    title: str
    items: List[str]
    bioAgent: Optional[str] = None

class RedTier(BaseModel):
    title: str
    isCertified: bool = True
    activeIngredient: Optional[str] = None
    targetProblem: Optional[str] = None
    authoritySource: Optional[str] = None
    applicationInstructions: Optional[str] = None
    safetyPrecautions: Optional[List[str]] = None
    preHarvestInterval: Optional[str] = None
    disclaimer: Optional[str] = None

class RecommendationsSchema(BaseModel):
    green: GreenTier
    yellow: YellowTier
    red: RedTier

class DiagnosisResultSchema(BaseModel):
    id: str
    reportId: str
    crop: str
    detectedProblem: str
    hindiName: str
    marathiName: str
    confidenceScore: float
    severity: Literal["low", "medium", "high", "severe"]
    symptoms: List[str]
    recommendations: RecommendationsSchema
    environmentalRiskCorrelation: Optional[str] = None
    isSimulatedDemo: bool = True

# Crop Report Schemas
class AnalyzeRequest(BaseModel):
    image_data: str
    crop: str = "Tomato"
    growth_stage: str = "Flowering"
    district: Optional[str] = "Akola"

class CropReportCreate(BaseModel):
    farmerId: str
    farmerName: str
    phone: Optional[str] = None
    district: str
    taluka: str
    village: str
    crop: str
    variety: Optional[str] = None
    growthStage: str
    imageUrl: str
    diagnosis: Optional[DiagnosisResultSchema] = None

class ExpertValidationSchema(BaseModel):
    expertId: str
    expertName: str
    verifiedDiagnosis: str
    notes: str
    validatedAt: str
    status: Literal["confirmed", "corrected", "request_image", "lab_referral", "unknown"]

class CropReportSchema(BaseModel):
    id: str
    farmerId: str
    farmerName: str
    phone: Optional[str] = None
    district: str
    taluka: str
    village: str
    crop: str
    variety: Optional[str] = None
    growthStage: str
    imageUrl: str
    timestamp: str
    status: Literal["pending", "ai_analyzed", "expert_confirmed", "expert_corrected", "lab_referred"]
    diagnosis: Optional[DiagnosisResultSchema] = None
    expertValidation: Optional[ExpertValidationSchema] = None
    followUpStatus: Optional[Literal["improved", "no_change", "worsened"]] = None
    followUpNotes: Optional[str] = None

# Officer & GIS Schemas
class HotspotSchema(BaseModel):
    district: str
    marathiName: str
    lat: float
    lng: float
    riskLevel: Literal["low", "medium", "high", "severe"]
    activeReportsCount: int
    confirmedCasesCount: int
    primaryCrop: str
    prevalentDisease: str
    recentWeather: str
    trend: Literal["increasing", "stable", "decreasing"]
    talukasHighRisk: List[str]
    isDemoData: bool = True

class BroadcastAlertCreate(BaseModel):
    title: str
    district: str
    taluka: str
    crop: str
    diseaseOrPest: str
    riskLevel: Literal["low", "medium", "high", "severe"]
    messageHi: str
    messageMr: Optional[str] = None
    messageEn: Optional[str] = None
    authorOfficer: str = "Dr. Sunita Deshmukh"

class BroadcastAlertSchema(BroadcastAlertCreate):
    id: str
    targetCount: int
    dispatchedAt: str
    deliveryStatus: str = "simulated_sent"

# Learning Loop Schemas
class LearningMetricsSchema(BaseModel):
    totalAnalyzed: int
    pendingValidation: int
    expertConfirmed: int
    expertCorrected: int
    unknownMarked: int
    datasetReadyCount: int
    currentModelVersion: str
    candidateModelVersion: str
    benchmarkAccuracy: float
    latestRetrainCandidateDate: str
