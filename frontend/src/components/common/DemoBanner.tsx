import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DemoBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#164B35] text-white px-3 py-1.5 text-xs sm:text-sm font-medium flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-2 truncate">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-semibold text-emerald-200 uppercase tracking-wider text-[11px]">
          KRUSHIGAN PLATFORM
        </span>
        <span className="hidden md:inline text-white/80">|</span>
        <span className="truncate text-white/90">
          {t('team_tag')}
        </span>
      </div>
      <div className="flex items-center space-x-2 text-[11px] bg-white/10 px-2 py-0.5 rounded border border-white/20 shrink-0">
        <AlertCircle size={13} className="text-amber-300" />
        <span className="text-amber-200">{t('demo_badge')}</span>
      </div>
    </div>
  );
};
