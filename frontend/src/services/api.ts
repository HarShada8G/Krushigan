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

const API_BASE = (import.meta.env.VITE_API_URL as string || '/api').replace(/\/$/, '');

// Token helper
export const getAuthToken = (): string | null => {
  return localStorage.getItem('krushigan_token');
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Authentication API calls
export const loginApi = async (username: string, password: string, role: string = 'farmer') => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, role }),
    signal: AbortSignal.timeout(8000)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Login failed with HTTP ${res.status}`);
  }
  return await res.json();
};

export const demoLoginApi = async (role: string = 'farmer') => {
  // First attempt dedicated /auth/demo-login endpoint
  try {
    const res = await fetch(`${API_BASE}/auth/demo-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
      signal: AbortSignal.timeout(8000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // If demo-login fails, fall back to /auth/login
  }

  const demoUsers: Record<string, { username: string; pass: string }> = {
    farmer: { username: 'farmer_ramesh', pass: 'demo123' },
    officer: { username: 'officer_sunita', pass: 'demo123' },
    expert: { username: 'expert_vinayak', pass: 'demo123' },
    admin: { username: 'admin_maha_01', pass: 'demo123' }
  };
  const target = demoUsers[role] || demoUsers.farmer;
  return await loginApi(target.username, target.pass, role);
};

