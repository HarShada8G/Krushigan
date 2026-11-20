import { 
  CropReport, 
  DiagnosisResult, 
  FarmerProfile, 
  WeatherData, 
  MaharashtraDistrictHotspot,
  BroadcastAlert,
  LearningPipelineMetrics 
} from '../types';
import { 
  DEMO_FARMER, 
  DEMO_WEATHER, 
  INITIAL_DEMO_REPORTS, 
  DEMO_BROADCAST_ALERTS, 
  DEMO_LEARNING_METRICS 
} from '../data/demoData';
import { MAHARASHTRA_DISTRICT_HOTSPOTS } from '../data/maharashtraGeo';
import { CROP_DISEASES } from '../data/cropDiseases';

const API_BASE = '/api';

// Helper to check if backend is reachable
let isBackendLive: boolean | null = null;

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE}/health`, { method: 'GET', signal: AbortSignal.timeout(1200) });
    if (res.ok) {
      isBackendLive = true;
      return true;
    }
  } catch (e) {
    isBackendLive = false;
  }
  return false;
};

// Farmer Profile APIs
export const getFarmerProfile = async (): Promise<FarmerProfile> => {
  try {
    const res = await fetch(`${API_BASE}/farmer/profile`);
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback to local storage or demo
  }
  const saved = localStorage.getItem('krushigan_farmer_profile');
  return saved ? JSON.parse(saved) : DEMO_FARMER;
};

export const updateFarmerProfile = async (profile: Partial<FarmerProfile>): Promise<FarmerProfile> => {
  try {
    const res = await fetch(`${API_BASE}/farmer/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback
  }
  const current = await getFarmerProfile();
  const updated = { ...current, ...profile };
  localStorage.setItem('krushigan_farmer_profile', JSON.stringify(updated));
  return updated;
};

// Weather APIs
export const getWeatherData = async (district: string = 'Akola'): Promise<WeatherData> => {
  try {
    const res = await fetch(`${API_BASE}/weather/current?district=${encodeURIComponent(district)}`);
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback
  }
  return DEMO_WEATHER;
};

// Simulated AI Inference Engine for Demo Mode
export const analyzeCropPhoto = async (
  imageDataUrl: string, 
  cropName: string = 'Tomato',
  growthStage: string = 'Flowering'
): Promise<DiagnosisResult> => {
  // If backend is active, send to backend
  try {
    const res = await fetch(`${API_BASE}/reports/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_data: imageDataUrl, crop: cropName, growth_stage: growthStage }),
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // Fallback to client deterministic demo diagnosis
  }

  // Deterministic crop-based diagnosis mapping
  const matchedDisease = CROP_DISEASES.find(d => d.crop.toLowerCase() === cropName.toLowerCase()) || CROP_DISEASES[0];

  return {
    id: `diag_${Date.now()}`,
    reportId: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
    crop: matchedDisease.crop,
    detectedProblem: matchedDisease.name,
    hindiName: matchedDisease.nameHi,
    marathiName: matchedDisease.nameMr,
    confidenceScore: 0.93,
    severity: matchedDisease.typicalSeverity,
    symptoms: matchedDisease.symptoms.hi,
    recommendations: {
      green: {
        title: matchedDisease.recommendations.green.titleHi,
        items: matchedDisease.recommendations.green.stepsHi
      },
      yellow: {
        title: matchedDisease.recommendations.yellow.titleHi,
        items: matchedDisease.recommendations.yellow.stepsHi,
        bioAgent: matchedDisease.recommendations.yellow.bioAgent
      },
      red: {
        title: matchedDisease.recommendations.red.titleHi,
        isCertified: matchedDisease.recommendations.red.isCertified,
        activeIngredient: matchedDisease.recommendations.red.activeIngredient,
        targetProblem: matchedDisease.recommendations.red.targetProblem,
        authoritySource: matchedDisease.recommendations.red.authoritySource,
        applicationInstructions: matchedDisease.recommendations.red.applicationInstructionsHi,
        safetyPrecautions: matchedDisease.recommendations.red.safetyPrecautionsHi,
        preHarvestInterval: matchedDisease.recommendations.red.preHarvestIntervalDays 
          ? `${matchedDisease.recommendations.red.preHarvestIntervalDays} à¤¦à¤¿à¤¨ (Days)` 
          : undefined,
        disclaimer: matchedDisease.recommendations.red.disclaimerHi
      }
    },
    environmentalRiskCorrelation: matchedDisease.environmentalTrigger.descriptionHi,
    isSimulatedDemo: true
  };
};

// Reports History
export const getFarmerReports = async (): Promise<CropReport[]> => {
  const localHistoryStr = localStorage.getItem('krushigan_reports_history');
  let localReports: CropReport[] = localHistoryStr ? JSON.parse(localHistoryStr) : [];
  
  if (localReports.length === 0) {
    localReports = INITIAL_DEMO_REPORTS;
    localStorage.setItem('krushigan_reports_history', JSON.stringify(localReports));
  }
  return localReports;
};

export const saveCropReport = async (report: CropReport): Promise<CropReport> => {
  const history = await getFarmerReports();
  const updated = [report, ...history.filter(r => r.id !== report.id)];
  localStorage.setItem('krushigan_reports_history', JSON.stringify(updated));
  return report;
};

export const updateReportFollowUp = async (
  reportId: string, 
  status: 'improved' | 'no_change' | 'worsened',
  notes: string = ''
): Promise<void> => {
  const history = await getFarmerReports();
  const updated = history.map(r => {
    if (r.id === reportId) {
      return {
        ...r,
        followUpStatus: status,
        followUpNotes: notes,
        followUpDate: new Date().toISOString().split('T')[0]
      };
    }
    return r;
  });
  localStorage.setItem('krushigan_reports_history', JSON.stringify(updated));
};

// Officer and GIS APIs
export const getHotspotData = async (): Promise<MaharashtraDistrictHotspot[]> => {
  try {
    const res = await fetch(`${API_BASE}/officer/hotspots`);
    if (res.ok) return await res.json();
  } catch (e) {
    // Demo fallback
  }
  return MAHARASHTRA_DISTRICT_HOTSPOTS;
};

export const getBroadcastAlerts = async (): Promise<BroadcastAlert[]> => {
  const saved = localStorage.getItem('krushigan_broadcast_alerts');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }
  return DEMO_BROADCAST_ALERTS;
};

export const createBroadcastAlert = async (alert: BroadcastAlert): Promise<BroadcastAlert> => {
  const current = await getBroadcastAlerts();
  const updated = [alert, ...current];
  localStorage.setItem('krushigan_broadcast_alerts', JSON.stringify(updated));
  return alert;
};

export const getLearningMetrics = async (): Promise<LearningPipelineMetrics> => {
  return DEMO_LEARNING_METRICS;
};
