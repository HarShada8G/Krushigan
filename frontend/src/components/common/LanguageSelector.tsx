import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../types';

interface LanguageSelectorProps {
  variant?: 'light' | 'dark' | 'simple';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'light' }) => {
  const { language, setLanguage } = useLanguage();

  const isDark = variant === 'dark';

  return (
    <div className="flex items-center space-x-1.5 bg-black/5 dark:bg-white/10 rounded-full p-1 border border-black/10">
      <Globe size={16} className={isDark ? "text-emerald-400 ml-1.5" : "text-[#164B35] ml-1.5"} />
      <div className="flex rounded-full overflow-hidden text-xs font-semibold">
        <button
          type="button"
          onClick={() => setLanguage('hi')}
          className={`px-2.5 py-1 transition-colors ${
            language === 'hi'
              ? 'bg-[#164B35] text-white shadow-sm'
              : isDark
              ? 'text-white/80 hover:text-white'
              : 'text-[#202D25] hover:bg-black/5'
          }`}
          title="हिन्दी"
        >
          हिन्दी
        </button>
        <button
          type="button"
          onClick={() => setLanguage('mr')}
          className={`px-2.5 py-1 transition-colors ${
            language === 'mr'
              ? 'bg-[#164B35] text-white shadow-sm'
              : isDark
              ? 'text-white/80 hover:text-white'
              : 'text-[#202D25] hover:bg-black/5'
          }`}
          title="मराठी"
        >
          मराठी
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2.5 py-1 transition-colors ${
            language === 'en'
              ? 'bg-[#164B35] text-white shadow-sm'
              : isDark
              ? 'text-white/80 hover:text-white'
              : 'text-[#202D25] hover:bg-black/5'
          }`}
          title="English"
        >
          EN
        </button>
      </div>
    </div>
  );
};
