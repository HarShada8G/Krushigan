import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  FileSpreadsheet, 
  CheckCheck, 
  Users, 
  Radio, 
  BarChart3, 
  Cpu,
  Layers
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const OfficerSidebar: React.FC = () => {
  const { t, language } = useLanguage();

  const menuItems = [
    {
      to: "/officer/dashboard",
      icon: LayoutDashboard,
      labelHi: "कमांड डैशबोर्ड",
      labelMr: "कमांड डॅशबोर्ड",
      labelEn: "Command Overview"
    },
    {
      to: "/officer/map",
      icon: Map,
      labelHi: "राष्ट्रीय GIS हॉटस्पॉट",
      labelMr: "राष्ट्रीय GIS हॉटस्पॉट",
      labelEn: "National GIS Map"
    },
    {
      to: "/officer/reports",
      icon: FileSpreadsheet,
      labelHi: "रोग व कीट रिपोर्ट्स",
      labelMr: "रोग व कीड अहवाल",
      labelEn: "Field Reports Registry"
    },
    {
      to: "/officer/validation",
      icon: CheckCheck,
      labelHi: "विशेषज्ञ सत्यापन कतार",
      labelMr: "तज्ज्ञ पडताळणी रांग",
      labelEn: "Expert Validation"
    },
    {
      to: "/officer/farmers",
      icon: Users,
      labelHi: "पंजीकृत किसान",
      labelMr: "नोंदणीकृत शेतकरी",
      labelEn: "Farmer Management"
    },
    {
      to: "/officer/alerts",
      icon: Radio,
      labelHi: "अलर्ट प्रसारण (SMS/App)",
      labelMr: "इशारा प्रसारण (SMS/App)",
      labelEn: "Broadcast Alerts"
    },
    {
      to: "/officer/analytics",
      icon: BarChart3,
      labelHi: "एपिडेमियोलॉजी एनालिटिक्स",
      labelMr: "रोग विश्लेषिकी",
      labelEn: "Epidemic Analytics"
    }
  ];

  const getLabel = (item: typeof menuItems[0]) => {
    if (language === 'mr') return item.labelMr;
    if (language === 'en') return item.labelEn;
    return item.labelHi;
  };

  return (
    <aside className="w-64 bg-white border-r border-[#DDE7DF] flex flex-col shrink-0 min-h-[calc(100vh-57px)]">
      <div className="p-4 border-b border-[#DDE7DF]/60 bg-[#F8F7F0]/60 flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#5F6F65]">
          {language === 'mr' ? 'नियंत्रण कक्ष विभाग' : language === 'en' ? 'COMMAND SECTIONS' : 'निगरानी विभाग'}
        </span>
        <NavLink to="/" className="text-xs text-[#287A50] hover:text-[#164B35] font-semibold" title="मुख्य पृष्ठ (Home)">
          ← होम
        </NavLink>
      </div>

      <nav className="p-3 space-y-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#164B35] text-white shadow-sm'
                    : 'text-[#202D25] hover:bg-[#EAF4E9] hover:text-[#164B35]'
                }`
              }
            >
              <Icon size={18} />
              <span>{getLabel(item)}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Model Version Status Footer */}
      <div className="p-4 m-3 bg-[#EAF4E9] rounded-2xl border border-[#287A50]/20 text-xs">
        <div className="flex items-center space-x-2 text-[#164B35] font-bold mb-1">
          <Cpu size={14} className="text-[#287A50]" />
          <span>एआई मॉडल स्थिति</span>
        </div>
        <p className="text-[11px] text-[#5F6F65]">
          Active: <span className="font-mono font-medium text-[#164B35]">MobileNetV3-v1.4</span>
        </p>
        <p className="text-[11px] text-[#5F6F65]">
          Accuracy: <span className="font-semibold text-emerald-700">91.8%</span>
        </p>
      </div>
    </aside>
  );
};
