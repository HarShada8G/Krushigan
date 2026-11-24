import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  Menu, 
  X, 
  UserCircle2, 
  LogOut, 
  LogIn, 
  Home, 
  Info, 
  HelpCircle, 
  Camera, 
  CloudSun, 
  Map,
  ShieldCheck
} from 'lucide-react';
import { LanguageSelector } from '../common/LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../hooks/useAuth';

export const PublicNavbar: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  // 7 core navigation items requested for Krushigan
  const navItems = [
    {
      to: '/',
      label: t('home') || 'होम',
      icon: Home
    },
    {
      to: '/about',
      label: t('about') || 'हमारे बारे में',
      icon: Info
    },
    {
      to: '/how-it-works',
      label: t('how_it_works') || 'कार्यप्रणाली',
      icon: HelpCircle
    },
    {
      to: '/farmer/dashboard',
      label: t('farmer_portal') || 'किसान पोर्टल',
      icon: Sprout
    },
    {
      to: '/farmer/scan',
      label: language === 'mr' ? 'पीक स्कॅन' : language === 'en' ? 'Crop Scan' : 'फसल जांच',
      icon: Camera
    },
    {
      to: '/farmer/advisory',
      label: language === 'mr' ? 'हवामान सल्ला' : language === 'en' ? 'Weather Advisory' : 'मौसम सलाह',
      icon: CloudSun
    },
    {
      to: '/officer/map',
      label: language === 'mr' ? 'GIS नकाशा' : language === 'en' ? 'GIS Map' : 'GIS मैप',
      icon: Map
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#164B35] text-white shadow-md border-b border-[#287A50]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#287A50] border border-emerald-400/30 flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
              <Sprout size={24} className="text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">Krushigan</span>
                <span className="text-[10px] bg-emerald-700/80 text-emerald-200 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono">
                  कृषिगण
                </span>
              </div>
              <p className="text-[10px] text-emerald-200/90 font-medium hidden sm:block leading-tight">
                AI Crop Health & Surveillance
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links (7 Items) */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs xl:text-[13px] font-semibold">
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-2.5 py-1.5 rounded-lg transition-all ${
                    active
                      ? 'bg-[#287A50] text-white shadow-sm border border-emerald-400/30 font-bold'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Language & Auth Controls */}
          <div className="hidden lg:flex items-center space-x-2.5 shrink-0">
            <LanguageSelector variant="dark" />

            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2 border-l border-white/20 pl-2.5">
                {/* Active Role Portal Shortcut */}
                <Link
                  to={user.role === 'farmer' ? '/farmer/dashboard' : '/officer/dashboard'}
                  className="bg-[#287A50] hover:bg-emerald-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-sm transition-all flex items-center space-x-1"
                >
                  <span>{user.role === 'farmer' ? '🌱' : '🛡️'}</span>
                  <span>{user.role === 'farmer' ? 'पोर्टल' : 'कमांड'}</span>
                </Link>

                {/* User chip */}
                <div className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-xl border border-white/15 text-xs">
                  <UserCircle2 size={16} className="text-emerald-300" />
                  <span className="font-semibold text-white max-w-[100px] truncate">{user.name}</span>
                  <span className="text-[10px] bg-emerald-800 text-emerald-200 px-1.5 py-0.5 rounded capitalize">
                    {user.role}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-red-600/80 hover:bg-red-700 text-white text-xs font-semibold px-2 py-1 rounded-lg border border-red-500/30 transition-all flex items-center space-x-1"
                  title="लॉगआउट (Logout)"
                >
                  <LogOut size={13} />
                  <span>लॉगआउट</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 border-l border-white/20 pl-2.5">
                <Link
                  to="/login"
                  className="text-white/90 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/25 hover:bg-white/10 transition-all flex items-center space-x-1.5"
                  title="कर्मचारी व विशेषज्ञ लॉगिन (Staff & Expert Sign In)"
                >
                  <LogIn size={13} className="text-emerald-300" />
                  <span>लॉगिन (Staff Login)</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            <LanguageSelector variant="dark" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#164B35] border-t border-[#287A50]/40 px-4 pt-3 pb-5 space-y-2.5 shadow-xl animate-in slide-in-from-top-2">
          {/* User Account / Staff Login Banner */}
          {isAuthenticated && user ? (
            <div className="bg-white/10 p-3 rounded-2xl border border-white/15 flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2.5">
                <UserCircle2 size={20} className="text-emerald-300" />
                <div>
                  <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                  <p className="text-[10px] text-emerald-200 capitalize">
                    {user.role} · {user.district || 'All-India'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600/80 hover:bg-red-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-xl flex items-center space-x-1"
              >
                <LogOut size={12} />
                <span>लॉगआउट</span>
              </button>
            </div>
          ) : (
            <div className="mb-3 pb-2 border-b border-white/10">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between bg-white/10 hover:bg-white/15 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white border border-white/15 transition-all"
              >
                <div className="flex items-center space-x-2">
                  <LogIn size={15} className="text-emerald-300" />
                  <span>अधिकारी / विशेषज्ञ लॉगिन (Staff Sign In)</span>
                </div>
                <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded">
                  लॉगिन →
                </span>
              </Link>
            </div>
          )}

          {/* Navigation Links with Icons */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-[#287A50] text-white font-bold shadow-sm'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={18} className={active ? 'text-emerald-200' : 'text-emerald-300/80'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
