import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  BarChart3, 
  Cpu, 
  RefreshCw, 
  Database, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  TrendingUp,
  FileCheck2,
  Calendar
} from 'lucide-react';
import { OfficerHeader } from '../../components/layout/OfficerHeader';
import { OfficerSidebar } from '../../components/layout/OfficerSidebar';
import { DemoBanner } from '../../components/common/DemoBanner';
import { DEMO_LEARNING_METRICS } from '../../data/demoData';
import { useLanguage } from '../../context/LanguageContext';

const MONTHLY_EPIDEMIC_DATA = [
  { month: 'Jun', EarlyBlight: 120, Rust: 40, Aphids: 80 },
  { month: 'Jul', EarlyBlight: 210, Rust: 110, Aphids: 150 },
  { month: 'Aug', EarlyBlight: 340, Rust: 260, Aphids: 190 },
  { month: 'Sep', EarlyBlight: 480, Rust: 310, Aphids: 240 },
  { month: 'Oct', EarlyBlight: 390, Rust: 180, Aphids: 280 },
  { month: 'Nov', EarlyBlight: 450, Rust: 140, Aphids: 320 }
];

const DISTRICT_SEVERITY_BARS = [
  { district: 'Nashik', Severe: 89, High: 29, Medium: 15 },
  { district: 'Akola', Severe: 52, High: 32, Medium: 20 },
  { district: 'Sambhajinagar', Severe: 49, High: 27, Medium: 18 },
  { district: 'Amravati', Severe: 38, High: 24, Medium: 25 },
  { district: 'Jalgaon', Severe: 34, High: 24, Medium: 12 }
];

