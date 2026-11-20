import React from 'react';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { DemoBanner } from '../../components/common/DemoBanner';
import { ShieldCheck, Award, HeartHandshake, Sparkles, Sprout, Leaf, Users, Globe2, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col">
      <DemoBanner />
      <PublicNavbar />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#EAF4E9] text-[#164B35] px-3 py-1 rounded-full text-xs font-bold">
            <Leaf size={14} />
            <span>कृषिगण — हर किसान की ताकत</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#164B35]">
            हमारे बारे में — About Krushigan
          </h1>
          <p className="text-sm sm:text-base text-[#5F6F65] max-w-2xl mx-auto">
            अर्ली डिटेक्शन, वेदर रिस्क प्रेडिक्शन और प्रमाणित त्रि-स्तरीय कृषि सलाह का संगम।
            <br />
            <span className="text-xs text-[#287A50] font-medium">Early Detection · Weather Risk · Certified Guidance</span>
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DDE7DF] space-y-4">
          <h2 className="text-xl font-bold text-[#164B35] flex items-center space-x-2">
            <Sprout className="text-[#287A50]" />
            <span>हमारा मिशन (Our Mission)</span>
          </h2>
          <p className="text-sm text-[#5F6F65] leading-relaxed">
            <strong className="text-[#202D25]">कृषिगण</strong> एक AI-संचालित कृषि स्वास्थ्य प्लेटफ़ॉर्म है जो भारत के किसानों को फसल रोगों की 
            शुरुआती पहचान, कीट नियंत्रण और मौसम-आधारित जोखिम चेतावनी के माध्यम से सशक्त बनाता है।
          </p>
          <p className="text-sm text-[#5F6F65] leading-relaxed">
            <strong>Krushigan</strong> is an AI-powered agricultural health platform empowering Indian farmers with early 
            crop disease detection, pest identification, and weather-based risk warnings — delivered in simple, 
            local-language guidance they can trust and act on immediately.
          </p>
          <div className="bg-[#EAF4E9] rounded-2xl p-4">
            <p className="text-xs text-[#164B35] font-medium leading-relaxed">
              <strong>मूल उद्देश्य:</strong> फसलों में कीट और फफूंद जनित रोगों की शुरुआती अवस्था में ही पहचान करना 
              ताकि किसान को समय रहते जैविक व प्रमाणित वैज्ञानिक उपचार मिल सके, अनावश्यक कीटनाशकों का प्रयोग 
              कम हो और फसल क्षति को न्यूनतम किया जा सके।
            </p>
          </div>
        </div>

        {/* Platform Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DDE7DF] space-y-4">
          <h2 className="text-xl font-bold text-[#164B35] flex items-center space-x-2">
            <Award className="text-[#287A50]" />
            <span>प्लेटफ़ॉर्म की जानकारी (Platform Details)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-[#F8F7F0] p-4 rounded-2xl">
              <span className="text-[#5F6F65] block font-medium">प्लेटफ़ॉर्म का नाम:</span>
              <span className="font-extrabold text-[#164B35] text-base">Krushigan (कृषिगण)</span>
            </div>
            <div className="bg-[#F8F7F0] p-4 rounded-2xl">
              <span className="text-[#5F6F65] block font-medium">उद्देश्य:</span>
              <span className="font-bold text-[#164B35]">फसल रोग की शीघ्र पहचान व प्रबंधन</span>
            </div>
            <div className="bg-[#F8F7F0] p-4 rounded-2xl">
              <span className="text-[#5F6F65] block font-medium">कवरेज क्षेत्र:</span>
              <span className="font-bold text-[#164B35]">महाराष्ट्र, भारत (विस्तार-योग्य)</span>
            </div>
            <div className="bg-[#F8F7F0] p-4 rounded-2xl">
              <span className="text-[#5F6F65] block font-medium">वैज्ञानिक संदर्भ:</span>
              <span className="font-bold text-[#164B35]">ICAR · MPKV · KVK नेटवर्क</span>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div>
          <h2 className="text-xl font-bold text-[#164B35] mb-5 text-center">हमारे मूल सिद्धांत (Core Principles)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#DDE7DF] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#164B35] flex items-center justify-center font-bold mb-3">
                <Users size={20} />
              </div>
              <h3 className="font-bold text-base text-[#164B35] mb-2">किसान के लिए परम सरलता</h3>
              <p className="text-xs text-[#5F6F65]">
                पीछे जटिल डीप लर्निंग और जीआईएस हो, लेकिन किसान के हाथ में 5 सेकंड में समझ आने वाला स्क्रीन।
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#DDE7DF] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#164B35] flex items-center justify-center font-bold mb-3">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-base text-[#164B35] mb-2">सत्यनिष्ठ वैज्ञानिक सलाह</h3>
              <p className="text-xs text-[#5F6F65]">
                कोई मनगढ़ंत कीटनाशक डोज नहीं। केवल ICAR व महाराष्ट्र कृषि विश्वविद्यालयों द्वारा अनुमोदित सुरक्षित उपचार।
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#DDE7DF] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#164B35] flex items-center justify-center font-bold mb-3">
                <Globe2 size={20} />
              </div>
              <h3 className="font-bold text-base text-[#164B35] mb-2">ऑफ़लाइन उपलब्धता</h3>
              <p className="text-xs text-[#5F6F65]">
                कमजोर नेटवर्क वाले सुदूर गाँवों में भी लोकल कैश्ड गाइड्स और ऑफ़लाइन रिपोर्ट कतार की सुविधा।
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DDE7DF]">
          <h2 className="text-xl font-bold text-[#164B35] mb-4 flex items-center space-x-2">
            <Zap className="text-[#287A50]" />
            <span>तकनीक (Technology)</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            {[
              { label: 'AI Engine', value: 'PyTorch · EfficientNet' },
              { label: 'Pest Detection', value: 'YOLO v8' },
              { label: 'Maps & GIS', value: 'Leaflet · OpenStreetMap' },
              { label: 'Languages', value: 'हिंदी · मराठी · English' },
              { label: 'Frontend', value: 'React · TypeScript · Vite' },
              { label: 'Backend', value: 'FastAPI · Python' },
              { label: 'Database', value: 'PostgreSQL · PostGIS' },
              { label: 'Offline', value: 'IndexedDB · Service Worker' },
            ].map(item => (
              <div key={item.label} className="bg-[#F8F7F0] rounded-2xl p-3">
                <div className="text-[#5F6F65] mb-1">{item.label}</div>
                <div className="font-bold text-[#164B35]">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="bg-[#164B35] rounded-3xl p-6 sm:p-8 text-white text-center space-y-3">
          <HeartHandshake size={36} className="mx-auto text-[#EAF4E9] opacity-80" />
          <h2 className="text-xl font-bold">हर किसान की ताकत — कृषिगण</h2>
          <p className="text-sm text-[#A8C8B4] max-w-xl mx-auto leading-relaxed">
            We believe every farmer deserves access to the same quality of agricultural intelligence 
            that large commercial farms have — in their own language, on their own phone, 
            even without internet connectivity.
          </p>
          <p className="text-sm text-[#A8C8B4]">
            "Detect Early. Predict Smarter. Act Faster."
          </p>
        </div>
      </main>
    </div>
  );
};
