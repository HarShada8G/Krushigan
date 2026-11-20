import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Mic, 
  BookOpen, 
  FileText, 
  CloudSun, 
  AlertTriangle, 
  ChevronRight, 
  MapPin, 
  ShieldAlert, 
  Volume2, 
  Sparkles,
  Droplets,
  Wind
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';
import { DEMO_WEATHER, DEMO_ENVIRONMENTAL_RISK } from '../../data/demoData';
import { FarmerHeader } from '../../components/layout/FarmerHeader';
import { FarmerBottomNav } from '../../components/layout/FarmerBottomNav';
import { OfflineBanner } from '../../components/common/OfflineBanner';
import { VoiceAssistantModal } from '../../components/common/VoiceAssistantModal';

export const FarmerDashboardPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { farmerProfile } = useAuth();
  const { speak, isSpeaking } = useSpeechSynthesis(language);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const navigate = useNavigate();

  // Selected crop & risk calculations
  const cropName = farmerProfile.currentCrop || 'Tomato';
  const cropDisplay = language === 'mr' ? 'टोमॅटो' : language === 'en' ? 'Tomato' : 'टमाटर';

  const advisoryText = language === 'mr'
    ? "पुढील ४८ तासांत हवेतील दमटपणा वाढू शकतो. आपल्या टोमॅटो पिकाच्या खालच्या पानांचे बारकाईने निरीक्षण करा व पाणी साचू देऊ नका."
    : language === 'en'
    ? "Relative humidity is forecasted to rise above 80% over the next 48 hours. Scout bottom tomato canopy for early blight lesions and avoid standing water."
    : "अगले कुछ दिनों में नमी बढ़ सकती है। अपनी फसल की निचली पत्तियों की जांच करें और खेत में पानी जमा न होने दें।";

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col pb-24">
      <FarmerHeader />
      <OfflineBanner />

      <main className="max-w-xl mx-auto px-4 py-4 w-full space-y-4">
        {/* Farmer Greeting & Location Card */}
        <div className="bg-white rounded-3xl p-5 shadow-card border border-[#DDE7DF] flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#164B35] leading-tight">
              {t('greeting')} {farmerProfile.name.split(' ')[0]} जी 👋
            </h2>
            <div className="flex items-center space-x-1 text-xs text-[#5F6F65] mt-1 font-medium">
              <MapPin size={13} className="text-[#287A50]" />
              <span>
                {farmerProfile.village}, {farmerProfile.taluka}, {farmerProfile.district} (महाराष्ट्र)
              </span>
            </div>
          </div>
          <Link
            to="/farmer/profile"
            className="w-10 h-10 rounded-full bg-[#EAF4E9] flex items-center justify-center text-[#164B35] hover:bg-emerald-100 transition-colors shadow-sm"
            title="प्रोफाइल देखें"
          >
            👤
          </Link>
        </div>

        {/* Weather & Crop Status Overview Card */}
        <div className="grid grid-cols-2 gap-3">
          {/* Weather Card */}
          <div className="bg-white rounded-3xl p-4 shadow-card border border-[#DDE7DF] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#5F6F65] font-semibold">
              <span>{t('weather_today')}</span>
              <CloudSun size={16} className="text-amber-500" />
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-[#202D25]">{DEMO_WEATHER.temperature}°C</span>
              <span className="text-[11px] text-[#5F6F65]">धूप व बादल</span>
            </div>
            <div className="text-[11px] text-[#5F6F65] space-y-0.5 border-t border-[#DDE7DF] pt-1.5">
              <div className="flex items-center justify-between">
                <span>{t('rain_probability')}:</span>
                <span className="font-bold text-[#164B35]">{DEMO_WEATHER.rainfallProbability}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t('humidity')}:</span>
                <span className="font-bold text-[#164B35]">{DEMO_WEATHER.humidity}%</span>
              </div>
            </div>
          </div>

          {/* Current Crop & Status Card */}
          <div className="bg-white rounded-3xl p-4 shadow-card border border-[#DDE7DF] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#5F6F65] font-semibold">
              <span>{t('your_crop')}</span>
              <span className="text-xs">🌱</span>
            </div>
            <div>
              <span className="text-2xl font-black text-[#164B35] block leading-tight truncate">
                {cropDisplay}
              </span>
              <span className="text-[11px] text-[#5F6F65] block">
                {farmerProfile.growthStage || 'Flowering'}
              </span>
            </div>
            <div className="text-[11px] border-t border-[#DDE7DF] pt-1.5 flex items-center justify-between">
              <span className="text-[#5F6F65]">{t('crop_status')}:</span>
              <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>{t('status_healthy')}</span>
              </span>
            </div>
          </div>
        </div>

        {/* PRIMARY ACTION: Large Photo Capture Button */}
        <Link
          to="/farmer/scan"
          className="w-full bg-gradient-to-r from-[#164B35] to-[#287A50] hover:from-[#113C2B] hover:to-[#226743] text-white p-5 rounded-3xl shadow-touch transition-all transform active:scale-98 flex items-center justify-between group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform">
              <Camera size={30} className="text-emerald-300" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black block leading-tight tracking-tight">
                {t('take_photo_btn')}
              </span>
              <span className="text-xs text-emerald-200 block mt-0.5 font-medium">
                पत्ती या तने की फोटो खींचकर तुरंत बीमारी जांचें
              </span>
            </div>
          </div>
          <ChevronRight size={24} className="text-emerald-300/80 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* SECONDARY ROW: Voice & Crop Care Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* Voice Assistant Action */}
          <button
            type="button"
            onClick={() => setIsVoiceOpen(true)}
            className="bg-white hover:bg-emerald-50/60 text-[#164B35] p-4 rounded-3xl shadow-card border border-[#DDE7DF] flex flex-col items-center justify-center space-y-1.5 transition-all text-center"
          >
            <div className="w-11 h-11 rounded-full bg-[#EAF4E9] flex items-center justify-center text-[#164B35]">
              <Mic size={22} className="text-[#287A50]" />
            </div>
            <span className="text-sm font-black">{t('voice_assist_btn')}</span>
            <span className="text-[10px] text-[#5F6F65]">अपनी भाषा में पूछें</span>
          </button>

          {/* Offline Crop Care Guides Action */}
          <Link
            to="/farmer/advisory#guides"
            className="bg-white hover:bg-emerald-50/60 text-[#164B35] p-4 rounded-3xl shadow-card border border-[#DDE7DF] flex flex-col items-center justify-center space-y-1.5 transition-all text-center"
          >
            <div className="w-11 h-11 rounded-full bg-[#EAF4E9] flex items-center justify-center text-[#164B35]">
              <BookOpen size={22} className="text-[#287A50]" />
            </div>
            <span className="text-sm font-black">{t('crop_care_btn')}</span>
            <span className="text-[10px] text-[#5F6F65]">बिना इंटरनेट उपलब्ध</span>
          </Link>
        </div>

        {/* TODAY'S ADVISORY: Clean & Highlighted Card */}
        <div className="bg-amber-50/90 rounded-3xl p-5 border border-amber-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-amber-600 font-bold">📢</span>
              <span className="text-xs font-black text-amber-950 uppercase tracking-wide">
                {t('todays_advisory')}
              </span>
            </div>
            <button
              onClick={() => speak(advisoryText)}
              className="text-xs text-amber-900 bg-amber-200/60 hover:bg-amber-200 px-2.5 py-1 rounded-full font-semibold flex items-center space-x-1"
              title="बोलकर सुनें"
            >
              <Volume2 size={13} />
              <span>{isSpeaking ? "रोकें" : "सुनें"}</span>
            </button>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
            "{advisoryText}"
          </p>
          <div className="pt-1 flex items-center justify-between text-[11px] text-amber-800 font-semibold border-t border-amber-200/60">
            <span>स्रोत: KVK अकोला कृषि मौसम विभाग</span>
            <Link to="/farmer/advisory" className="underline hover:text-amber-950">
              विस्तार से देखें →
            </Link>
          </div>
        </div>

        {/* Other helpful shortcuts */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <Link
            to="/farmer/my-crops"
            className="bg-white p-3.5 rounded-2xl border border-[#DDE7DF] shadow-sm flex items-center space-x-2 text-xs font-bold text-[#164B35] hover:bg-[#EAF4E9] transition-colors"
          >
            <span className="text-base">📋</span>
            <span>{t('my_crops_btn')}</span>
          </Link>
          <Link
            to="/farmer/history"
            className="bg-white p-3.5 rounded-2xl border border-[#DDE7DF] shadow-sm flex items-center space-x-2 text-xs font-bold text-[#164B35] hover:bg-[#EAF4E9] transition-colors"
          >
            <span className="text-base">🕒</span>
            <span>{t('history_btn')}</span>
          </Link>
        </div>
      </main>

      <FarmerBottomNav />

      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />
    </div>
  );
};
