import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  Cpu, 
  CloudRain, 
  AlertTriangle, 
  CheckCircle2, 
  Users2, 
  ShieldCheck, 
  Mic, 
  WifiOff, 
  ArrowRight,
  TrendingUp,
  Leaf,
  Bug,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { DemoBanner } from '../../components/common/DemoBanner';

export const LandingPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col">
      <DemoBanner />
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#164B35] to-[#205A41] text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EAF4E9_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>महाराष्ट्र शासन संकल्पना उपक्रम | Problem ID: 26131</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-tight">
              {t('hero_headline')}
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('hero_subheading')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/farmer/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#EAF4E9] hover:bg-white text-[#164B35] font-extrabold text-base shadow-touch transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <span>🌱 {t('open_farmer_portal')}</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/how-it-works"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-all flex items-center justify-center space-x-2"
              >
                <span>{t('learn_more')}</span>
              </Link>
            </div>

            {/* Quick stats pills */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-white/15 max-w-xl mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-black text-amber-300">92%+</span>
                <span className="text-xs text-emerald-200">पहचान सटीकता (AI Test)</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-black text-amber-300">&lt;5 Sec</span>
                <span className="text-xs text-emerald-200">तात्काळ विश्लेषण</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-black text-amber-300">100%</span>
                <span className="text-xs text-emerald-200">प्रमाणित सेंद्रिय/ICAR सल्ला</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-5 shadow-2xl text-[#202D25] border-4 border-white/20">
              <div className="absolute -top-3 -right-3 bg-amber-400 text-[#164B35] text-xs font-black px-3 py-1 rounded-full shadow-md">
                LIVE DEMO MOCKUP
              </div>

              {/* Smartphone preview simulating crop scan */}
              <div className="bg-[#F8F7F0] rounded-2xl p-4 border border-[#DDE7DF] space-y-3">
                <div className="flex items-center justify-between border-b border-[#DDE7DF] pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-bold text-[#164B35]">CropGuardian Mobile</span>
                  </div>
                  <span className="text-[10px] text-gray-500">अकोला, महाराष्ट्र</span>
                </div>

                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-emerald-950">
                  <img
                    src="https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=600&q=80"
                    alt="Tomato Leaf Early Blight Lesion"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                    <span className="text-[10px] bg-red-600/90 text-white font-bold px-2 py-0.5 rounded w-max mb-1">
                      अर्ली ब्लाइट (झुलसा) 94%
                    </span>
                    <p className="text-xs font-medium">टमाटर की पत्ती पर छल्लेदार धब्बे</p>
                  </div>
                </div>

                {/* 3-tier recommendation sample */}
                <div className="space-y-1.5 text-xs">
                  <div className="bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-200">
                    <span className="font-bold">🟢 पहले यह करें:</span> संक्रमित पत्तियां तोड़ें, ड्रिप सिंचाई करें
                  </div>
                  <div className="bg-amber-50 text-amber-900 p-2 rounded-lg border border-amber-200">
                    <span className="font-bold">🟡 जैविक:</span> ट्राइकोडर्मा 5g/L पानी में छिड़कें
                  </div>
                </div>

                <Link
                  to="/farmer/scan"
                  className="block text-center bg-[#164B35] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#287A50] transition-colors"
                >
                  📷 अभी फोटो खींचकर जांचें
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section: The Problem */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-[#287A50] tracking-wider uppercase bg-[#EAF4E9] px-3 py-1 rounded-full">
            कृषि संकट
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#202D25] mt-3">
            {t('problem_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Problem 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-[#DDE7DF] hover:shadow-soft transition-all">
            <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#D9534F] flex items-center justify-center mb-5">
              <AlertTriangle size={28} />
            </div>
            <h3 className="text-lg font-bold text-[#202D25] mb-2">{t('problem_1_title')}</h3>
            <p className="text-sm text-[#5F6F65] leading-relaxed">{t('problem_1_desc')}</p>
          </div>

          {/* Problem 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-[#DDE7DF] hover:shadow-soft transition-all">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#F4B942] flex items-center justify-center mb-5">
              <Bug size={28} />
            </div>
            <h3 className="text-lg font-bold text-[#202D25] mb-2">{t('problem_2_title')}</h3>
            <p className="text-sm text-[#5F6F65] leading-relaxed">{t('problem_2_desc')}</p>
          </div>

          {/* Problem 3 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-[#DDE7DF] hover:shadow-soft transition-all">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#329568] flex items-center justify-center mb-5">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-lg font-bold text-[#202D25] mb-2">{t('problem_3_title')}</h3>
            <p className="text-sm text-[#5F6F65] leading-relaxed">{t('problem_3_desc')}</p>
          </div>
        </div>
      </section>

      {/* Section: The Solution Workflow */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EAF4E9]/60 border-y border-[#287A50]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-[#164B35] tracking-wider uppercase bg-white px-3 py-1 rounded-full shadow-sm">
              DETECT → ASSESS → PREDICT → ADVISE → VALIDATE → MONITOR
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#164B35] mt-3">
              {t('solution_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t('workflow_steps').map((step: any, idx: number) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-[#DDE7DF] relative">
                <div className="w-9 h-9 rounded-xl bg-[#164B35] text-white flex items-center justify-center font-bold text-sm mb-3">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-base text-[#164B35] mb-1.5">{step.step}</h4>
                <p className="text-xs text-[#5F6F65] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Two User Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#202D25]">
            दो अलग-अलग उपयोगकर्ता अनुभव (Two Distinct Experiences)
          </h2>
          <p className="text-sm text-[#5F6F65] mt-2">
            किसान के लिए सहज व सरल मोबाइल ऐप, तथा कृषि अधिकारियों के लिए व्यापक जिला निगरानी डैशबोर्ड।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Farmer Portal Card */}
          <div className="bg-gradient-to-br from-[#164B35] to-[#287A50] text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <span className="bg-white/20 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase">
                किसान पोर्टल (Farmer Experience)
              </span>
              <h3 className="text-2xl font-bold">सरल, स्पष्ट और भरोसेमंद</h3>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                कोई जटिल ग्राफ या तकनीकी शब्दावली नहीं। 5 सेकंड में समझ आने वाला इंटरफेस, आवाज सहायता, मौसम जोखिम तथा प्रमाणित उपचार सलाह।
              </p>
              <ul className="space-y-2 text-xs text-emerald-100 pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 size={16} className="text-emerald-300" />
                  <span>कैमरे से एक क्लिक में पत्ती/तने की जांच</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 size={16} className="text-emerald-300" />
                  <span>हिंदी व मराठी में बोलकर सवाल पूछें</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 size={16} className="text-emerald-300" />
                  <span>ऑफ़लाइन फसल निगा मार्गदर्शिका बिना इंटरनेट</span>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <Link
                to="/farmer/dashboard"
                className="inline-flex items-center space-x-2 bg-white text-[#164B35] font-bold text-sm px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors shadow-sm"
              >
                <span>किसान पोर्टल खोलें</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Officer Portal Card */}
          <div className="bg-white border-2 border-[#164B35]/20 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <span className="bg-[#EAF4E9] text-[#164B35] text-xs font-bold px-3 py-1 rounded-full uppercase">
                अधिकारी पोर्टल (Officer Command Center)
              </span>
              <h3 className="text-2xl font-bold text-[#164B35]">महामारी निगरानी व जीआईएस हॉटस्पॉट</h3>
              <p className="text-sm text-[#5F6F65] leading-relaxed">
                महाराष्ट्र के 36 जिलों में रोग प्रसार की वास्तविक समय मैपिंग, हॉटस्पॉट अलर्ट्स, KVK विशेषज्ञ सत्यापन तथा लक्षित एसएमएस प्रसारण।
              </p>
              <ul className="space-y-2 text-xs text-[#5F6F65] pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 size={16} className="text-[#287A50]" />
                  <span>इंटरएक्टिव महाराष्ट्र Leaflet GIS मैप व जोखिम श्रेणियां</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 size={16} className="text-[#287A50]" />
                  <span>विशेषज्ञ सत्यापन कतार (AI सुधार लूप)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 size={16} className="text-[#287A50]" />
                  <span>तहसील व फसल-लक्षित चेतावनी प्रसारण (SMS/App)</span>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <Link
                to="/officer/dashboard"
                className="inline-flex items-center space-x-2 bg-[#164B35] text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#287A50] transition-colors shadow-sm"
              >
                <span>अधिकारी पोर्टल खोलें</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#164B35] text-white border-t border-[#287A50]/40 mt-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/10 text-xs text-white/80">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-black text-xl text-white">CropGuardian</span>
              <span className="bg-emerald-700 text-emerald-200 text-[10px] px-2 py-0.5 rounded font-mono">
                SIH-26131
              </span>
            </div>
            <p className="text-emerald-100/90 leading-relaxed max-w-md">
              Detect Early. Predict Smarter. Act Faster.
              <br />
              फसल को बीमारी से बचाएं, समय रहते सही कदम उठाएं।
            </p>
            <p className="text-amber-300 font-semibold text-[11px]">
              टीम: क्रांतिकारी (KRANTIKARI) | Catalyst Hackathon / Smart India Hackathon
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">त्वरित लिंक</h4>
            <ul className="space-y-2">
              <li><Link to="/farmer/dashboard" className="hover:text-white">किसान पोर्टल (Farmer)</Link></li>
              <li><Link to="/officer/dashboard" className="hover:text-white">अधिकारी पोर्टल (Officer)</Link></li>
              <li><Link to="/farmer/scan" className="hover:text-white">फसल फोटो जांच (Scan)</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white">कार्यप्रणाली (How it Works)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">सत्यनिष्ठा व अस्वीकरण</h4>
            <p className="text-[11px] leading-relaxed text-emerald-200/80">
              यह प्रणाली स्मार्ट इंडिया हैकाथॉन (SIH) समस्या विवरण 26131 के अंतर्गत विकसित एक संकल्पनात्मक प्रोटोटाइप है। यह अधिकृत सरकारी प्रमाणीकरण का दावा नहीं करता है।
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60">
          <p>© 2026 CropGuardian Platform. Team KRANTIKARI. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed for Maharashtra Agriculture Department Initiative Concept.</p>
        </div>
      </footer>
    </div>
  );
};
