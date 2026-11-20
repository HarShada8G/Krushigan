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
    "à¤Ÿà¤®à¤¾à¤Ÿà¤° à¤•à¤¿à¤¸à¤¾à¤¨à¥‹à¤‚ à¤•à¥‡ à¤²à¤¿à¤ à¤®à¤¹à¤¤à¥à¤µà¤ªà¥‚à¤°à¥à¤£ à¤¸à¥‚à¤šà¤¨à¤¾: à¤†à¤ªà¤•à¥‡ à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤®à¥‡à¤‚ à¤†à¤°à¥à¤¦à¥à¤°à¤¤à¤¾ 80% à¤ªà¤¾à¤° à¤•à¤° à¤—à¤ˆ à¤¹à¥ˆ à¤”à¤° à¤…à¤°à¥à¤²à¥€ à¤¬à¥à¤²à¤¾à¤‡à¤Ÿ à¤°à¥‹à¤— à¤•à¤¾ à¤–à¤¤à¤°à¤¾ à¤¬à¤¢à¤¼ à¤°à¤¹à¤¾ à¤¹à¥ˆà¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤†à¤œ à¤…à¤ªà¤¨à¥€ à¤«à¤¸à¤² à¤•à¥‡ à¤¨à¤¿à¤šà¤²à¥‡ à¤ªà¤¤à¥à¤¤à¥‹à¤‚ à¤•à¥€ à¤œà¤¾à¤‚à¤š à¤•à¤°à¥‡à¤‚ à¤à¤µà¤‚ à¤œà¤²à¤­à¤°à¤¾à¤µ à¤¨ à¤¹à¥‹à¤¨à¥‡ à¤¦à¥‡à¤‚à¥¤"
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
        `à¤¸à¤¤à¤°à¥à¤•à¤¤à¤¾ à¤¸à¤‚à¤¦à¥‡à¤¶ à¤¸à¤«à¤²à¤¤à¤¾à¤ªà¥‚à¤°à¥à¤µà¤• ${estimatedFarmerCount} à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤•à¤¿à¤¸à¤¾à¤¨à¥‹à¤‚ à¤•à¥‹ à¤ªà¥à¤°à¥‡à¤·à¤¿à¤¤ (à¤¸à¤¿à¤®à¥à¤¯à¥à¤²à¥‡à¤Ÿà¥‡à¤¡ SMS à¤—à¥‡à¤Ÿà¤µà¥‡: DEMO MODE)`
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
                à¤¸à¤°à¤•à¤¾à¤°à¥€ à¤…à¤²à¤°à¥à¤Ÿ à¤ªà¥à¤°à¤¸à¤¾à¤°à¤£ à¤•à¥‡à¤‚à¤¦à¥à¤° (Government Alert Broadcast)
              </h1>
              <p className="text-xs text-[#5F6F65] mt-0.5">
                à¤¤à¤¹à¤¸à¥€à¤² à¤µ à¤«à¤¸à¤²-à¤µà¤¿à¤¶à¤¿à¤·à¥à¤Ÿ à¤°à¥‹à¤— à¤šà¥‡à¤¤à¤¾à¤µà¤¨à¥€ à¤à¤¸à¤à¤®à¤à¤¸ à¤à¤µà¤‚ à¤®à¥‹à¤¬à¤¾à¤‡à¤² à¤à¤ª à¤…à¤§à¤¿à¤¸à¥‚à¤šà¤¨à¤¾ à¤ªà¥à¤°à¥‡à¤·à¤£
              </p>
            </div>

            <div className="flex items-center space-x-1.5 text-xs text-amber-900 bg-amber-100/80 px-3 py-1.5 rounded-2xl border border-amber-300">
              <Sparkles size={14} className="text-amber-700" />
              <span>SMS à¤à¤•à¥€à¤•à¤°à¤£: <strong>à¤¸à¤¿à¤®à¥à¤¯à¥à¤²à¥‡à¤Ÿà¥‡à¤¡ à¤¡à¥‡à¤®à¥‹ à¤®à¥‹à¤¡</strong></span>
            </div>
          </div>

          {successBanner && (
            <div className="bg-[#329568] text-white p-4 rounded-3xl text-xs font-bold text-center animate-fadeIn shadow-sm">
              âœ“ {successBanner}
            </div>
          )}

          {/* Form and Live Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-card border border-[#DDE7DF] space-y-5">
              <h3 className="font-extrabold text-base text-[#164B35] flex items-center space-x-2">
                <Radio size={18} className="text-[#287A50]" />
                <span>à¤¨à¤¯à¤¾ à¤ªà¥‚à¤°à¥à¤µ à¤šà¥‡à¤¤à¤¾à¤µà¤¨à¥€ à¤¸à¤‚à¤¦à¥‡à¤¶ à¤¤à¥ˆà¤¯à¤¾à¤° à¤•à¤°à¥‡à¤‚ (Compose Advisory)</span>
              </h3>

              <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
                {/* District and Taluka Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#202D25] mb-1">
                      à¤²à¤•à¥à¤·à¤¿à¤¤ à¤œà¤¿à¤²à¤¾ (Target District) *
                    </label>
                    <select
                      value={district}
                      onChange={e => setDistrict(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDE7DF] font-bold text-[#164B35] focus:ring-2 focus:ring-[#287A50]"
                    >
                      <option value="Akola">à¤…à¤•à¥‹à¤²à¤¾ (Akola)</option>
                      <option value="Nashik">à¤¨à¤¾à¤¶à¤¿à¤• (Nashik)</option>
                      <option value="Amravati">à¤…à¤®à¤°à¤¾à¤µà¤¤à¥€ (Amravati)</option>
                      <option value="Nagpur">à¤¨à¤¾à¤—à¤ªà¥‚à¤° (Nagpur)</option>
                      <option value="Pune">à¤ªà¥à¤£à¥‡ (Pune)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#202D25] mb-1">
                      à¤²à¤•à¥à¤·à¤¿à¤¤ à¤¤à¤¹à¤¸à¥€à¤²à¥‡à¤‚ (Target Talukas) *
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
                      à¤²à¤•à¥à¤·à¤¿à¤¤ à¤«à¤¸à¤² (Target Crop) *
                    </label>
                    <select
                      value={crop}
                      onChange={e => setCrop(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#DDE7DF] font-bold text-[#164B35] focus:ring-2 focus:ring-[#287A50]"
                    >
                      <option value="Tomato">à¤Ÿà¤®à¤¾à¤Ÿà¤° (Tomato)</option>
                      <option value="Cotton">à¤•à¤ªà¤¾à¤¸ (Cotton)</option>
                      <option value="Onion">à¤ªà¥à¤¯à¤¾à¤œ (Onion)</option>
                      <option value="Soybean">à¤¸à¥‹à¤¯à¤¾à¤¬à¥€à¤¨ (Soybean)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#202D25] mb-1">
                      à¤°à¥‹à¤— / à¤•à¥€à¤Ÿ (Pathogen / Pest) *
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
                    à¤šà¥‡à¤¤à¤¾à¤µà¤¨à¥€ à¤—à¤‚à¤­à¥€à¤°à¤¤à¤¾ à¤¸à¥à¤¤à¤° (Risk Level):
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
                    à¤¸à¤‚à¤¦à¥‡à¤¶ à¤ªà¥à¤°à¤¾à¤°à¥‚à¤ª (Advisory Message Text):
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#DDE7DF] leading-relaxed focus:ring-2 focus:ring-[#287A50]"
                    required
                  />
                  <div className="flex justify-between text-[11px] text-[#5F6F65] mt-1">
                    <span>à¤…à¤¨à¥à¤®à¤¾à¤¨à¤¿à¤¤ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤à¤•à¤°à¥à¤¤à¤¾: <strong>{estimatedFarmerCount} à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤•à¤¿à¤¸à¤¾à¤¨</strong></span>
                    <span>{message.length} à¤…à¤•à¥à¤·à¤°</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-[#164B35] hover:bg-[#287A50] disabled:opacity-60 text-white font-bold py-3.5 rounded-2xl shadow-touch transition-all flex items-center justify-center space-x-2 text-xs"
                >
                  <Send size={15} />
                  <span>{isSending ? "à¤¸à¤‚à¤¦à¥‡à¤¶ à¤­à¥‡à¤œà¤¾ à¤œà¤¾ à¤°à¤¹à¤¾ à¤¹à¥ˆ..." : "à¤…à¤²à¤°à¥à¤Ÿ à¤ªà¥à¤°à¤¸à¤¾à¤°à¤¿à¤¤ à¤•à¤°à¥‡à¤‚ (Simulate SMS Broadcast)"}</span>
                </button>
              </form>
            </div>

            {/* Live Mobile SMS Preview (Right column) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="bg-white rounded-3xl p-6 shadow-card border border-[#DDE7DF] space-y-4">
                <span className="text-xs font-bold text-[#5F6F65] uppercase block">
                  à¤®à¥‹à¤¬à¤¾à¤‡à¤² à¤¸à¥à¤•à¥à¤°à¥€à¤¨ à¤ªà¥‚à¤°à¥à¤µà¤¾à¤µà¤²à¥‹à¤•à¤¨ (Farmer SMS / In-App Preview)
                </span>

                {/* Realistic Smartphone Frame */}
                <div className="w-full max-w-xs mx-auto bg-[#202D25] rounded-3xl p-3 shadow-2xl border-4 border-gray-700 text-black">
                  <div className="bg-white rounded-2xl p-4 min-h-[300px] flex flex-col justify-between text-xs space-y-3">
                    {/* Header */}
                    <div className="border-b pb-2 flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                        <strong className="text-[11px] text-[#164B35]">MH-KRUSHIGAN</strong>
                      </div>
                      <span className="text-[9px] text-gray-400">à¤…à¤­à¥€ (Just Now)</span>
                    </div>

                    {/* Body */}
                    <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-[#202D25] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-red-600 uppercase">
                          ðŸš¨ {riskLevel.toUpperCase()} RISK ALERT
                        </span>
                        <span className="text-[9px] text-[#5F6F65]">{district}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed font-medium">
                        {message}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="text-[9px] text-gray-500 text-center border-t pt-2">
                      à¤•à¥ƒà¤·à¤¿ à¤†à¤¯à¥à¤•à¥à¤¤à¤¾à¤²à¤¯, à¤®à¤¹à¤¾à¤°à¤¾à¤·à¥à¤Ÿà¥à¤° à¤¶à¤¾à¤¸à¤¨ | à¤Ÿà¥‹à¤²-à¤«à¥à¤°à¥€: 1800-233-4000
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery History log */}
              <div className="bg-white rounded-3xl p-5 shadow-card border border-[#DDE7DF] space-y-3">
                <h4 className="font-bold text-xs text-[#164B35]">
                  à¤¹à¤¾à¤² à¤¹à¥€ à¤®à¥‡à¤‚ à¤­à¥‡à¤œà¥‡ à¤—à¤ à¤ªà¥à¤°à¤¸à¤¾à¤°à¤£ (Recent Broadcasts)
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {alerts.map(alt => (
                    <div key={alt.id} className="p-2.5 rounded-xl bg-[#F8F7F0] border border-[#DDE7DF] text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#164B35]">{alt.title}</strong>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          âœ“ Sent ({alt.targetCount})
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
