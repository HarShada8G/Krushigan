import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  Trash2, 
  Check, 
  AlertCircle, 
  Sparkles, 
  ArrowLeft,
  Info
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useOffline } from '../../context/OfflineContext';
import { analyzeCropPhoto, saveCropReport } from '../../services/api';
import { CropReport } from '../../types';
import { FarmerHeader } from '../../components/layout/FarmerHeader';
import { FarmerBottomNav } from '../../components/layout/FarmerBottomNav';

// Sample demonstration leaf images so judges can test instantly even without camera access!
const SAMPLE_DEMO_LEAVES = [
  {
    label: "टमाटर (अर्ली ब्लाइट)",
    crop: "Tomato",
    url: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "कपास (माहू / कीट)",
    crop: "Cotton",
    url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "प्याज (बैंगनी धब्बा)",
    crop: "Onion",
    url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80"
  }
];

export const FarmerScanPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { farmerProfile } = useAuth();
  const { isOnline, queueReport } = useOffline();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>(farmerProfile.currentCrop || 'Tomato');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const analysisStages = [
    t('analyzing_step_1'),
    t('analyzing_step_2'),
    t('analyzing_step_3'),
    t('analyzing_step_4')
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (leaf: typeof SAMPLE_DEMO_LEAVES[0]) => {
    setSelectedImage(leaf.url);
    setSelectedCrop(leaf.crop);
  };

  const handleStartAnalysis = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setCurrentStageIndex(0);

    // Realistic step-by-step progress animation
    const stageTimer1 = setTimeout(() => setCurrentStageIndex(1), 700);
    const stageTimer2 = setTimeout(() => setCurrentStageIndex(2), 1400);
    const stageTimer3 = setTimeout(() => setCurrentStageIndex(3), 2100);

    try {
      const diagnosis = await analyzeCropPhoto(
        selectedImage,
        selectedCrop,
        farmerProfile.growthStage || 'Flowering'
      );

      // Create new report object
      const newReport: CropReport = {
        id: `REP-${Date.now()}`,
        farmerId: farmerProfile.id,
        farmerName: farmerProfile.name,
        phone: farmerProfile.phone,
        district: farmerProfile.district,
        taluka: farmerProfile.taluka,
        village: farmerProfile.village,
        crop: selectedCrop,
        variety: farmerProfile.cropVariety || 'Abhinav',
        growthStage: farmerProfile.growthStage || 'Flowering',
        imageUrl: selectedImage,
        timestamp: new Date().toLocaleString(),
        status: 'ai_analyzed',
        diagnosis: diagnosis
      };

      // Check online / offline behavior
      if (isOnline) {
        await saveCropReport(newReport);
      } else {
        // Queue offline
        queueReport(newReport);
      }

      setTimeout(() => {
        setIsAnalyzing(false);
        // Navigate to result screen with report data
        navigate('/farmer/result', { state: { report: newReport } });
      }, 2800);
    } catch (e) {
      console.error('Diagnosis error:', e);
      setIsAnalyzing(false);
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
            {t('scan_title')}
          </span>
        </div>

        {/* Guideline Banner */}
        <div className="bg-[#EAF4E9] text-[#164B35] p-4 rounded-3xl border border-[#287A50]/20 flex items-start space-x-3">
          <Info size={20} className="text-[#287A50] shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <p className="font-bold">{t('scan_guideline')}</p>
            <div className="text-[11px] text-[#5F6F65] mt-1 space-y-0.5">
              <p>• {t('scan_tip_1')}</p>
              <p>• {t('scan_tip_2')}</p>
            </div>
          </div>
        </div>

        {/* Selected Crop Pill */}
        <div className="bg-white p-3 rounded-2xl border border-[#DDE7DF] flex items-center justify-between text-xs">
          <span className="font-bold text-[#202D25]">{t('select_crop')}:</span>
          <select
            value={selectedCrop}
            onChange={e => setSelectedCrop(e.target.value)}
            className="font-bold text-[#164B35] bg-[#F8F7F0] px-3 py-1 rounded-xl border border-[#DDE7DF] focus:outline-none"
          >
            <option value="Tomato">टमाटर (Tomato)</option>
            <option value="Cotton">कपास (Cotton)</option>
            <option value="Soybean">सोयाबीन (Soybean)</option>
            <option value="Onion">प्याज (Onion)</option>
          </select>
        </div>

        {/* Main Photo Viewfinder / Preview Box */}
        <div className="bg-white rounded-3xl p-4 shadow-card border border-[#DDE7DF] space-y-4">
          {selectedImage ? (
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/5 border-2 border-[#164B35]/20">
                <img
                  src={selectedImage}
                  alt="Crop preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition-colors"
                  title={t('remove_photo')}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Action buttons after photo is ready */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-[#F8F7F0] hover:bg-gray-100 text-[#202D25] py-2.5 rounded-xl font-bold text-xs border border-[#DDE7DF] transition-colors"
                >
                  {t('retake_btn')}
                </button>
                <button
                  type="button"
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  className="flex-2 w-full bg-[#164B35] hover:bg-[#287A50] text-white py-3.5 rounded-xl font-black text-sm shadow-touch transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles size={18} className="text-emerald-300" />
                  <span>{t('submit_analysis_btn')}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Photo Input Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="aspect-[4/3] rounded-2xl border-2 border-dashed border-[#287A50]/40 bg-[#F8F7F0] hover:bg-[#EAF4E9]/40 flex flex-col items-center justify-center p-6 cursor-pointer transition-colors text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#164B35] text-white flex items-center justify-center mb-3 shadow-md">
                  <Camera size={30} className="text-emerald-300" />
                </div>
                <h4 className="font-extrabold text-[#164B35] text-base mb-1">
                  कैमरा खोलें या गैलरी से फोटो चुनें
                </h4>
                <p className="text-xs text-[#5F6F65] max-w-xs">
                  प्रभावित पत्ती, तने या फल की साफ फोटो अपलोड करें
                </p>
              </div>

              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Quick Sample Selector for Demo Testing */}
              <div className="pt-2 border-t border-[#DDE7DF]">
                <p className="text-xs font-bold text-[#5F6F65] mb-2 flex items-center space-x-1">
                  <Sparkles size={13} className="text-amber-500" />
                  <span>परीक्षण हेतु नमूना पत्ती चुनें (Sample Leaves for Instant Demo):</span>
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {SAMPLE_DEMO_LEAVES.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSample(sample)}
                      className="bg-[#F8F7F0] hover:bg-emerald-50 border border-[#DDE7DF] rounded-xl p-1.5 text-center transition-all group"
                    >
                      <img
                        src={sample.url}
                        alt={sample.label}
                        className="w-full h-14 object-cover rounded-lg mb-1"
                      />
                      <span className="text-[10px] font-bold text-[#164B35] line-clamp-1">
                        {sample.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Full-Screen Analysis Animation Modal */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white text-center animate-fadeIn">
          <div className="w-20 h-20 rounded-3xl bg-[#164B35] border-2 border-emerald-400 flex items-center justify-center mb-6 shadow-2xl relative">
            <RefreshCw size={36} className="text-emerald-300 animate-spin" />
            <span className="absolute -bottom-2 bg-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded-full text-black">
              AI MODEL
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black mb-3">
            फसल स्वास्थ्य का एआई विश्लेषण
          </h3>
          <p className="text-xs text-emerald-200 mb-8 max-w-xs">
            MobileNetV3 + स्थानीय मौसम रिस्क इंजन द्वारा जांच की जा रही है
          </p>

          {/* Animated 4-Stage Stepper */}
          <div className="w-full max-w-sm space-y-3 text-left">
            {analysisStages.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div
                  key={idx}
                  className={`flex items-center space-x-3 p-3 rounded-2xl transition-all ${
                    isCurrent
                      ? 'bg-white/20 border border-emerald-400 font-bold text-white'
                      : isPast
                      ? 'bg-white/10 text-emerald-300'
                      : 'text-white/40'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isPast
                        ? 'bg-emerald-500 text-black'
                        : isCurrent
                        ? 'bg-amber-400 text-black animate-pulse'
                        : 'bg-white/20'
                    }`}
                  >
                    {isPast ? <Check size={14} /> : idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm">{stage}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <FarmerBottomNav />
    </div>
  );
};
