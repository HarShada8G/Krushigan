import React from 'react';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { DemoBanner } from '../../components/common/DemoBanner';
import { 
  Camera, 
  Cpu, 
  CloudSun, 
  AlertOctagon, 
  ListChecks, 
  UserCheck, 
  RefreshCcw,
  ShieldCheck 
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      title: "1. DETECT (पहचान)",
      subtitle: "फोटो खींचना व लक्षण पृथक्करण",
      icon: Camera,
      desc: "किसान अपने साधारण स्मार्टफोन कैमरे से प्रभावित पत्ती, फल या तने की तस्वीर लेता है। इमेज प्री-प्रोसेसिंग मॉड्यूल परछाई व धुंधलापन हटाकर रोगग्रस्त हिस्से को अलग करता है।"
    },
    {
      title: "2. ASSESS (मूल्यांकन)",
      subtitle: "एआई डीप न्यूरल क्लासिफायर",
      icon: Cpu,
      desc: "MobileNetV3 व EfficientNet मॉडल्स पत्तियों के घाव (lesion), छल्लेदार धब्बे, मरोड़ या कीटों की उपस्थिति की पहचान करते हैं और गंभीरता का आकलन करते हैं।"
    },
    {
      title: "3. PREDICT (मौसम व प्रसार पूर्वानुमान)",
      subtitle: "माइक्रो-क्लाइमेट सहसंबंध",
      icon: CloudSun,
      desc: "स्थानीय तापमान, सापेक्ष आर्द्रता (Relative Humidity), और हवा की गति को मिलाकर बीजाणु अंकुरण व कीट प्रजनन की संभावना मापी जाती है।"
    },
    {
      title: "4. ADVISE (त्रि-स्तरीय सुरक्षित सलाह)",
      subtitle: "ग्रीन, येलो और रेड एक्शन प्लान",
      icon: ListChecks,
      desc: "हरा: सांस्कृतिक व खेत स्वच्छता के तत्काल कदम। पीला: प्रमाणित जैविक कीटनाशक व मित्र कीट संवर्धन। लाल: केवल अत्यधिक आवश्यकता पर प्रमाणित रासायनिक कीटनाशक व सुरक्षा सावधानियां।"
    },
    {
      title: "5. VALIDATE (विशेषज्ञ सत्यापन)",
      subtitle: "KVK वैज्ञानिक व कृषि अधिकारी समीक्षा",
      icon: UserCheck,
      desc: "जटिल अथवा असामान्य मामलों को जिला स्तर पर KVK (कृषि विज्ञान केंद्र) पैथोलॉजिस्ट को भेजा जाता है, जो निदान की पुष्टि या संशोधन करते हैं।"
    },
    {
      title: "6. MONITOR (जीआईएस हॉटस्पॉट निगरानी)",
      subtitle: "सामुदायिक स्तर पर संक्रमण नियंत्रण",
      icon: AlertOctagon,
      desc: "सत्यापित मामलों के आधार पर तहसील व गाँव स्तर पर Leaflet GIS हॉटस्पॉट बनते हैं। अधिकारी जोखिम वाले क्लस्टर में पंजीकृत किसानों को एसएमएस चेतावनी भेजते हैं।"
    },
    {
      title: "7. LEARN (कंटीन्यूअस लर्निंग लूप)",
      subtitle: "विशेषज्ञ-सत्यापित डेटासेट से मॉडल सुधार",
      icon: RefreshCcw,
      desc: "विशेषज्ञों द्वारा सुधारे गए मामलों को गुणवत्ता समीक्षा के बाद नए प्रशिक्षण डेटासेट में शामिल किया जाता है, जिससे एआई मॉडल लगातार और अधिक सटीक होता जाता है।"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col">
      <DemoBanner />
      <PublicNavbar />

      <main className="max-w-5xl mx-auto px-4 py-12 flex-1 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-[#287A50] bg-[#EAF4E9] px-3 py-1 rounded-full uppercase">
            अखंड कार्यप्रणाली (Pipeline)
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#164B35]">
            कृषिगण कैसे कार्य करता है?
          </h1>
          <p className="text-sm sm:text-base text-[#5F6F65] max-w-2xl mx-auto">
            DETECT → ASSESS → PREDICT → ADVISE → VALIDATE → MONITOR → LEARN
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-[#DDE7DF] flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 hover:shadow-soft transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#EAF4E9] text-[#164B35] flex items-center justify-center shrink-0">
                  <Icon size={26} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-lg text-[#164B35]">{st.title}</h3>
                    <span className="text-xs font-semibold bg-[#F8F7F0] text-[#5F6F65] px-2 py-0.5 rounded-full">
                      {st.subtitle}
                    </span>
                  </div>
                  <p className="text-sm text-[#5F6F65] leading-relaxed pt-1">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
