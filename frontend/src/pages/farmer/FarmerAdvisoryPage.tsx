import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  AlertTriangle, 
  BookOpen, 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';
import { DEMO_WEATHER, DEMO_ENVIRONMENTAL_RISK } from '../../data/demoData';
import { getWeatherData } from '../../services/api';
import { WeatherData } from '../../types';
import { OFFLINE_GUIDES } from '../../data/offlineGuides';
import { FarmerHeader } from '../../components/layout/FarmerHeader';
import { FarmerBottomNav } from '../../components/layout/FarmerBottomNav';

export const FarmerAdvisoryPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { farmerProfile } = useAuth();
  const navigate = useNavigate();
  const { speak, stop: stopSpeaking, isSpeaking } = useSpeechSynthesis(language);

  const [expandedGuideId, setExpandedGuideId] = useState<string | null>("guide_tomato");
  const [weather, setWeather] = useState<WeatherData>(DEMO_WEATHER);

  useEffect(() => {
    if (farmerProfile?.district) {
      getWeatherData(farmerProfile.district, farmerProfile.latitude, farmerProfile.longitude)
        .then(d => setWeather(d))
        .catch(() => {});
    }
  }, [farmerProfile?.district, farmerProfile?.latitude, farmerProfile?.longitude]);

  const risk = DEMO_ENVIRONMENTAL_RISK;

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low':
        return <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">{t('risk_low')}</span>;
      case 'medium':
        return <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">{t('risk_medium')}</span>;
      case 'high':
      default:
        return <span className="bg-red-100 text-red-900 text-xs font-bold px-3 py-1 rounded-full">{t('risk_high')}</span>;
    }
  };

  const handleReadRisk = () => {
    const text = language === 'mr' ? risk.descriptionMr : language === 'en' ? risk.descriptionEn : risk.descriptionHi;
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(text);
    }
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
            {t('weather_risk_title')}
          </span>
        </div>

        {/* Environmental Risk Highlight Card */}
        <div className="bg-white rounded-3xl p-5 shadow-card border-2 border-red-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#D9534F] uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
              क्षेत्रीय वातावरणीय जोखिम (Micro-climate Alert)
            </span>
            {getRiskBadge(risk.riskLevel)}
          </div>

          <div>
            <h2 className="text-lg font-black text-[#164B35] leading-tight">
              {language === 'mr' ? risk.titleMr : language === 'en' ? risk.titleEn : risk.titleHi}
            </h2>
            <p className="text-xs text-[#202D25] leading-relaxed mt-2 font-medium">
              {language === 'mr' ? risk.descriptionMr : language === 'en' ? risk.descriptionEn : risk.descriptionHi}
            </p>
          </div>

          {/* Contributing factors */}
          <div className="bg-[#F8F7F0] p-3 rounded-2xl border border-[#DDE7DF] space-y-1.5 text-xs">
            <span className="font-bold text-[#164B35] block text-[11px]">
              जोखिम उत्पन्न करने वाले प्रमुख कारण:
            </span>
            {risk.contributingFactors.map((factor, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-[#5F6F65]">
                <span className="text-red-600 font-bold">•</span>
                <span>{factor}</span>
              </div>
            ))}
          </div>

          {/* Action Callout & Audio Speech */}
          <div className="pt-1 flex items-center justify-between">
            <button
              onClick={handleReadRisk}
              className="flex items-center space-x-1 text-xs font-bold text-[#164B35] bg-[#EAF4E9] px-3 py-1.5 rounded-xl border border-[#287A50]/30"
            >
              {isSpeaking ? <VolumeX size={14} className="text-red-500" /> : <Volume2 size={14} />}
              <span>{isSpeaking ? "आवाज़ रोकें" : "चेतावनी सुनें"}</span>
            </button>
            <span className="text-[10px] text-[#5F6F65]">
              {farmerProfile?.district ? `${farmerProfile.district}, ${farmerProfile.state || ''}` : "जिला: अकोला (Akot Taluka)"}
            </span>
          </div>

          {/* Scientific Disclaimer as required by Section 11 */}
          <p className="text-[10px] text-[#5F6F65] border-t border-[#DDE7DF] pt-2 italic">
            ℹ️ {t('env_weather_note')}
          </p>
        </div>

        {/* Current Weather & 3-Day Forecast */}
        <div className="bg-white rounded-3xl p-5 shadow-card border border-[#DDE7DF] space-y-4">
          <div className="flex items-center justify-between border-b border-[#DDE7DF] pb-3">
            <div>
              <span className="text-xs text-[#5F6F65] font-semibold">{t('weather_today')}</span>
              <h3 className="text-2xl font-black text-[#164B35]">
                {weather.temperature}°C
              </h3>
              <p className="text-xs text-[#5F6F65]">
                {language === 'mr' ? weather.conditionMr : language === 'en' ? weather.condition : weather.conditionHi}
              </p>
            </div>
            <div className="text-right text-xs text-[#5F6F65] space-y-1">
              <div className="flex items-center space-x-1 justify-end">
                <Droplets size={13} className="text-blue-500" />
                <span>{language === 'mr' ? 'आर्द्रता' : language === 'en' ? 'Humidity' : 'आर्द्रता'}: <strong>{weather.humidity}%</strong></span>
              </div>
              <div className="flex items-center space-x-1 justify-end">
                <Wind size={13} className="text-teal-600" />
                <span>{language === 'mr' ? 'वारा' : language === 'en' ? 'Wind' : 'हवा'}: <strong>{weather.windSpeedKmh} km/h</strong></span>
              </div>
              <div className="flex items-center space-x-1 justify-end">
                <CloudSun size={13} className="text-amber-500" />
                <span>{language === 'mr' ? 'पाऊस' : language === 'en' ? 'Rain' : 'बारिश'}: <strong>{weather.rainfallProbability}%</strong></span>
              </div>
            </div>
          </div>

          {/* Next 3-Day Forecast */}
          <div>
            <h4 className="text-xs font-black text-[#164B35] mb-2 uppercase tracking-wider">
              {language === 'mr' ? 'पुढील ३ दिवसांचा अंदाज (3-Day Outlook)' : language === 'en' ? 'Upcoming 3-Day Forecast' : 'आगामी 3 दिनों का पूर्वानुमान (3-Day Outlook)'}
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {weather.forecast3Days.map((fc, i) => (
                <div key={i} className="bg-[#F8F7F0] p-2.5 rounded-2xl text-center border border-[#DDE7DF]">
                  <span className="text-[10px] font-bold text-[#5F6F65] block truncate">
                    {fc.day.split(' ')[0]}
                  </span>
                  <span className="text-lg font-black text-[#164B35] block my-0.5">
                    {fc.temp}°C
                  </span>
                  <span className="text-[10px] text-blue-600 font-bold block">
                    🌧️ {fc.rainProb}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION: Offline Crop-Care Guides */}
        <div id="guides" className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#164B35] flex items-center space-x-2">
              <BookOpen size={18} className="text-[#287A50]" />
              <span>ऑफ़लाइन फसल निगा मार्गदर्शिका (Offline Guides)</span>
            </h3>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              कैश्ड
            </span>
          </div>

          {OFFLINE_GUIDES.map(guide => {
            const isExpanded = expandedGuideId === guide.id;
            return (
              <div
                key={guide.id}
                className="bg-white rounded-2xl border border-[#DDE7DF] overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setExpandedGuideId(isExpanded ? null : guide.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-emerald-50/40 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🌱</span>
                    <div>
                      <h4 className="font-extrabold text-sm text-[#164B35]">
                        {language === 'mr' ? guide.cropMr : guide.cropHi} ({guide.crop})
                      </h4>
                      <p className="text-[11px] text-[#5F6F65]">{guide.seasonalCalendar}</p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isExpanded && (
                  <div className="p-4 border-t border-[#DDE7DF] bg-[#F8F7F0]/40 space-y-3 text-xs">
                    <div>
                      <span className="font-bold text-[#164B35] block mb-1">
                        निवारक सावधानियां (Preventive Measures):
                      </span>
                      <ul className="space-y-1 text-[#5F6F65]">
                        {guide.preventiveMeasures.map((pm, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="text-emerald-700 font-bold">✓</span>
                            <span>{pm}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-[#DDE7DF]">
                      <span className="font-bold text-[#164B35] block mb-2">
                        प्रमुख रोग व जैविक उपचार:
                      </span>
                      {guide.commonProblems.map((prob, pi) => (
                        <div key={pi} className="bg-white p-3 rounded-xl border border-[#DDE7DF] mb-2 space-y-1">
                          <h5 className="font-bold text-[#164B35]">
                            {prob.name} ({prob.nameHi})
                          </h5>
                          <p className="text-[11px] text-[#5F6F65]">
                            <strong>पहचान: </strong>{prob.identification}
                          </p>
                          <p className="text-[11px] text-emerald-800 font-medium">
                            <strong>जैविक उपाय: </strong>{prob.organicRemedy}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <FarmerBottomNav />
    </div>
  );
};
