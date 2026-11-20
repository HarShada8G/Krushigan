import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, ShieldCheck, Menu, X, UserCircle2 } from 'lucide-react';
import { LanguageSelector } from '../common/LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export const PublicNavbar: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#164B35] text-white shadow-md border-b border-[#287A50]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#287A50] flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
              <Sprout size={24} className="text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">Krushigan</span>
                <span className="text-[10px] bg-emerald-700/60 text-emerald-200 px-1.5 py-0.5 rounded font-mono">
                  कृषिगण
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/90 font-medium hidden sm:block">
                {t('tagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors py-1 ${
                isActive('/') ? 'text-white border-b-2 border-emerald-400 font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              {t('home')}
            </Link>
            <Link
              to="/how-it-works"
              className={`transition-colors py-1 ${
                isActive('/how-it-works') ? 'text-white border-b-2 border-emerald-400 font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              {t('how_it_works')}
            </Link>
            <Link
              to="/about"
              className={`transition-colors py-1 ${
                isActive('/about') ? 'text-white border-b-2 border-emerald-400 font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              {t('about')}
            </Link>
          </nav>

          {/* Right actions: Language & Portals */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSelector variant="dark" />

            {/* Quick Portals CTA */}
            <div className="flex items-center space-x-2 border-l border-white/20 pl-3">
              <Link
                to="/farmer/dashboard"
                className="bg-[#287A50] hover:bg-emerald-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
              >
                <span>🌱</span>
                <span>{t('farmer_portal')}</span>
              </Link>
              <Link
                to="/officer/dashboard"
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-xl border border-white/20 transition-all flex items-center space-x-1.5"
              >
                <ShieldCheck size={14} className="text-amber-300" />
                <span>{t('officer_portal')}</span>
              </Link>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center space-x-2 lg:hidden">
            <LanguageSelector variant="dark" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#164B35] border-t border-[#287A50]/40 px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
            <Link
              to="/farmer/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#287A50] text-white text-center py-2.5 rounded-xl font-bold text-xs"
            >
              🌱 {t('farmer_portal')}
            </Link>
            <Link
              to="/officer/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-white/15 text-white text-center py-2.5 rounded-xl font-semibold text-xs border border-white/20"
            >
              🛡️ {t('officer_portal')}
            </Link>
          </div>
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white/90 hover:text-white py-1.5 font-medium text-sm"
          >
            {t('home')}
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white/90 hover:text-white py-1.5 font-medium text-sm"
          >
            {t('how_it_works')}
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-white/90 hover:text-white py-1.5 font-medium text-sm"
          >
            {t('about')}
          </Link>
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-emerald-300 hover:text-white py-1.5 font-medium text-sm"
          >
            {t('login')} / डेमो लॉगिन
          </Link>
        </div>
      )}
    </header>
  );
};