export const OfficerAnalyticsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'analytics' | 'learning_loop'>('analytics');
  const [isRetraining, setIsRetraining] = useState(false);
  const [retrainSuccessMsg, setRetrainSuccessMsg] = useState<string | null>(null);

  const metrics = DEMO_LEARNING_METRICS;

  const handleSimulateModelEval = () => {
    setIsRetraining(true);
    setTimeout(() => {
      setIsRetraining(false);
      setRetrainSuccessMsg(
        "मॉडल मूल्यांकन संपन्न: 1,325 विशेषज्ञ-सत्यापित नमूनों पर बेंचमार्क सटीकता 91.8% से बढ़कर 93.4% दर्ज हुई! (Simulated Candidate Release v1.5)"
      );
      setTimeout(() => setRetrainSuccessMsg(null), 6000);
    }, 2000);
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
          {/* Header & Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-[#164B35]">
                एपिडेमियोलॉजी एवं एआई लर्निंग विश्लेषिकी
              </h1>
              <p className="text-xs text-[#5F6F65] mt-0.5">
                महाराष्ट्र फसल स्वास्थ्य डेटा सांख्यिकी एवं सतत मॉडल सुधार लूप
              </p>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center space-x-2 bg-white p-1 rounded-2xl border border-[#DDE7DF]">
              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-[#164B35] text-white shadow-sm'
                    : 'text-[#5F6F65] hover:text-[#164B35]'
                }`}
              >
                📊 {t('tab_analytics')}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('learning_loop')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'learning_loop'
                    ? 'bg-[#164B35] text-white shadow-sm'
                    : 'text-[#5F6F65] hover:text-[#164B35]'
                }`}
              >
                🧠 {t('tab_learning_loop')}
              </button>
            </div>
          </div>

          {retrainSuccessMsg && (
            <div className="bg-[#329568] text-white p-4 rounded-3xl text-xs font-bold text-center animate-fadeIn shadow-sm">
              ✓ {retrainSuccessMsg}
            </div>
          )}

          {activeTab === 'analytics' ? (
            <div className="space-y-6">
              {/* Monthly Trend Chart */}
              <div className="bg-white rounded-3xl p-6 shadow-card border border-[#DDE7DF] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-[#164B35]">
                      मासिक संक्रमण प्रसार तुलना (Monthly Multi-Pathogen Incidence)
                    </h3>
                    <p className="text-xs text-[#5F6F65]">
                      खरीफ व रब्बी सीजन में अर्ली ब्लाइट, तांबेरा और एफिड्स का प्रसार
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-[#EAF4E9] text-[#164B35] px-3 py-1 rounded-full">
                    6 माह डेटा
                  </span>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MONTHLY_EPIDEMIC_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Line type="monotone" dataKey="EarlyBlight" stroke="#D9534F" strokeWidth={2.5} name="अर्ली ब्लाइट (झुलसा)" />
                      <Line type="monotone" dataKey="Rust" stroke="#F4B942" strokeWidth={2.5} name="सोयाबीन तांबेरा (Rust)" />
                      <Line type="monotone" dataKey="Aphids" stroke="#287A50" strokeWidth={2.5} name="कपास माहू (Aphids)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* District Severity Stacked Bar */}
              <div className="bg-white rounded-3xl p-6 shadow-card border border-[#DDE7DF] space-y-4">
                <div>
                  <h3 className="font-extrabold text-base text-[#164B35]">
                    जिलावार गंभीरता वितरण (District-wise Severity Breakdown)
                  </h3>
                  <p className="text-xs text-[#5F6F65]">
                    अति-गंभीर (Severe) व उच्च (High) क्लस्टर वाले शीर्ष 5 जिले
                  </p>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DISTRICT_SEVERITY_BARS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="district" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                      <Bar dataKey="Severe" stackId="a" fill="#D9534F" name="Severe (गंभीर)" />
                      <Bar dataKey="High" stackId="a" fill="#F49342" name="High (उच्च)" />
                      <Bar dataKey="Medium" stackId="a" fill="#F4B942" name="Medium (मध्यम)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            /* SECTION 19: Continuous Learning Loop Dashboard */
            <div className="space-y-6">
              {/* Architecture Workflow Visual Banner */}
              <div className="bg-[#164B35] text-white rounded-3xl p-6 shadow-card space-y-4">
                <div className="flex items-center space-x-2">
                  <Cpu size={22} className="text-emerald-300" />
                  <h3 className="font-extrabold text-lg">
                    एआई कंटीन्यूअस लर्निंग पाइपलाइन (Section 19 Workflow)
                  </h3>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed max-w-3xl">
                  अनसत्यापित अपलोड्स से मॉडल को स्वतः पुनः प्रशिक्षित नहीं किया जाता। प्रत्येक फोटो पहले एआई प्रेडिक्शन से गुजरती है, फिर KVK कृषि वैज्ञानिकों द्वारा सत्यापित या संशोधित की जाती है। केवल गुणवत्ता समीक्षा में उत्तीर्ण केस ही 'ट्रेनिंग डेटासेट' में जुड़ते हैं।
                </p>

                {/* Stepper Pipeline */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2 text-[10px] text-center font-bold">
                  <div className="bg-white/10 p-2.5 rounded-xl border border-white/20">
                    📸 1. किसान फोटो
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-xl border border-white/20">
                    ⚡ 2. AI अनुमान
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-xl border border-white/20">
                    👨‍🔬 3. विशेषज्ञ सत्यापन
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-xl border border-white/20">
                    📝 4. सही निदान
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-xl border border-white/20">
                    🔍 5. गुणवत्ता समीक्षा
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-xl border border-white/20">
                    💾 6. ट्रेनिंग सेट
                  </div>
                  <div className="bg-emerald-500 text-black p-2.5 rounded-xl font-black">
                    🚀 7. नया मॉडल रिलीज
                  </div>
                </div>
              </div>

              {/* 5 Core Learning Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-3xl border border-[#DDE7DF] shadow-card">
                  <span className="text-xs text-[#5F6F65] block font-bold">कुल विश्लेषित</span>
                  <span className="text-2xl font-black text-[#164B35] mt-1 block">
                    {metrics.totalAnalyzed}
                  </span>
                  <span className="text-[10px] text-[#5F6F65]">प्रारंभिक स्कैन</span>
                </div>

                <div className="bg-white p-4 rounded-3xl border border-[#DDE7DF] shadow-card">
                  <span className="text-xs text-[#5F6F65] block font-bold">सत्यापन लंबित</span>
                  <span className="text-2xl font-black text-amber-600 mt-1 block">
                    {metrics.pendingValidation}
                  </span>
                  <span className="text-[10px] text-amber-700">KVK कतार में</span>
                </div>

                <div className="bg-white p-4 rounded-3xl border border-[#DDE7DF] shadow-card">
                  <span className="text-xs text-[#5F6F65] block font-bold">वैज्ञानिक पुष्ट</span>
                  <span className="text-2xl font-black text-[#329568] mt-1 block">
                    {metrics.expertConfirmed}
                  </span>
                  <span className="text-[10px] text-emerald-700">सटीक पहचान</span>
                </div>

                <div className="bg-white p-4 rounded-3xl border border-[#DDE7DF] shadow-card">
                  <span className="text-xs text-[#5F6F65] block font-bold">सुधारे गए केस</span>
                  <span className="text-2xl font-black text-blue-600 mt-1 block">
                    {metrics.expertCorrected}
                  </span>
                  <span className="text-[10px] text-blue-700">सुधारित लेबल</span>
                </div>

                <div className="bg-white p-4 rounded-3xl border border-[#DDE7DF] shadow-card col-span-2 lg:col-span-1">
                  <span className="text-xs text-[#5F6F65] block font-bold">डेटासेट तैयार</span>
                  <span className="text-2xl font-black text-purple-900 mt-1 block">
                    {metrics.datasetReadyCount}
                  </span>
                  <span className="text-[10px] text-purple-700">उच्च गुणवत्ता</span>
                </div>
              </div>

              {/* Version Comparison & Retrain Benchmark Trigger */}
              <div className="bg-white rounded-3xl p-6 shadow-card border border-[#DDE7DF] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE7DF] pb-4">
                  <div>
                    <h3 className="font-extrabold text-base text-[#164B35]">
                      सक्रिय बनाम उम्मीदवार मॉडल संस्करण (Model Versions)
                    </h3>
                    <p className="text-xs text-[#5F6F65]">
                      Production MobileNetV3 vs Candidate EfficientNetB2
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulateModelEval}
                    disabled={isRetraining}
                    className="bg-[#164B35] hover:bg-[#287A50] disabled:opacity-60 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-sm transition-all"
                  >
                    <RefreshCw size={14} className={isRetraining ? "animate-spin" : ""} />
                    <span>{isRetraining ? "मूल्यांकन जारी है..." : "मॉडल बेंचमार्क मूल्यांकन चलाएं"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#F8F7F0] border border-[#DDE7DF] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#164B35]">सक्रिय उत्पादन मॉडल (Production):</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ACTIVE
                      </span>
                    </div>
                    <p className="font-mono text-sm font-black text-[#202D25]">
                      {metrics.currentModelVersion}
                    </p>
                    <p className="text-[#5F6F65]">
                      वर्तमान सत्यापन सटीकता: <strong>{metrics.benchmarkAccuracy}%</strong>
                    </p>
                    <p className="text-[11px] text-[#5F6F65]">
                      आर्किटेक्चर: MobileNetV3-Large (Pre-trained ImageNet + Maharashtra Agri Dataset)
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-950">उम्मीदवार मॉडल (Candidate Pipeline):</span>
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        CANDIDATE
                      </span>
                    </div>
                    <p className="font-mono text-sm font-black text-[#164B35]">
                      {metrics.candidateModelVersion}
                    </p>
                    <p className="text-emerald-900">
                      प्रस्तावित डेटासेट: <strong>+{metrics.datasetReadyCount} नए KVK सत्यापित नमूने</strong>
                    </p>
                    <p className="text-[11px] text-emerald-800">
                      अपेक्षित सुधार: +1.6% F1-Score (टमाटर अर्ली ब्लाइट व कपास माहू पर विशेष सुधार)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
