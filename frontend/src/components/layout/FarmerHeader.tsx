import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Mic, ArrowLeftRight, User, LogOut, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import { LanguageSelector } from '../common/LanguageSelector';
import { VoiceAssistantModal } from '../common/VoiceAssistantModal';

export const FarmerHeader: React.FC = () => {
  const { t } = useLanguage();
  const { farmerProfile, switchRole, logout, isAuthenticated } = useAuth();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="bg-[#164B35] text-white px-4 py-3 shadow-md sticky top-0 z-30 border-b border-[#287A50]/30">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          {/* Logo / App Name */}
          <Link to="/farmer/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#287A50] flex items-center justify-center text-white shadow-sm">
              <Sprout size={20} className="text-emerald-300" />
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight leading-tight">Krushigan</h1>
              <span className="text-[10px] text-emerald-200 block">
                {t('farmer_portal')}
              </span>
            </div>
          </Link>

          {/* Controls: Voice & Language & Profile & Logout & Switcher */}
          <div className="flex items-center space-x-2">
            {/* Home Link */}
            <Link
              to="/"
              className="bg-white/10 hover:bg-white/20 text-white/90 p-2 rounded-full border border-white/15 transition-all"
              title="मुख्य पृष्ठ (Home)"
            >
              <Home size={16} className="text-emerald-300" />
            </Link>

            {/* Voice Assistant Shortcut */}
            <button
              onClick={() => setIsVoiceOpen(true)}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 p-2 rounded-full border border-emerald-400/30 transition-all hover:scale-105"
              title={t('voice_assist_btn')}
            >
              <Mic size={18} className="text-emerald-300" />
            </button>

            {/* Language Selector */}
            <LanguageSelector variant="dark" />

            {/* Quick Officer View Switch */}
            <Link
              to="/officer/dashboard"
              className="bg-white/10 hover:bg-white/20 text-white/90 p-1.5 rounded-lg text-xs flex items-center space-x-1"
              title="अधिकारी पोर्टल (Officer View)"
            >
              <ArrowLeftRight size={14} className="text-amber-300" />
              <span className="hidden sm:inline text-[11px] font-medium">अधिकारी</span>
            </Link>

            {/* Profile Navigation - Accessible to all farmers & guests */}
            <Link
              to="/farmer/profile"
              className="bg-white/10 hover:bg-white/20 text-white/90 p-2 rounded-full border border-white/15 transition-all"
              title={t('profile_title') || 'प्रोफाइल व स्थान (Profile & Location)'}
            >
              <User size={16} className="text-emerald-300" />
            </Link>

            {/* Logout Button (if authenticated) */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="bg-red-600/80 hover:bg-red-700 text-white p-1.5 rounded-lg text-xs flex items-center space-x-1 transition-all"
                title="लॉगआउट (Logout)"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </div>
      </header>

      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />
    </>
  );
};
