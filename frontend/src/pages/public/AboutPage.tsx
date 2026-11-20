import React from 'react';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { DemoBanner } from '../../components/common/DemoBanner';
import { ShieldCheck, Award, HeartHandshake, Sparkles, Sprout } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col">
      <DemoBanner />
      <PublicNavbar />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#EAF4E9] text-[#164B35] px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles size={14} />
            <span>Problem Statement ID: 26131</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#164B35]">
            हमारे बारे में (About CropGuardian)
          </h1>
          <p className="text-sm sm:text-base text-[#5F6F65] max-w-2xl mx-auto">
            अर्ली डिटेक्शन, वेदर रिस्क प्रेडिक्शन और प्रमाणित त्रि-स्तरीय कृषि सलाह का संगम।
          </p>
        </div>

        {/* Hackathon Credentials Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-[#DDE7DF] space-y-4">
          <h2 className="text-xl font-bold text-[#164B35] flex items-center space-x-2">
            <Award className="text-[#287A50]" />
            <span>प्रोजेक्ट एवं हैकाथॉन विवरण (Project Credentials)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-[#F8F7F0] p-4 rounded-2xl">
              <span className="text-[#5F6F65] block font-medium">टीम का नाम:</span>
              <span className="font-extrabold text-[#164B35] text-base">क्रांतिकारी (KRANTIKARI)</span>
            </div>
            <div className="bg-[#F8F7F0] p-4 rounded-2xl">
              <span className="text-[#5F6F65] block font-medium">हैकाथॉन:</span>
              <span className="font-extrabold text-[#164B35] text-base">Catalyst Hackathon / Smart India Hackathon</span>
            </div>
            <div className="bg-[#F8F7F0] p-4 rounded-2xl">
              <span className="text-[#5F6F65] block font-medium">समस्या विवरण सं. (Problem ID):</span>
              <span className="font-bold text-[#164B35]">26131</span>
            </div>
            <div className="bg-[#F8F7F0] p-4 rounded-2xl">
              <span className="text-[#5F6F65] block font-medium">लक्षित संगठन:</span>
              <span className="font-bold text-[#164B35]">महाराष्ट्र शासन (Government of Maharashtra Concept)</span>
            </div>
          </div>
          <p className="text-xs text-[#5F6F65] leading-relaxed pt-2">
            <strong>मूल उद्देश्य:</strong> फसलों में कीट और फफूंद जनित रोगों की शुरुआती अवस्था में ही पहचान करना ताकि किसान को समय रहते जैविक व प्रमाणित वैज्ञानिक उपचार मिल सके, अनावश्यक कीटनाशकों का प्रयोग कम हो और फसल क्षति को न्यूनतम किया जा सके।
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#DDE7DF] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#164B35] flex items-center justify-center font-bold mb-3">
              1
            </div>
            <h3 className="font-bold text-base text-[#164B35] mb-2">किसान के लिए परम सरलता</h3>
            <p className="text-xs text-[#5F6F65]">
              पीछे जटिल डीप लर्निंग और जीआईएस हो, लेकिन किसान के हाथ में 5 सेकंड में समझ आने वाला स्क्रीन।
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#DDE7DF] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#164B35] flex items-center justify-center font-bold mb-3">
              2
            </div>
            <h3 className="font-bold text-base text-[#164B35] mb-2">सत्यनिष्ठ वैज्ञानिक सलाह</h3>
            <p className="text-xs text-[#5F6F65]">
              कोई मनगढ़ंत कीटनाशक डोज नहीं। केवल ICAR व महाराष्ट्र कृषि विश्वविद्यालयों द्वारा अनुमोदित सुरक्षित उपचार।
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#DDE7DF] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#164B35] flex items-center justify-center font-bold mb-3">
              3
            </div>
            <h3 className="font-bold text-base text-[#164B35] mb-2">ऑफ़लाइन उपलब्धता</h3>
            <p className="text-xs text-[#5F6F65]">
              कमजोर नेटवर्क वाले सुदूर गाँवों में भी लोकल कैश्ड गाइड्स और ऑफ़लाइन रिपोर्ट कतार की सुविधा।
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
