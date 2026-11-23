import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, Sprout, ArrowLeft, Check, Navigation } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import { FarmerHeader } from '../../components/layout/FarmerHeader';
import { FarmerBottomNav } from '../../components/layout/FarmerBottomNav';

export const FarmerProfilePage: React.FC = () => {
  const { t } = useLanguage();
  const { farmerProfile, updateFarmerProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(farmerProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmerProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
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
            {t('profile_btn')}
          </span>
        </div>

        {savedSuccess && (
          <div className="bg-[#329568] text-white p-3 rounded-2xl text-xs font-bold text-center animate-fadeIn">
            ✓ विवरण सफलतापूर्वक सहेज लिया गया!
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 shadow-card border border-[#DDE7DF] space-y-5">
          <div className="flex items-center space-x-3 pb-4 border-b border-[#DDE7DF]">
            <div className="w-14 h-14 rounded-2xl bg-[#164B35] text-white flex items-center justify-center font-bold text-2xl">
              👨‍🌾
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#164B35]">{formData.name}</h2>
              <span className="text-xs text-[#5F6F65]">
                {formData.village}, {formData.taluka}, {formData.district}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#202D25] mb-1">
                {t('farmer_name')}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7DF] text-xs font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202D25] mb-1">
                {t('phone_number')}
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7DF] text-xs font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#202D25] mb-1">
                  {t('district')}
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7DF] text-xs font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202D25] mb-1">
                  {t('taluka')}
                </label>
                <input
                  type="text"
                  value={formData.taluka}
                  onChange={e => setFormData({ ...formData, taluka: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7DF] text-xs font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202D25] mb-1">
                {t('village')}
              </label>
              <input
                type="text"
                value={formData.village}
                onChange={e => setFormData({ ...formData, village: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#DDE7DF] text-xs font-medium"
                required
              />
            </div>

            <div className="bg-[#F8F7F0] p-3 rounded-2xl border border-[#DDE7DF] text-xs space-y-1">
              <span className="font-bold text-[#164B35] block">
                स्थान निर्देशांक (GPS Coordinates):
              </span>
              <p className="text-[#5F6F65] font-mono text-[11px]">
                Latitude: {formData.latitude || '21.0975'}, Longitude: {formData.longitude || '77.0583'}
              </p>
              <p className="text-[10px] text-emerald-800">✓ मौसम एवं रोग पूर्वानुमान हेतु स्थान अनुमत</p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#164B35] hover:bg-[#287A50] text-white font-bold py-3.5 rounded-2xl shadow-touch transition-all text-xs"
            >
              {t('save_profile_btn')}
            </button>
          </form>
        </div>
      </main>

      <FarmerBottomNav />
    </div>
  );
};
