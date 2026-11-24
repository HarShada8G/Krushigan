import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Bell, 
  User, 
  MapPin, 
  ArrowLeftRight, 
  LogOut,
  Building2 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from '../common/LanguageSelector';

export const OfficerHeader: React.FC = () => {
  const { user, switchRole, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className="bg-[#164B35] text-white border-b border-[#287A50]/40 sticky top-0 z-30 shadow-md">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Left: Brand & Portal Title */}
        <Link to="/" className="flex items-center space-x-3 group" title="मुख्य पृष्ठ पर जाएं (Go to Home)">
          <div className="w-9 h-9 rounded-xl bg-[#287A50] border border-emerald-400/30 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
            <ShieldCheck size={22} className="text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight">Krushigan</span>
              <span className="text-[11px] bg-amber-400/20 text-amber-200 border border-amber-400/40 px-2 py-0.5 rounded-full font-semibold">
                National Surveillance Portal
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/90 hidden sm:block">
              राष्ट्रीय व राज्य कृषि निगरानी नेटवर्क (Crop Health Surveillance Network)
            </p>
          </div>
        </Link>

        {/* Right: Officer Profile & Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <LanguageSelector variant="dark" />

          {/* District / Posting Tag */}
          <div className="hidden md:flex items-center space-x-1.5 bg-black/20 border border-white/10 px-3 py-1 rounded-lg text-xs">
            <MapPin size={13} className="text-amber-400" />
            <span className="text-white/80">मुख्यालय:</span>
            <span className="font-semibold text-white">
              {user?.district || "National HQ (अखिल भारतीय)"}
            </span>
          </div>

          {/* User Details / Public View Badge */}
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-xl border border-white/15">
              <div className="w-7 h-7 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-300">
                <User size={15} />
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-bold leading-tight text-white">
                  {user.name}
                </p>
                <p className="text-[10px] text-emerald-200 leading-tight">
                  {user.designation || user.role}
                </p>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-lg text-xs text-emerald-200 border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>सार्वजनिक अवलोकन (Public View)</span>
            </div>
          )}

          {/* Quick Switch to Farmer Portal */}
          <Link
            to="/farmer/dashboard"
            className="flex items-center space-x-1 text-xs bg-[#287A50] hover:bg-emerald-600 text-white font-medium px-3 py-1.5 rounded-lg shadow-sm transition-all"
            title="किसान पोर्टल पर जाएं"
          >
            <ArrowLeftRight size={13} />
            <span className="hidden sm:inline">किसान पोर्टल</span>
          </Link>

          {/* Logout Action (if authenticated) or Login */}
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex items-center space-x-1 text-xs bg-red-600/80 hover:bg-red-700 text-white font-medium px-2.5 py-1.5 rounded-lg shadow-sm transition-all"
              title="लॉगआउट (Logout)"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">लॉगआउट</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white/90 hover:text-white text-xs px-2.5 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition-all font-semibold"
            >
              स्टाफ लॉगिन
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
