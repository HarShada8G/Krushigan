import React, { useState } from 'react';
import { 
  Radio, 
  Send, 
  Smartphone, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  Sparkles,
  MapPin
} from 'lucide-react';
import { OfficerHeader } from '../../components/layout/OfficerHeader';
import { OfficerSidebar } from '../../components/layout/OfficerSidebar';
import { DemoBanner } from '../../components/common/DemoBanner';
import { DEMO_BROADCAST_ALERTS } from '../../data/demoData';
import { BroadcastAlert } from '../../types';
import { createBroadcastAlert } from '../../services/api';

export const OfficerAlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<BroadcastAlert[]>(DEMO_BROADCAST_ALERTS);

  // Form State
  const [district, setDistrict] = useState('Akola');
  const [taluka, setTaluka] = useState('Akot & Telhara');
  const [crop, setCrop] = useState('Tomato');
  const [diseaseOrPest, setDiseaseOrPest] = useState('Early Blight (Alternaria)');
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high' | 'severe'>('high');
  const [message, setMessage] = useState(
    "टमाटर किसानों के लिए महत्वपूर्ण सूचना: आपके क्षेत्र में आर्द्रता 80% पार कर गई है और अर्ली ब्लाइट रोग का खतरा बढ़ रहा है। कृपया आज अपनी फसल के निचले पत्तों की जांच करें एवं जलभराव न होने दें।"
  );

  const [isSending, setIsSending] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const estimatedFarmerCount = 1240;

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const newAlert: BroadcastAlert = {
      id: `ALT-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: `${district} ${crop} ${diseaseOrPest} Advisory`,
      district,
      taluka,
      crop,
      diseaseOrPest,
      riskLevel,
      messageHi: message,
      messageMr: message,
      messageEn: message,
      targetCount: estimatedFarmerCount,
      dispatchedAt: new Date().toLocaleString(),
      deliveryStatus: 'simulated_sent',
      authorOfficer: 'Dr. Sunita Deshmukh (DAO Akola)'
    };

    setTimeout(async () => {
      await createBroadcastAlert(newAlert);
      setAlerts(prev => [newAlert, ...prev]);
      setIsSending(false);
      setSuccessBanner(
        `सतर्कता संदेश सफलतापूर्वक ${estimatedFarmerCount} पंजीकृत किसानों को प्रेषित (सिम्युलेटेड SMS गेटवे: DEMO MODE)`
      );
      setTimeout(() => setSuccessBanner(null), 5000);
    }, 1200);
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
                सरकारी अलर्ट प्रसारण केंद्र (Government Alert Broadcast)
              </h1>
              <p className="text-xs text-[#5F6F65] mt-0.5">
                तहसील व फसल-विशिष्ट रोग चेतावनी एसएमएस एवं मोबाइल ऐप अधिसूचना प्रेषण
              </p>
            </div>

            <div className="flex items-center space-x-1.5 text-xs text-amber-900 bg-amber-100/80 px-3 py-1.5 rounded-2xl border border-amber-300">
              <Sparkles size={14} className="text-amber-700" />
              <span>SMS एकीकरण: <strong>सिम्युलेटेड डेमो मोड</strong></span>
            </div>
          </div>

          {successBanner && (
            <div className="bg-[#329568] text-white p-4 rounded-3xl text-xs font-bold text-center animate-fadeIn shadow-sm">
              ✓ {successBanner}
            </div>
          )}

          {/* Form and Live Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-card border border-[#DDE7DF] space-y-5">
              <h3 className="font-extrabold text-base text-[#164B35] flex items-center space-x-2">
                <Radio size={18} className="text-[#287A50]" />
                <span>नया पूर्व चेतावनी संदेश तैयार करें (Compose Advisory)</span>
              </h3>

              <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
                {/* District and Taluka Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#202D25] mb-1">
                      लक्षित जिला (Target District) *
                    </label>
                    <select
                      value={district}
                      onChange={e => setDistrict(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDE7DF] font-bold text-[#164B35] focus:ring-2 focus:ring-[#287A50]"
                    >
                      <option value="Akola">अकोला (Akola)</option>
                      <option value="Nashik">नाशिक (Nashik)</option>
                      <option value="Amravati">अमरावती (Amravati)</option>
                      <option value="Nagpur">नागपूर (Nagpur)</option>
                      <option value="Pune">पुणे (Pune)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#202D25] mb-1">
                      लक्षित तहसीलें (Target Talukas) *
                    </label>
                    <input
                      type="text"
                      value={taluka}
                      onChange={e => setTaluka(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDE7DF]"
                      required
                    />
                  </div>
                </div>

                {/* Crop and Disease Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#202D25] mb-1">
                      लक्षित फसल (Target Crop) *
                    </label>
                    <select
                      value={crop}
                      onChange={e => setCrop(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDE7DF] font-bold text-[#164B35] focus:ring-2 focus:ring-[#287A50]"
                    >
                      <option value="Tomato">टमाटर (Tomato)</option>
                      <option value="Cotton">कपास (Cotton)</option>
                      <option value="Onion">प्याज (Onion)</option>
                      <option value="Soybean">सोयाबीन (Soybean)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#202D25] mb-1">
                      रोग / कीट (Pathogen / Pest) *
                    </label>
                    <input
                      type="text"
                      value={diseaseOrPest}
                      onChange={e => setDiseaseOrPest(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDE7DF]"
                      required
                    />
                  </div>
                </div>

                {/* Risk Level radio buttons */}
                <div>
                  <label className="block font-bold text-[#202D25] mb-1.5">
                    चेतावनी गंभीरता स्तर (Risk Level):
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['low', 'medium', 'high', 'severe'] as const).map(lvl => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setRiskLevel(lvl)}
                        className={`py-2 px-1 text-center font-bold rounded-xl border uppercase text-[10px] transition-all ${
                          riskLevel === lvl
                            ? 'bg-[#164B35] text-white border-[#164B35] shadow-sm'
                            : 'bg-[#F8F7F0] text-[#5F6F65] border-[#DDE7DF] hover:bg-emerald-50'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advisory Message Textarea */}
                <div>
                  <label className="block font-bold text-[#202D25] mb-1">
                    संदेश प्रारूप (Advisory Message Text):
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#DDE7DF] leading-relaxed focus:ring-2 focus:ring-[#287A50]"
                    required
                  />
                  <div className="flex justify-between text-[11px] text-[#5F6F65] mt-1">
                    <span>अनुमानित प्राप्तकर्ता: <strong>{estimatedFarmerCount} पंजीकृत किसान</strong></span>
                    <span>{message.length} अक्षर</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-[#164B35] hover:bg-[#287A50] disabled:opacity-60 text-white font-bold py-3.5 rounded-2xl shadow-touch transition-all flex items-center justify-center space-x-2 text-xs"
                >
                  <Send size={15} />
                  <span>{isSending ? "संदेश भेजा जा रहा है..." : "अलर्ट प्रसारित करें (Simulate SMS Broadcast)"}</span>
                </button>
              </form>
            </div>

            {/* Live Mobile SMS Preview (Right column) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="bg-white rounded-3xl p-6 shadow-card border border-[#DDE7DF] space-y-4">
                <span className="text-xs font-bold text-[#5F6F65] uppercase block">
                  मोबाइल स्क्रीन पूर्वावलोकन (Farmer SMS / In-App Preview)
                </span>

                {/* Realistic Smartphone Frame */}
                <div className="w-full max-w-xs mx-auto bg-[#202D25] rounded-3xl p-3 shadow-2xl border-4 border-gray-700 text-black">
                  <div className="bg-white rounded-2xl p-4 min-h-[300px] flex flex-col justify-between text-xs space-y-3">
                    {/* Header */}
                    <div className="border-b pb-2 flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                        <strong className="text-[11px] text-[#164B35]">MH-CROPGUARD</strong>
                      </div>
                      <span className="text-[9px] text-gray-400">अभी (Just Now)</span>
                    </div>

                    {/* Body */}
                    <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-[#202D25] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-red-600 uppercase">
                          🚨 {riskLevel.toUpperCase()} RISK ALERT
                        </span>
                        <span className="text-[9px] text-[#5F6F65]">{district}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed font-medium">
                        {message}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="text-[9px] text-gray-500 text-center border-t pt-2">
                      कृषि आयुक्तालय, महाराष्ट्र शासन | टोल-फ्री: 1800-233-4000
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery History log */}
              <div className="bg-white rounded-3xl p-5 shadow-card border border-[#DDE7DF] space-y-3">
                <h4 className="font-bold text-xs text-[#164B35]">
                  हाल ही में भेजे गए प्रसारण (Recent Broadcasts)
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {alerts.map(alt => (
                    <div key={alt.id} className="p-2.5 rounded-xl bg-[#F8F7F0] border border-[#DDE7DF] text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#164B35]">{alt.title}</strong>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          ✓ Sent ({alt.targetCount})
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5F6F65] line-clamp-1">{alt.messageHi}</p>
                      <span className="text-[9px] text-gray-400 block">{alt.dispatchedAt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
