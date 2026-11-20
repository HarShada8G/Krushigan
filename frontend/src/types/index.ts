export type Language = 'hi' | 'mr' | 'en';

export type UserRole = 'farmer' | 'officer' | 'expert' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phone?: string;
  email?: string;
  district?: string;
  taluka?: string;
  village?: string;
  designation?: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  taluka: string;
  village: string;
  currentCrop: string;
  cropVariety?: string;
  growthStage: 'Germination' | 'Vegetative' | 'Flowering' | 'Fruiting' | 'Maturity';
  landAreaAcre?: number;
  locationConsent: boolean;
  latitude?: number;
  longitude?: number;
}

export interface RecommendationTier {
  category: 'green' | 'yellow' | 'red';
  title: string;
  icon?: string;
  steps: string[];
  bioControl?: {
    name: string;
    description: string;
    dosage?: string;
  };
  chemicalControl?: {
    activeIngredient: string;
    targetProblem: string;
    source: string;
    applicationInstructions: string;
    safetyPrecautions: string[];
    preHarvestIntervalDays?: number;
  };
}

export interface DiagnosisResult {
  id: string;
  reportId: string;
  crop: string;
  detectedProblem: string;
  hindiName: string;
  marathiName: string;
  confidenceScore: number; // 0.0 to 1.0 (internal model probability, clearly explained)
  severity: 'low' | 'medium' | 'high' | 'severe';
  symptoms: string[];
  recommendations: {
    green: {
      title: string;
      items: string[];
    };
    yellow: {
      title: string;
      items: string[];
      bioAgent?: string;
    };
    red: {
      title: string;
      isCertified: boolean;
      activeIngredient?: string;
      targetProblem?: string;
      authoritySource?: string;
      applicationInstructions?: string;
      safetyPrecautions?: string[];
      preHarvestInterval?: string;
      disclaimer?: string;
    };
  };
  environmentalRiskCorrelation?: string;
  isSimulatedDemo: boolean;
}

export interface CropReport {
  id: string;
  farmerId: string;
  farmerName: string;
  phone?: string;
  district: string;
  taluka: string;
  village: string;
  crop: string;
  variety?: string;
  growthStage: string;
  imageUrl: string;
  timestamp: string;
  status: 'pending' | 'ai_analyzed' | 'expert_confirmed' | 'expert_corrected' | 'lab_referred';
  diagnosis?: DiagnosisResult;
  expertValidation?: {
    expertId: string;
    expertName: string;
    verifiedDiagnosis: string;
    notes: string;
    validatedAt: string;
    status: 'confirmed' | 'corrected' | 'request_image' | 'lab_referral' | 'unknown';
  };
  followUpStatus?: 'improved' | 'no_change' | 'worsened';
  followUpNotes?: string;
  followUpDate?: string;
}

export interface WeatherData {
  district: string;
  temperature: number;
  humidity: number;
  rainfallProbability: number;
  windSpeedKmh: number;
  condition: string;
  conditionHi: string;
  conditionMr: string;
  icon: string;
  forecast3Days: Array<{
    day: string;
    temp: number;
    humidity: number;
    rainProb: number;
    condition: string;
  }>;
  isDemoData: boolean;
}

export interface EnvironmentalRisk {
  crop: string;
  district: string;
  riskLevel: 'low' | 'medium' | 'high' | 'severe';
  titleHi: string;
  titleMr: string;
  titleEn: string;
  descriptionHi: string;
  descriptionMr: string;
  descriptionEn: string;
  contributingFactors: string[];
  suggestedActionHi: string;
  suggestedActionMr: string;
  suggestedActionEn: string;
}

export interface MaharashtraDistrictHotspot {
  district: string;
  marathiName: string;
  lat: number;
  lng: number;
  riskLevel: 'low' | 'medium' | 'high' | 'severe';
  activeReportsCount: number;
  confirmedCasesCount: number;
  primaryCrop: string;
  prevalentDisease: string;
  recentWeather: string;
  trend: 'increasing' | 'stable' | 'decreasing';
  talukasHighRisk: string[];
  isDemoData: boolean;
}

export interface BroadcastAlert {
  id: string;
  title: string;
  district: string;
  taluka: string;
  crop: string;
  diseaseOrPest: string;
  riskLevel: 'low' | 'medium' | 'high' | 'severe';
  messageHi: string;
  messageMr: string;
  messageEn: string;
  targetCount: number;
  dispatchedAt: string;
  deliveryStatus: 'simulated_sent' | 'delivered' | 'pending';
  authorOfficer: string;
}

export interface LearningPipelineMetrics {
  totalAnalyzed: number;
  pendingValidation: number;
  expertConfirmed: number;
  expertCorrected: number;
  unknownMarked: number;
  datasetReadyCount: number;
  currentModelVersion: string;
  candidateModelVersion: string;
  benchmarkAccuracy: number;
  latestRetrainCandidateDate: string;
}

export interface OfflineGuide {
  id: string;
  crop: string;
  cropHi: string;
  cropMr: string;
  commonProblems: Array<{
    name: string;
    nameHi: string;
    nameMr: string;
    identification: string;
    organicRemedy: string;
    dosAndDonts: string[];
  }>;
  seasonalCalendar: string;
  preventiveMeasures: string[];
}
