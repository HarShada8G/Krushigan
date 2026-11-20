import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Share2, 
  Camera, 
  HelpCircle,
  FileCheck2,
  Calendar,
  Send
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';
import { CropReport, DiagnosisResult } from '../../types';
import { INITIAL_DEMO_REPORTS } from '../../data/demoData';
import { saveCropReport } from '../../services/api';
import { FarmerHeader } from '../../components/layout/FarmerHeader';
import { FarmerBottomNav } from '../../components/layout/FarmerBottomNav';

export const FarmerResultPage: React.FC = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { speak, stop: stopSpeaking, isSpeaking } = useSpeechSynthesis(language);

  // Get report from state or fallback to demo report
  const report: CropReport = location.state?.report || INITIAL_DEMO_REPORTS[0];
  const diagnosis: DiagnosisResult | undefined = report.diagnosis;

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [expertRequested, setExpertRequested] = useState(false);

  const getSeverityBadge = (severity?: string) => {
    switch (severity) {
      case 'low':
        return (
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
            {t('severity_low')}
          </span>
        );
      case 'medium':
        return (
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">
            {t('severity_medium')}
          </span>
        );
      case 'high':
        return (
          <span className="bg-orange-100 text-orange-900 text-xs font-bold px-3 py-1 rounded-full border border-orange-300">
            {t('severity_high')}
          </span>
        );
      case 'severe':
      default:
        return (
          <span className="bg-red-100 text-red-900 text-xs font-bold px-3 py-1 rounded-full border border-red-300">
            {t('severity_severe')}
          </span>
        );
    }
  };

  const handleSaveReport = async () => {
    await saveCropReport(report);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleRequestExpert = () => {
    setExpertRequested(true);
  };

  const speakResult = () => {
    if (!diagnosis) return;
    const textToRead = language === 'mr'
      ? `तुमच्या ${report.crop} पिकावर ${diagnosis.marathiName} ची लक्षणे आढळली आहेत. प्रथम हे करा: ${diagnosis.recommendations.green.items.join('. ')}.`
      : language === 'en'
      ? `Diagnosis for ${report.crop}: ${diagnosis.detectedProblem}. First do this: ${diagnosis.recommendations.green.items.join('. ')}.`
      : `आपकी ${report.crop} फसल में ${diagnosis.hindiName} के लक्षण दिखाई दे रहे हैं। पहले यह करें: ${diagnosis.recommendations.green.items.join('. ')}।`;

    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(textToRead);
    }
  };

  if (!diagnosis) {
    return (
      <div className="min-h-screen bg-[#F8F7F0] flex flex-col items-center justify-center p-4">
        <p className="text-sm font-bold text-[#5F6F65] mb-4">कोई परिणाम नहीं मिला।</p>
        <button
          onClick={() => navigate('/farmer/scan')}
          className="bg-[#164B35] text-white px-4 py-2 rounded-xl text-xs font-bold"
        >
          दोबारा फोटो लें
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col pb-28">
      <FarmerHeader />

      <main className="max-w-xl mx-auto px-4 py-4 w-full space-y-4">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/farmer/dashboard')}
            className="flex items-center space-x-1 text-xs font-bold text-[#164B35] bg-white px-3 py-1.5 rounded-xl border border-[#DDE7DF]"
          >
            <ArrowLeft size={14} />
            <span>{t('back')}</span>
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={speakResult}
              className="flex items-center space-x-1.5 text-xs font-bold bg-[#EAF4E9] text-[#164B35] px-3 py-1.5 rounded-xl border border-[#287A50]/30 shadow-sm"
              title="परिणाम सुनें"
            >
              {isSpeaking ? <VolumeX size={15} className="text-red-600" /> : <Volume2 size={15} />}
              <span>{isSpeaking ? "आवाज़ रोकें" : "बोलकर सुनें"}</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Summary Card */}
        <div className="bg-white rounded-3xl p-5 shadow-card border border-[#DDE7DF] space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs text-[#5F6F65] font-semibold">
                🌱 {t('your_crop')}: <strong className="text-[#164B35]">{report.crop}</strong>
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#164B35] leading-tight mt-1">
                {language === 'mr' ? diagnosis.marathiName : language === 'en' ? diagnosis.detectedProblem : diagnosis.hindiName}
              </h2>
              <span className="text-xs text-[#5F6F65] font-mono block mt-0.5">
                Scientific: {diagnosis.detectedProblem}
              </span>
            </div>
            {getSeverityBadge(diagnosis.severity)}
          </div>

          {/* Photo & Confidence Indicator */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-black/5 border border-[#DDE7DF]">
            <img
              src={report.imageUrl}
              alt="Diagnosed plant part"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md rounded-xl p-2 text-white flex items-center justify-between text-[11px]">
              <span>एआई पहचान स्कोर:</span>
              <span className="font-bold text-emerald-300">
                {(diagnosis.confidenceScore * 100).toFixed(0)}% पैटर्न मैचिंग
              </span>
            </div>
          </div>

          {/* Environmental Correlation Callout */}
          {diagnosis.environmentalRiskCorrelation && (
            <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start space-x-2">
              <span className="text-amber-600 shrink-0 mt-0.5">☁️</span>
              <div>
                <strong>मौसम सहसंबंध: </strong>
                <span>{diagnosis.environmentalRiskCorrelation}</span>
              </div>
            </div>
          )}
        </div>

        {/* SECTION: 3-TIER ACTION PLAN */}
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-black text-[#164B35] flex items-center space-x-2">
            <span>{t('what_to_do_now')}</span>
          </h3>

          {/* TIER 1: GREEN (Immediate cultural & sanitation) */}
          <div className="bg-white rounded-3xl p-5 shadow-card border-2 border-emerald-500/40 space-y-3">
            <div className="flex items-center space-x-2 border-b border-emerald-100 pb-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <h4 className="font-extrabold text-sm text-emerald-950">
                {diagnosis.recommendations.green.title || t('green_tier_title')}
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-[#202D25] leading-relaxed">
              {diagnosis.recommendations.green.items.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* TIER 2: YELLOW (Verified Biological Options) */}
          <div className="bg-white rounded-3xl p-5 shadow-card border-2 border-amber-500/40 space-y-3">
            <div className="flex items-center space-x-2 border-b border-amber-100 pb-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <h4 className="font-extrabold text-sm text-amber-950">
                {diagnosis.recommendations.yellow.title || t('yellow_tier_title')}
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-[#202D25] leading-relaxed">
              {diagnosis.recommendations.yellow.items.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {diagnosis.recommendations.yellow.bioAgent && (
              <div className="text-[11px] bg-amber-50 text-amber-900 p-2 rounded-xl font-medium">
                अनुशंसित बायो-एजेंट: <strong>{diagnosis.recommendations.yellow.bioAgent}</strong>
              </div>
            )}
          </div>

          {/* TIER 3: RED (Certified Chemical Management with strict precautions) */}
          <div className="bg-white rounded-3xl p-5 shadow-card border-2 border-red-500/40 space-y-3">
            <div className="flex items-center space-x-2 border-b border-red-100 pb-2">
              <span className="w-3 h-3 rounded-full bg-red-600"></span>
              <h4 className="font-extrabold text-sm text-red-950">
                {diagnosis.recommendations.red.title || t('red_tier_title')}
              </h4>
            </div>

            {diagnosis.recommendations.red.isCertified ? (
              <div className="space-y-3 text-xs">
                {diagnosis.recommendations.red.activeIngredient && (
                  <div className="bg-red-50/60 p-2.5 rounded-xl border border-red-200">
                    <span className="font-bold text-red-900 block text-[11px]">
                      {t('active_ingredient')}
                    </span>
                    <span className="font-mono font-bold text-[#202D25]">
                      {diagnosis.recommendations.red.activeIngredient}
                    </span>
                  </div>
                )}

                {diagnosis.recommendations.red.applicationInstructions && (
                  <p className="text-[#202D25] leading-relaxed">
                    <strong>छिड़काव मात्रा: </strong>
                    {diagnosis.recommendations.red.applicationInstructions}
                  </p>
                )}

                {diagnosis.recommendations.red.preHarvestInterval && (
                  <div className="flex items-center space-x-2 text-[11px] bg-amber-50 text-amber-900 p-2 rounded-xl font-semibold">
                    <Calendar size={14} className="text-amber-700" />
                    <span>{t('pre_harvest_interval')}: {diagnosis.recommendations.red.preHarvestInterval}</span>
                  </div>
                )}

                {diagnosis.recommendations.red.safetyPrecautions && diagnosis.recommendations.red.safetyPrecautions.length > 0 && (
                  <div className="space-y-1">
                    <span className="font-bold text-red-900 text-[11px]">{t('safety_precautions')}:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-[#5F6F65]">
                      {diagnosis.recommendations.red.safetyPrecautions.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {diagnosis.recommendations.red.authoritySource && (
                  <div className="text-[10px] text-[#5F6F65] pt-1">
                    <strong>{t('certified_chemical_source')} </strong>
                    {diagnosis.recommendations.red.authoritySource}
                  </div>
                )}

                <p className="text-[10px] text-red-800 bg-red-50 p-2 rounded-xl leading-tight border border-red-200">
                  {diagnosis.recommendations.red.disclaimer || t('chemical_disclaimer')}
                </p>
              </div>
            ) : (
              <div className="text-xs text-amber-900 bg-amber-50 p-3 rounded-2xl border border-amber-200">
                {t('unverified_chemical_warning')}
              </div>
            )}
          </div>
        </div>

        {/* ACTIONS FOOTER: Save, Request Expert, Retake */}
        <div className="space-y-2 pt-2">
          {savedSuccess && (
            <div className="bg-[#329568] text-white p-3 rounded-2xl text-xs font-bold text-center animate-fadeIn">
              ✓ {t('report_saved_success')}
            </div>
          )}

          {expertRequested && (
            <div className="bg-[#164B35] text-emerald-200 p-3 rounded-2xl text-xs font-bold text-center animate-fadeIn">
              ✓ {t('expert_request_sent')}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleSaveReport}
              className="bg-white hover:bg-emerald-50 text-[#164B35] border border-[#287A50] font-bold py-3 px-3 rounded-2xl text-xs shadow-sm transition-colors flex items-center justify-center space-x-1.5"
            >
              <FileCheck2 size={16} />
              <span>{t('save_report_btn')}</span>
            </button>

            <button
              type="button"
              onClick={handleRequestExpert}
              disabled={expertRequested}
              className="bg-[#287A50] hover:bg-emerald-700 disabled:opacity-60 text-white font-bold py-3 px-3 rounded-2xl text-xs shadow-sm transition-colors flex items-center justify-center space-x-1.5"
            >
              <Send size={15} />
              <span>{t('request_expert_btn')}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate('/farmer/scan')}
            className="w-full bg-[#164B35] hover:bg-[#287A50] text-white font-bold py-3 rounded-2xl text-xs shadow-touch transition-all flex items-center justify-center space-x-1.5"
          >
            <Camera size={16} />
            <span>{t('retake_btn')}</span>
          </button>
        </div>
      </main>

      <FarmerBottomNav />
    </div>
  );
};
