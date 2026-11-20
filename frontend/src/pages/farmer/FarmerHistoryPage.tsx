import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  History, 
  ArrowLeft, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Camera,
  MessageSquare,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CropReport } from '../../types';
import { getFarmerReports, updateReportFollowUp } from '../../services/api';
import { FarmerHeader } from '../../components/layout/FarmerHeader';
import { FarmerBottomNav } from '../../components/layout/FarmerBottomNav';

export const FarmerHistoryPage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [reports, setReports] = useState<CropReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFollowUpId, setActiveFollowUpId] = useState<string | null>(null);
  const [followUpSavedMsg, setFollowUpSavedMsg] = useState<string | null>(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    const data = await getFarmerReports();
    setReports(data);
    setLoading(false);
  };

  const handleFollowUpSelect = async (reportId: string, status: 'improved' | 'no_change' | 'worsened') => {
    await updateReportFollowUp(reportId, status);
    setReports(prev =>
      prev.map(r => (r.id === reportId ? { ...r, followUpStatus: status } : r))
    );
    setActiveFollowUpId(null);
    setFollowUpSavedMsg("आपकी प्रतिक्रिया दर्ज कर ली गई है! (Feedback recorded)");
    setTimeout(() => setFollowUpSavedMsg(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col pb-24">
      <FarmerHeader />

      <main className="max-w-xl mx-auto px-4 py-4 w-full space-y-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/farmer/dashboard')}
            className="flex items-center space-x-1 text-xs font-bold text-[#164B35] bg-white px-3 py-1.5 rounded-xl border border-[#DDE7DF]"
          >
            <ArrowLeft size={14} />
            <span>{t('back')}</span>
          </button>
          <span className="text-xs font-bold text-[#5F6F65]">
            {t('history_title')}
          </span>
        </div>

        {followUpSavedMsg && (
          <div className="bg-[#329568] text-white p-3 rounded-2xl text-xs font-bold text-center animate-fadeIn">
            ✓ {followUpSavedMsg}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-xs font-bold text-[#5F6F65]">
            {t('loading')}
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center space-y-3 border border-[#DDE7DF]">
            <History size={36} className="text-[#5F6F65] mx-auto opacity-40" />
            <p className="text-sm font-bold text-[#202D25]">{t('no_history')}</p>
            <Link
              to="/farmer/scan"
              className="inline-block bg-[#164B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold"
            >
              {t('take_photo_btn')}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map(report => (
              <div
                key={report.id}
                className="bg-white rounded-3xl p-5 shadow-card border border-[#DDE7DF] space-y-3"
              >
                {/* Header: Date & Status */}
                <div className="flex items-center justify-between border-b border-[#DDE7DF] pb-2.5">
                  <span className="text-xs text-[#5F6F65] font-medium flex items-center space-x-1">
                    <Calendar size={13} />
                    <span>{report.timestamp}</span>
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      report.status === 'expert_confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : report.status === 'ai_analyzed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {report.status === 'expert_confirmed'
                      ? '✓ KVK विशेषज्ञ द्वारा सत्यापित'
                      : report.status === 'ai_analyzed'
                      ? 'एआई द्वारा विश्लेषित'
                      : 'समीक्षाधीन (Pending)'}
                  </span>
                </div>

                {/* Content: Photo + Diagnosis Details */}
                <div className="flex space-x-3 items-center">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-black/5 shrink-0 border border-[#DDE7DF]">
                    <img
                      src={report.imageUrl}
                      alt={report.crop}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-[#287A50] block">
                      🌱 {report.crop} ({report.growthStage || 'Flowering'})
                    </span>
                    <h3 className="font-extrabold text-base text-[#164B35] truncate mt-0.5">
                      {report.diagnosis?.hindiName || report.diagnosis?.detectedProblem || 'निदान उपलब्ध'}
                    </h3>
                    <p className="text-xs text-[#5F6F65] line-clamp-1 mt-0.5">
                      {report.diagnosis?.recommendations?.green?.items?.[0] || 'सांस्कृतिक उपचार अनुशंसित'}
                    </p>
                  </div>
                </div>

                {/* KVK Expert Note if verified */}
                {report.expertValidation && (
                  <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                    <span className="font-bold block text-[11px] text-emerald-800">
                      👨‍🔬 {report.expertValidation.expertName}:
                    </span>
                    <p className="italic text-[11px]">"{report.expertValidation.notes}"</p>
                  </div>
                )}

                {/* SECTION 14: Follow-up Interaction */}
                <div className="pt-2 border-t border-[#DDE7DF]">
                  <p className="text-xs font-bold text-[#202D25] mb-2 flex items-center space-x-1">
                    <MessageSquare size={13} className="text-[#287A50]" />
                    <span>{t('follow_up_question')}</span>
                  </p>

                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleFollowUpSelect(report.id, 'improved')}
                      className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all ${
                        report.followUpStatus === 'improved'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-[#F8F7F0] text-[#202D25] border-[#DDE7DF] hover:bg-emerald-50'
                      }`}
                    >
                      {t('status_improved')}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFollowUpSelect(report.id, 'no_change')}
                      className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all ${
                        report.followUpStatus === 'no_change'
                          ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                          : 'bg-[#F8F7F0] text-[#202D25] border-[#DDE7DF] hover:bg-amber-50'
                      }`}
                    >
                      {t('status_no_change')}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFollowUpSelect(report.id, 'worsened')}
                      className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all ${
                        report.followUpStatus === 'worsened'
                          ? 'bg-red-600 text-white border-red-600 shadow-sm'
                          : 'bg-[#F8F7F0] text-[#202D25] border-[#DDE7DF] hover:bg-red-50'
                      }`}
                    >
                      {t('status_worsened')}
                    </button>
                  </div>

                  {report.followUpStatus === 'worsened' && (
                    <div className="mt-2.5 p-2.5 bg-red-50 rounded-xl border border-red-200 text-xs text-red-900 flex items-center justify-between">
                      <span>समस्या बढ़ गई है? KVK विशेषज्ञ को तुरंत सूचित करें।</span>
                      <button
                        onClick={() => alert("KVK विशेषज्ञ को आपातकालीन सूचना भेज दी गई है।")}
                        className="bg-red-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold"
                      >
                        विशेषज्ञ सहायता
                      </button>
                    </div>
                  )}
                </div>

                {/* View Full Result link */}
                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => navigate('/farmer/result', { state: { report } })}
                    className="text-xs text-[#287A50] font-bold flex items-center space-x-1 hover:underline"
                  >
                    <span>{t('view_details')}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <FarmerBottomNav />
    </div>
  );
};
