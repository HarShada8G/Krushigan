import React, { useState, useEffect } from 'react';
import { 
  CheckCheck, 
  XCircle, 
  Image as ImageIcon, 
  FlaskConical, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  ArrowRight,
  Database
} from 'lucide-react';
import { OfficerHeader } from '../../components/layout/OfficerHeader';
import { OfficerSidebar } from '../../components/layout/OfficerSidebar';
import { DemoBanner } from '../../components/common/DemoBanner';
import { getFarmerReports, saveCropReport } from '../../services/api';
import { CropReport } from '../../types';
import { DEMO_LEARNING_METRICS } from '../../data/demoData';

const FALLBACK_CROP_IMAGE = '/images/crops/crop_fallback.svg';

export const OfficerValidationPage: React.FC = () => {
  const [reports, setReports] = useState<CropReport[]>([]);
  const [activeReport, setActiveReport] = useState<CropReport | null>(null);
  const [expertNote, setExpertNote] = useState('');
  const [correctedDiagnosisInput, setCorrectedDiagnosisInput] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const all = await getFarmerReports();
    setReports(all);
    if (all.length > 0) {
      setActiveReport(all[0]);
    }
  };

  const handleAction = async (actionType: 'confirm' | 'correct' | 'request_image' | 'lab_referral' | 'unknown') => {
    if (!activeReport) return;

    let updatedDiagnosis = activeReport.diagnosis?.detectedProblem || 'Unknown';
    let statusText = 'expert_confirmed' as const;

    if (actionType === 'correct') {
      updatedDiagnosis = correctedDiagnosisInput.trim() || 'Corrected Plant Pathology Diagnosis';
      statusText = 'expert_corrected' as any;
    } else if (actionType === 'lab_referral') {
      statusText = 'lab_referred' as any;
    }

    const updatedReport: CropReport = {
      ...activeReport,
      status: statusText,
      expertValidation: {
        expertId: 'EXP-KVK-AKL-09',
        expertName: 'Dr. Vinayak Shinde (Senior Plant Pathologist)',
        verifiedDiagnosis: updatedDiagnosis,
        notes: expertNote || (actionType === 'confirm' ? 'Verified visual lesion symptoms match field presentation.' : 'Case re-classified.'),
        validatedAt: new Date().toLocaleString(),
        status: actionType === 'confirm' ? 'confirmed' : actionType === 'correct' ? 'corrected' : actionType as any
      }
    };

    await saveCropReport(updatedReport);
    setReports(prev => prev.map(r => (r.id === activeReport.id ? updatedReport : r)));
    setActiveReport(updatedReport);
    setExpertNote('');
    setCorrectedDiagnosisInput('');

    setActionSuccessMsg(`सत्यापन कार्रवाई पूर्ण: [${actionType.toUpperCase()}] — केस लर्निंग डेटासेट पाइपलाइन में दर्ज।`);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col">
      <DemoBanner />
      <OfficerHeader />

      <div className="flex-1 flex flex-col md:flex-row">
        <div className="hidden md:block">
          <OfficerSidebar />
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-[#164B35]">
                KVK विशेषज्ञ सत्यापन कतार (Expert Validation Queue)
              </h1>
              <p className="text-xs text-[#5F6F65] mt-0.5">
                एआई निदान की जांच, सुधार व लर्निंग डेटासेट में प्रमाणीकरण
              </p>
            </div>

            {/* Model Pipeline status pill */}
            <div className="flex items-center space-x-2 bg-[#EAF4E9] border border-[#287A50]/30 px-3.5 py-1.5 rounded-2xl text-xs">
              <Database size={15} className="text-[#287A50]" />
              <span className="text-[#164B35] font-bold">
                प्रमाणित डेटासेट: {DEMO_LEARNING_METRICS.datasetReadyCount} नमूने तैयार
              </span>
            </div>
          </div>

          {actionSuccessMsg && (
            <div className="bg-[#329568] text-white p-3 rounded-2xl text-xs font-bold text-center animate-fadeIn shadow-sm">
              ✓ {actionSuccessMsg}
            </div>
          )}

          {/* Validation Workstation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Queue List (Left column) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-4 shadow-card border border-[#DDE7DF] space-y-3">
              <h3 className="font-extrabold text-sm text-[#164B35] px-1 flex items-center justify-between">
                <span>लंबित समीक्षा कतार ({reports.length})</span>
                <span className="text-[11px] text-[#5F6F65] font-normal">क्लिक करके जांचें</span>
              </h3>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {reports.map(rep => {
                  const isSelected = activeReport?.id === rep.id;
                  return (
                    <button
                      key={rep.id}
                      type="button"
                      onClick={() => setActiveReport(rep)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center space-x-3 ${
                        isSelected
                          ? 'border-[#287A50] bg-[#EAF4E9]/50 shadow-sm ring-1 ring-[#287A50]'
                          : 'border-[#DDE7DF] hover:bg-[#F8F7F0]'
                      }`}
                    >
                      <img
                        src={rep.imageUrl}
                        alt="Thumbnail"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== FALLBACK_CROP_IMAGE) {
                            target.src = FALLBACK_CROP_IMAGE;
                          }
                        }}
                        className="w-14 h-14 object-cover rounded-xl shrink-0"
                      />
                      <div className="flex-1 min-w-0 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#164B35]">{rep.id}</span>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              rep.status === 'expert_confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {rep.status === 'expert_confirmed' ? 'सत्यापित' : 'लंबित'}
                          </span>
                        </div>
                        <p className="font-extrabold text-[#202D25] truncate mt-0.5">
                          🌱 {rep.crop} — {rep.diagnosis?.hindiName || rep.diagnosis?.detectedProblem}
                        </p>
                        <p className="text-[11px] text-[#5F6F65] truncate">
                          {rep.village}, {rep.district} • {rep.farmerName}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inspector & Action Deck (Right column) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-card border border-[#DDE7DF] flex flex-col justify-between space-y-5">
              {activeReport ? (
                <div className="space-y-4">
                  {/* Case Header */}
                  <div className="flex items-start justify-between border-b border-[#DDE7DF] pb-3">
                    <div>
                      <span className="text-[11px] text-[#5F6F65] font-bold block">
                        केस विवरण (Case Inspection)
                      </span>
                      <h2 className="text-xl font-black text-[#164B35]">
                        {activeReport.id}
                      </h2>
                      <span className="text-xs text-[#5F6F65]">
                        किसान: <strong>{activeReport.farmerName}</strong> • {activeReport.village}, {activeReport.taluka} ({activeReport.district})
                      </span>
                    </div>

                    <span className="text-xs bg-[#F8F7F0] text-[#164B35] font-bold px-3 py-1 rounded-xl border border-[#DDE7DF]">
                      अवस्था: {activeReport.growthStage}
                    </span>
                  </div>

                  {/* High-res Image Preview */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-black/5 border border-[#DDE7DF]">
                    <img
                      src={activeReport.imageUrl}
                      alt="Crop disease lesion"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== FALLBACK_CROP_IMAGE) {
                          target.src = FALLBACK_CROP_IMAGE;
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl text-white text-[11px] font-mono">
                      एआई स्कोर: {(Number(activeReport.diagnosis?.confidenceScore || 0.9) * 100).toFixed(0)}%
                    </div>
                  </div>

                  {/* AI Prediction Diagnostic Summary */}
                  <div className="bg-[#F8F7F0] p-4 rounded-2xl border border-[#DDE7DF] space-y-1.5 text-xs">
                    <span className="font-bold text-[#5F6F65] block uppercase text-[10px]">
                      एआई द्वारा सुझाया गया संभावित रोग (Predicted Diagnosis):
                    </span>
                    <p className="text-base font-black text-[#164B35]">
                      {activeReport.diagnosis?.hindiName} ({activeReport.diagnosis?.detectedProblem})
                    </p>
                    <p className="text-[#5F6F65]">
                      गंभीरता: <strong className="text-amber-800">{activeReport.diagnosis?.severity}</strong> •
                      वातावरणीय ट्रिगर: {activeReport.diagnosis?.environmentalRiskCorrelation || 'उच्च नमी'}
                    </p>
                  </div>

                  {/* Correct Diagnosis input (if modifying) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#202D25]">
                      निदान संशोधन (Corrected Diagnosis - If AI was incorrect):
                    </label>
                    <input
                      type="text"
                      placeholder="यदि एआई गलत है, तो सही रोग का नाम यहाँ दर्ज करें..."
                      value={correctedDiagnosisInput}
                      onChange={e => setCorrectedDiagnosisInput(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DDE7DF] focus:outline-none focus:ring-2 focus:ring-[#287A50]"
                    />
                  </div>

                  {/* Agronomist Notes input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#202D25]">
                      विशेषज्ञ टिप्पणी एवं उपचार निर्देश (Expert Clinical Notes):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="लक्षणों की पुष्टि, फफूंद अथवा कीट के जैविक नियंत्रण के निर्देश लिखें..."
                      value={expertNote}
                      onChange={e => setExpertNote(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DDE7DF] focus:outline-none focus:ring-2 focus:ring-[#287A50]"
                    />
                  </div>

                  {/* SECTION 17: The 5 Dedicated Action Buttons */}
                  <div className="pt-2 border-t border-[#DDE7DF]">
                    <span className="text-[11px] font-bold text-[#5F6F65] block mb-2 uppercase">
                      विशेषज्ञ प्रमाणीकरण कार्रवाई (Validation Actions):
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {/* 1. Confirm Diagnosis */}
                      <button
                        type="button"
                        onClick={() => handleAction('confirm')}
                        className="bg-[#164B35] hover:bg-[#287A50] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all"
                      >
                        <CheckCheck size={14} className="text-emerald-300" />
                        <span>निदान की पुष्टि करें</span>
                      </button>

                      {/* 2. Correct Diagnosis */}
                      <button
                        type="button"
                        onClick={() => handleAction('correct')}
                        className="bg-[#287A50] hover:bg-emerald-700 text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all"
                      >
                        <Sparkles size={14} className="text-amber-300" />
                        <span>निदान संशोधित करें</span>
                      </button>

                      {/* 3. Request New Image */}
                      <button
                        type="button"
                        onClick={() => handleAction('request_image')}
                        className="bg-white hover:bg-gray-50 text-[#202D25] border border-[#DDE7DF] py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <ImageIcon size={14} className="text-blue-600" />
                        <span>नई फोटो मांगें</span>
                      </button>

                      {/* 4. Refer to Laboratory */}
                      <button
                        type="button"
                        onClick={() => handleAction('lab_referral')}
                        className="bg-white hover:bg-gray-50 text-[#202D25] border border-[#DDE7DF] py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <FlaskConical size={14} className="text-purple-600" />
                        <span>प्रयोगशाला जांच</span>
                      </button>

                      {/* 5. Mark as Unknown */}
                      <button
                        type="button"
                        onClick={() => handleAction('unknown')}
                        className="bg-white hover:bg-gray-50 text-[#D9534F] border border-red-200 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <HelpCircle size={14} />
                        <span>अज्ञात चिह्नित करें</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 text-[#5F6F65] text-xs">
                  समीक्षा के लिए बाईं ओर की कतार से कोई रिपोर्ट चुनें।
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
