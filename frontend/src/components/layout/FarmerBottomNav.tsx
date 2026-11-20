import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Camera, FileText, Bell, History } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FarmerBottomNav: React.FC = () => {
  const { t, language } = useLanguage();

  const labels = {
    home: language === 'mr' ? 'मुख्य' : language === 'en' ? 'Home' : 'होम',
    crops: language === 'mr' ? 'माझे पीक' : language === 'en' ? 'Crops' : 'मेरी फसल',
    scan: language === 'mr' ? 'फोटो घ्या' : language === 'en' ? 'Scan' : 'फोटो लें',
    advisory: language === 'mr' ? 'सल्ला' : language === 'en' ? 'Advisory' : 'सलाह',
    history: language === 'mr' ? 'इतिहास' : language === 'en' ? 'History' : 'रिपोर्ट्स',
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#DDE7DF] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] py-1.5 px-3">
      <div className="max-w-xl mx-auto flex items-center justify-around relative">
        {/* Home */}
        <NavLink
          to="/farmer/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2 min-w-[56px] text-[11px] font-medium transition-colors ${
              isActive ? 'text-[#164B35] font-bold' : 'text-[#5F6F65] hover:text-[#164B35]'
            }`
          }
        >
          <Home size={20} className="mb-0.5" />
          <span>{labels.home}</span>
        </NavLink>

        {/* My Crops */}
        <NavLink
          to="/farmer/my-crops"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2 min-w-[56px] text-[11px] font-medium transition-colors ${
              isActive ? 'text-[#164B35] font-bold' : 'text-[#5F6F65] hover:text-[#164B35]'
            }`
          }
        >
          <FileText size={20} className="mb-0.5" />
          <span>{labels.crops}</span>
        </NavLink>

        {/* Prominent Center Camera Button */}
        <div className="relative -top-4">
          <NavLink
            to="/farmer/scan"
            className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-[#164B35] hover:bg-[#287A50] text-white shadow-touch transition-transform active:scale-95 border-4 border-[#F8F7F0]"
            title={t('take_photo_btn')}
          >
            <Camera size={26} className="text-emerald-300" />
          </NavLink>
          <span className="block text-center text-[10px] font-bold text-[#164B35] mt-0.5">
            {labels.scan}
          </span>
        </div>

        {/* Advisory */}
        <NavLink
          to="/farmer/advisory"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2 min-w-[56px] text-[11px] font-medium transition-colors ${
              isActive ? 'text-[#164B35] font-bold' : 'text-[#5F6F65] hover:text-[#164B35]'
            }`
          }
        >
          <Bell size={20} className="mb-0.5" />
          <span>{labels.advisory}</span>
        </NavLink>

        {/* History */}
        <NavLink
          to="/farmer/history"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2 min-w-[56px] text-[11px] font-medium transition-colors ${
              isActive ? 'text-[#164B35] font-bold' : 'text-[#5F6F65] hover:text-[#164B35]'
            }`
          }
        >
          <History size={20} className="mb-0.5" />
          <span>{labels.history}</span>
        </NavLink>
      </div>
    </nav>
  );
};
