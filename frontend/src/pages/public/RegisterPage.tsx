import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { DemoBanner } from '../../components/common/DemoBanner';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../context/LanguageContext';
import { Sprout, MapPin, CheckCircle2, Navigation, AlertCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { updateFarmerProfile, login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Ramesh Patil (रमेश पाटील)',
    phone: '9822345678',
    state: 'Maharashtra',
    district: 'Akola',
    taluka: 'Akot',
    village: 'Kavtha Kadu',
    currentCrop: 'Tomato',
    cropVariety: 'Abhinav (Seminis)',
    growthStage: 'Flowering' as any,
    landAreaAcre: 3.5,
    locationConsent: true,
    latitude: 21.0975,
    longitude: 77.0583
  });

  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsMessage, setGpsMessage] = useState<string | null>(null);

  const handleGetLocation = () => {
    setGpsLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setFormData(prev => ({
            ...prev,
            latitude: Number(pos.coords.latitude.toFixed(4)),
            longitude: Number(pos.coords.longitude.toFixed(4)),
            locationConsent: true
          }));
          setGpsMessage("GPS स्थान सफलतापूर्वक दर्ज किया गया (Lat: " + pos.coords.latitude.toFixed(4) + ")");
          setGpsLoading(false);
        },
        err => {
          setGpsMessage("GPS अनुपलब्ध। डेमो स्थान अकोला (21.0975, 77.0583) का उपयोग किया जा रहा है।");
          setGpsLoading(false);
        },
        { timeout: 5000 }
      );
    } else {
      setGpsMessage("ब्राउज़र में GPS उपलब्ध नहीं है। डिफ़ॉल्ट जिला स्थान चुना गया।");
      setGpsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmerProfile(formData);
    login('farmer');
    navigate('/farmer/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col">
      <DemoBanner />
      <PublicNavbar />

      <main className="max-w-2xl mx-auto px-4 py-10 flex-1 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-[#DDE7DF] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#164B35] text-white flex items-center justify-center mx-auto shadow-sm">
              <Sprout size={28} className="text-emerald-300" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#164B35]">
              {t('profile_title')}
            </h1>
            <p className="text-xs text-[#5F6F65]">
              सटीक मौसम जोखिम और रोग पूर्व चेतावनी के लिए अपना विवरण भरें।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#202D25] mb-1">
                  {t('farmer_name')} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7DF] text-sm focus:outline-none focus:ring-2 focus:ring-[#287A50]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202D25] mb-1">
                  {t('phone_number')} *
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDE7DF] text-sm focus:outline-none focus:ring-2 focus:ring-[#287A50]"
                  required
                />
              </div>
            </div>

            {/* Geographical details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#202D25] mb-1">
                  {t('state')}
                </label>
                <select
                  value={formData.state}
                  onChange={e => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#DDE7DF] text-xs font-medium focus:ring-2 focus:ring-[#287A50]"
                >
                  <option value="Maharashtra">महाराष्ट्र (Maharashtra)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202D25] mb-1">
                  {t('district')} *
                </label>
                <select
                  value={formData.district}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#DDE7DF] text-xs font-medium focus:ring-2 focus:ring-[#287A50]"
                >
                  <option value="Akola">Akola (अकोला)</option>
                  <option value="Amravati">Amravati (अमरावती)</option>
                  <option value="Nagpur">Nagpur (नागपूर)</option>
                  <option value="Nashik">Nashik (नाशिक)</option>
                  <option value="Pune">Pune (पुणे)</option>
                  <option value="Jalgaon">Jalgaon (जळगाव)</option>
                  <option value="Solapur">Solapur (सोलापूर)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202D25] mb-1">
                  {t('taluka')} *
                </label>
                <input
                  type="text"
                  value={formData.taluka}
                  onChange={e => setFormData({ ...formData, taluka: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7DF] text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202D25] mb-1">
                  {t('village')} *
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={e => setFormData({ ...formData, village: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7DF] text-xs"
                  required
                />
              </div>
            </div>

            {/* Crop details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#202D25] mb-1">
                  {t('select_crop')} *
                </label>
                <select
                  value={formData.currentCrop}
                  onChange={e => setFormData({ ...formData, currentCrop: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#DDE7DF] text-xs font-medium focus:ring-2 focus:ring-[#287A50]"
                >
                  <option value="Tomato">टमाटर (Tomato)</option>
                  <option value="Cotton">कपास (Cotton)</option>
                  <option value="Soybean">सोयाबीन (Soybean)</option>
                  <option value="Onion">प्याज (Onion)</option>
                  <option value="Wheat">गेहूं (Wheat)</option>
                  <option value="Pomegranate">अनार (Pomegranate)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202D25] mb-1">
                  किस्म / वैरायटी (Optional)
                </label>
                <input
                  type="text"
                  value={formData.cropVariety}
                  onChange={e => setFormData({ ...formData, cropVariety: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7DF] text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202D25] mb-1">
                  {t('select_stage')} *
                </label>
                <select
                  value={formData.growthStage}
                  onChange={e => setFormData({ ...formData, growthStage: e.target.value as any })}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#DDE7DF] text-xs font-medium focus:ring-2 focus:ring-[#287A50]"
                >
                  <option value="Germination">अंकुरण (Germination)</option>
                  <option value="Vegetative">वानस्पतिक बढ़वार (Vegetative)</option>
                  <option value="Flowering">फूल आने की अवस्था (Flowering)</option>
                  <option value="Fruiting">फल/दाने लगना (Fruiting)</option>
                  <option value="Maturity">परिपक्वता (Maturity)</option>
                </select>
              </div>
            </div>

            {/* GPS Location permission consent */}
            <div className="bg-[#F8F7F0] p-4 rounded-2xl border border-[#DDE7DF] space-y-2">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.locationConsent}
                  onChange={e => setFormData({ ...formData, locationConsent: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-[#164B35] focus:ring-[#287A50]"
                />
                <label htmlFor="consent" className="text-xs text-[#202D25] leading-relaxed cursor-pointer">
                  <strong>{t('location_consent')}</strong>
                  <span className="block text-[11px] text-[#5F6F65] mt-0.5">
                    स्थान डेटा केवल स्थानीय मौसम और रोग जोखिम चेतावनी निकालने के लिए इस्तेमाल होगा। सटीक जीपीएस सार्वजनिक मानचित्र पर कभी नहीं दिखाया जाता।
                  </span>
                </label>
              </div>

              <div className="pt-1 flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={gpsLoading}
                  className="bg-white border border-[#287A50] text-[#164B35] px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-[#EAF4E9] flex items-center space-x-1.5 transition-colors"
                >
                  <Navigation size={13} className={gpsLoading ? "animate-spin" : ""} />
                  <span>{gpsLoading ? "स्थान प्राप्त कर रहे हैं..." : "जीपीएस लोकेशन लें (Auto-GPS)"}</span>
                </button>
                {formData.latitude && (
                  <span className="text-[11px] text-emerald-800 font-mono">
                    📍 {formData.latitude}, {formData.longitude}
                  </span>
                )}
              </div>
              {gpsMessage && (
                <p className="text-[11px] text-amber-800 font-medium">{gpsMessage}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#164B35] hover:bg-[#287A50] text-white font-bold py-3.5 rounded-2xl shadow-touch transition-all text-sm"
            >
              {t('save_profile_btn')} एवं पोर्टल खोलें
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
