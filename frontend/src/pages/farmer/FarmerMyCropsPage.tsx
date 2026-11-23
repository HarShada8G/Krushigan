import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Edit3, Plus, Check, ArrowLeft, Calendar, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import { FarmerHeader } from '../../components/layout/FarmerHeader';
import { FarmerBottomNav } from '../../components/layout/FarmerBottomNav';

export const FarmerMyCropsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { farmerProfile, updateFarmerProfile } = useAuth();
  const navigate = useNavigate();

  const [cropsList, setCropsList] = useState([
    {
      id: "crop_1",
      name: farmerProfile.currentCrop || "Tomato",
      variety: farmerProfile.cropVariety || "Abhinav (Seminis)",
      stage: farmerProfile.growthStage || "Flowering",
      areaAcre: farmerProfile.landAreaAcre || 3.5,
      isPrimary: true
    },
    {
      id: "crop_2",
      name: "Cotton",
      variety: "Ajeet 155 BG-II",
      stage: "Vegetative",
      areaAcre: 2.0,
      isPrimary: false
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(cropsList[0]);

  const growthStages = [
    { key: "Germination", hi: "अंकुरण", mr: "उगवण" },
    { key: "Vegetative", hi: "वानस्पतिक बढ़वार", mr: "शाकीय वाढ" },
    { key: "Flowering", hi: "फूल आने की अवस्था", mr: "फुलोरा अवस्था" },
    { key: "Fruiting", hi: "फल/दाने लगना", mr: "फळ धारणा" },
    { key: "Maturity", hi: "परिपक्वता व काढणी", mr: "पक्वता" }
  ];

  const handleStageChange = (newStage: string) => {
    updateFarmerProfile({ growthStage: newStage as any });
    setCropsList(prev =>
      prev.map(c => (c.id === selectedCrop.id ? { ...c, stage: newStage as any } : c))
    );
  };

  const handleSetPrimary = (cropItem: typeof cropsList[0]) => {
    updateFarmerProfile({
      currentCrop: cropItem.name,
      cropVariety: cropItem.variety,
      growthStage: cropItem.stage as any
    });
    setCropsList(prev =>
      prev.map(c => ({ ...c, isPrimary: c.id === cropItem.id }))
    );
    setSelectedCrop(cropItem);
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
            {t('my_crops_btn')}
          </span>
        </div>

        {/* Current Active Crop Header */}
        <div className="bg-white rounded-3xl p-5 shadow-card border border-[#DDE7DF] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#287A50] bg-[#EAF4E9] px-2.5 py-0.5 rounded-full">
              मुख्य सक्रिय फसल (Active Crop)
            </span>
            <span className="text-xs font-bold text-[#5F6F65]">
              रकबा: {farmerProfile.landAreaAcre || 3.5} एकड़
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#164B35] text-white flex items-center justify-center font-bold text-xl">
              🌱
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#164B35]">
                {farmerProfile.currentCrop}
              </h2>
              <span className="text-xs text-[#5F6F65]">
                किस्म: {farmerProfile.cropVariety || 'Abhinav'}
              </span>
            </div>
          </div>

          {/* Growth Stage Selector */}
          <div className="pt-2 border-t border-[#DDE7DF]">
            <label className="block text-xs font-bold text-[#202D25] mb-2">
              वर्तमान फसल अवस्था (Change Growth Stage):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {growthStages.map(stage => {
                const isSelected = farmerProfile.growthStage === stage.key;
                return (
                  <button
                    key={stage.key}
                    type="button"
                    onClick={() => handleStageChange(stage.key)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                      isSelected
                        ? 'bg-[#164B35] text-white shadow-sm'
                        : 'bg-[#F8F7F0] text-[#202D25] hover:bg-emerald-50 border border-[#DDE7DF]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{language === 'mr' ? stage.mr : stage.hi}</span>
                      {isSelected && <Check size={14} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Registered Crops List */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-[#164B35]">
            पंजीकृत फसलों की सूची ({cropsList.length})
          </h3>

          {cropsList.map(crop => (
            <div
              key={crop.id}
              className={`bg-white rounded-2xl p-4 border transition-all flex items-center justify-between ${
                crop.isPrimary
                  ? 'border-[#287A50] shadow-sm ring-1 ring-[#287A50]'
                  : 'border-[#DDE7DF]'
              }`}
            >
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-extrabold text-base text-[#164B35]">{crop.name}</h4>
                  {crop.isPrimary && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      सक्रिय
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#5F6F65] mt-0.5">
                  किस्म: {crop.variety} • अवस्था: {crop.stage}
                </p>
              </div>

              {!crop.isPrimary && (
                <button
                  type="button"
                  onClick={() => handleSetPrimary(crop)}
                  className="bg-[#EAF4E9] hover:bg-emerald-100 text-[#164B35] px-3 py-1.5 rounded-xl text-xs font-bold transition-colors"
                >
                  सक्रिय करें
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      <FarmerBottomNav />
    </div>
  );
};