export const registerApi = async (userData: {
  username: string;
  password: string;
  phone?: string;
  email?: string;
  role?: string;
  district?: string;
  designation?: string;
}) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: userData.username,
      password: userData.password,
      phone: userData.phone,
      email: userData.email,
      role: userData.role || 'farmer',
      district: userData.district || 'Akola',
      designation: userData.designation || 'Registered Farmer'
    }),
    signal: AbortSignal.timeout(8000)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Registration failed with HTTP ${res.status}`);
  }
  return await res.json();
};

export const fetchCurrentUser = async () => {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(),
      signal: AbortSignal.timeout(6000)
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
};

// AI Assistant Chat API
export const chatWithAiAssistant = async (
  message: string,
  language: string = 'hi',
  context?: { crop?: string; district?: string; growth_stage?: string }
): Promise<{
  answer: string;
  language: string;
  isRealAI: boolean;
  isOfflineDemo: boolean;
  modelUsed: string;
  disclaimer?: string;
}> => {
  try {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        language,
        crop: context?.crop,
        district: context?.district,
        growth_stage: context?.growth_stage
      }),
      signal: AbortSignal.timeout(8000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // Falls through to client offline fallback
  }

  // Graceful client fallback
  return {
    answer:
      language === 'mr'
        ? "तुमच्या प्रश्नाची नोंद घेतली आहे. अचूक निदानासाठी 'फोटो घ्या' पर्यायाद्वारे पानाचा फोटो तपासा किंवा स्थानिक KVK तज्ज्ञांचा सल्ला घ्या."
        : language === 'en'
        ? "Query noted. For exact plant diagnosis, please capture a clear leaf photo via the Scan screen or consult local KVK agronomists."
        : "आपके सवाल को दर्ज कर लिया गया है। सटीक पहचान के लिए 'फसल की फोटो लें' पर क्लिक करके पत्ते की फोटो जांचें या नजदीकी KVK विशेषज्ञ से संपर्क करें।",
    language,
    isRealAI: false,
    isOfflineDemo: true,
    modelUsed: 'Offline Knowledge Engine',
    disclaimer: 'ऑफलाइन मोड: इंटरनेट या एआई सेवा उपलब्ध न होने के कारण स्थानीय सहायता प्रणाली सक्रिय है।'
  };
};

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
export const getWeatherData = async (
  district: string = 'Akola',
  lat?: number,
  lon?: number
): Promise<WeatherData> => {
  try {
    let url = `${API_BASE}/weather/current?district=${encodeURIComponent(district)}`;
    if (lat !== undefined && lon !== undefined) {
      url += `&lat=${lat}&lon=${lon}`;
    }
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback
  }
  return {
    ...DEMO_WEATHER,
    district: district || 'Current Location',
    isDemoData: true
  };
};

// Simulated AI Inference Engine for Demo Mode
export const analyzeCropPhoto = async (
  imageDataUrl: string, 
  cropName: string = 'Tomato',
  growthStage: string = 'Flowering',
  language: string = 'hi'
): Promise<DiagnosisResult> => {
  // If backend is active, send to backend
  try {
    const res = await fetch(`${API_BASE}/reports/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_data: imageDataUrl, crop: cropName, growth_stage: growthStage }),
      signal: AbortSignal.timeout(9000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // Fallback to client deterministic demo diagnosis
  }

  // Deterministic crop-based diagnosis mapping
  const matchedDisease = CROP_DISEASES.find(d => d.crop.toLowerCase() === cropName.toLowerCase()) || CROP_DISEASES[0];

  const getSymptoms = () => {
    if (language === 'mr' && matchedDisease.symptoms.mr) return matchedDisease.symptoms.mr;
    if (language === 'en' && matchedDisease.symptoms.en) return matchedDisease.symptoms.en;
    return matchedDisease.symptoms.hi;
  };

  const getGreenTitle = () => {
    if (language === 'mr' && matchedDisease.recommendations.green.titleMr) return matchedDisease.recommendations.green.titleMr;
    if (language === 'en' && matchedDisease.recommendations.green.titleEn) return matchedDisease.recommendations.green.titleEn;
    return matchedDisease.recommendations.green.titleHi;
  };

  const getGreenSteps = () => {
    if (language === 'mr' && matchedDisease.recommendations.green.stepsMr) return matchedDisease.recommendations.green.stepsMr;
    if (language === 'en' && matchedDisease.recommendations.green.stepsEn) return matchedDisease.recommendations.green.stepsEn;
    return matchedDisease.recommendations.green.stepsHi;
  };

  const getYellowTitle = () => {
    if (language === 'mr' && matchedDisease.recommendations.yellow.titleMr) return matchedDisease.recommendations.yellow.titleMr;
    if (language === 'en' && matchedDisease.recommendations.yellow.titleEn) return matchedDisease.recommendations.yellow.titleEn;
    return matchedDisease.recommendations.yellow.titleHi;
  };

  const getYellowSteps = () => {
    if (language === 'mr' && matchedDisease.recommendations.yellow.stepsMr) return matchedDisease.recommendations.yellow.stepsMr;
    if (language === 'en' && matchedDisease.recommendations.yellow.stepsEn) return matchedDisease.recommendations.yellow.stepsEn;
    return matchedDisease.recommendations.yellow.stepsHi;
  };

  const getRedTitle = () => {
    if (language === 'mr' && matchedDisease.recommendations.red.titleMr) return matchedDisease.recommendations.red.titleMr;
    if (language === 'en' && matchedDisease.recommendations.red.titleEn) return matchedDisease.recommendations.red.titleEn;
    return matchedDisease.recommendations.red.titleHi;
  };

  const getRedInstructions = () => {
    if (language === 'mr' && matchedDisease.recommendations.red.applicationInstructionsMr) return matchedDisease.recommendations.red.applicationInstructionsMr;
    if (language === 'en' && matchedDisease.recommendations.red.applicationInstructionsEn) return matchedDisease.recommendations.red.applicationInstructionsEn;
    return matchedDisease.recommendations.red.applicationInstructionsHi;
  };

  const getRedPrecautions = () => {
    if (language === 'mr' && matchedDisease.recommendations.red.safetyPrecautionsMr) return matchedDisease.recommendations.red.safetyPrecautionsMr;
    if (language === 'en' && matchedDisease.recommendations.red.safetyPrecautionsEn) return matchedDisease.recommendations.red.safetyPrecautionsEn;
    return matchedDisease.recommendations.red.safetyPrecautionsHi;
  };

  const getRedDisclaimer = () => {
    if (language === 'mr' && matchedDisease.recommendations.red.disclaimerMr) return matchedDisease.recommendations.red.disclaimerMr;
    if (language === 'en' && matchedDisease.recommendations.red.disclaimerEn) return matchedDisease.recommendations.red.disclaimerEn;
    return matchedDisease.recommendations.red.disclaimerHi;
  };

  const getEnvTrigger = () => {
    if (language === 'mr' && matchedDisease.environmentalTrigger.descriptionMr) return matchedDisease.environmentalTrigger.descriptionMr;
    if (language === 'en' && matchedDisease.environmentalTrigger.descriptionEn) return matchedDisease.environmentalTrigger.descriptionEn;
    return matchedDisease.environmentalTrigger.descriptionHi;
  };

  return {
    id: `diag_${Date.now()}`,
    reportId: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
    crop: matchedDisease.crop,
    detectedProblem: matchedDisease.name,
    hindiName: matchedDisease.nameHi,
    marathiName: matchedDisease.nameMr,
    confidenceScore: 0.93,
    severity: matchedDisease.typicalSeverity,
    symptoms: getSymptoms(),
    recommendations: {
      green: {
        title: getGreenTitle(),
        items: getGreenSteps()
      },
      yellow: {
        title: getYellowTitle(),
        items: getYellowSteps(),
        bioAgent: matchedDisease.recommendations.yellow.bioAgent
      },
      red: {
        title: getRedTitle(),
        isCertified: matchedDisease.recommendations.red.isCertified,
        activeIngredient: matchedDisease.recommendations.red.activeIngredient,
        targetProblem: matchedDisease.recommendations.red.targetProblem,
        authoritySource: matchedDisease.recommendations.red.authoritySource,
        applicationInstructions: getRedInstructions(),
        safetyPrecautions: getRedPrecautions(),
        preHarvestInterval: matchedDisease.recommendations.red.preHarvestIntervalDays 
          ? `${matchedDisease.recommendations.red.preHarvestIntervalDays} ${language === 'mr' ? 'दिवस' : language === 'en' ? 'Days' : 'दिन'}`
          : undefined,
        disclaimer: getRedDisclaimer()
      }
    },
    environmentalRiskCorrelation: getEnvTrigger(),
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
  } else {
    // Ensure canonical demo reports reflect updated accurate crop disease images
    let modified = false;
    localReports = localReports.map(rep => {
      const canonical = INITIAL_DEMO_REPORTS.find(d => d.id === rep.id);
      if (canonical && rep.imageUrl !== canonical.imageUrl) {
        modified = true;
        return { ...rep, imageUrl: canonical.imageUrl };
      }
      return rep;
    });
    if (modified) {
      localStorage.setItem('krushigan_reports_history', JSON.stringify(localReports));
    }
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
