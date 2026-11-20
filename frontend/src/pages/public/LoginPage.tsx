import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { DemoBanner } from '../../components/common/DemoBanner';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserCheck, ShieldAlert, Sparkles, Sprout, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role') as UserRole) || 'farmer';
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [phone, setPhone] = useState(initialRole === 'farmer' ? '9822345678' : '9422155667');

  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    if (selectedRole === 'farmer') {
      navigate('/farmer/dashboard');
    } else {
      navigate('/officer/dashboard');
    }
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    login(role);
    if (role === 'farmer') {
      navigate('/farmer/dashboard');
    } else {
      navigate('/officer/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col">
      <DemoBanner />
      <PublicNavbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-[#DDE7DF] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#164B35] text-white flex items-center justify-center mx-auto shadow-sm">
              <Sprout size={28} className="text-emerald-300" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#164B35]">
              {selectedRole === 'farmer' ? "à¤•à¤¿à¤¸à¤¾à¤¨ à¤²à¥‰à¤—à¤¿à¤¨ (Farmer Portal)" : "à¤…à¤§à¤¿à¤•à¤¾à¤°à¥€ à¤²à¥‰à¤—à¤¿à¤¨ (Officer Portal)"}
            </h1>
            <p className="text-xs text-[#5F6F65]">
              à¤•à¥à¤°à¥‰à¤ªà¤—à¤¾à¤°à¥à¤¡à¤¿à¤¯à¤¨ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤•à¥ƒà¤·à¤¿ à¤¨à¤¿à¤—à¤°à¤¾à¤¨à¥€ à¤®à¤‚à¤š à¤®à¥‡à¤‚ à¤†à¤ªà¤•à¤¾ à¤¸à¥à¤µà¤¾à¤—à¤¤ à¤¹à¥ˆà¥¤
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="grid grid-cols-2 gap-2 bg-[#F8F7F0] p-1.5 rounded-2xl border border-[#DDE7DF]">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('farmer');
                setPhone('9822345678');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                selectedRole === 'farmer'
                  ? 'bg-[#164B35] text-white shadow-sm'
                  : 'text-[#5F6F65] hover:text-[#164B35]'
              }`}
            >
              ðŸŒ± à¤•à¤¿à¤¸à¤¾à¤¨ (Farmer)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedRole('officer');
                setPhone('9422155667');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                selectedRole !== 'farmer'
                  ? 'bg-[#164B35] text-white shadow-sm'
                  : 'text-[#5F6F65] hover:text-[#164B35]'
              }`}
            >
              ðŸ›¡ï¸ à¤…à¤§à¤¿à¤•à¤¾à¤°à¥€ (Officer)
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#202D25] mb-1.5">
                {selectedRole === 'farmer' ? "à¤®à¥‹à¤¬à¤¾à¤‡à¤² à¤¨à¤‚à¤¬à¤° (Phone Number)" : "à¤…à¤§à¤¿à¤•à¤¾à¤°à¥€ à¤ˆà¤®à¥‡à¤² / à¤®à¥‹à¤¬à¤¾à¤‡à¤²"}
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="à¤‰à¤¦à¤¾. 98223 45678"
                className="w-full px-4 py-3 rounded-xl border border-[#DDE7DF] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#287A50]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202D25] mb-1.5">
                à¤ªà¤¾à¤¸à¤µà¤°à¥à¤¡ à¤¯à¤¾ à¤“à¤Ÿà¥€à¤ªà¥€ (Password / OTP)
              </label>
              <input
                type="password"
                defaultValue="demo1234"
                className="w-full px-4 py-3 rounded-xl border border-[#DDE7DF] text-sm focus:outline-none focus:ring-2 focus:ring-[#287A50]"
              />
              <span className="text-[10px] text-[#5F6F65] mt-1 block">
                à¤¡à¥‡à¤®à¥‹ à¤•à¥‡ à¤²à¤¿à¤ à¤•à¥‹à¤ˆ à¤­à¥€ à¤ªà¤¾à¤¸à¤µà¤°à¥à¤¡ à¤®à¤¾à¤¨à¥à¤¯ à¤¹à¥ˆà¥¤
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#164B35] hover:bg-[#287A50] text-white font-bold py-3.5 rounded-2xl shadow-touch transition-all flex items-center justify-center space-x-2"
            >
              <span>à¤ªà¥‹à¤°à¥à¤Ÿà¤² à¤®à¥‡à¤‚ à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤•à¤°à¥‡à¤‚</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick 1-Click Demo Login box */}
          <div className="bg-[#EAF4E9] rounded-2xl p-4 border border-[#287A50]/20 space-y-2.5">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-[#164B35]">
              <Sparkles size={14} className="text-[#287A50]" />
              <span>à¤œà¤œ à¤µ à¤ªà¤°à¥€à¤•à¥à¤·à¤• à¤¤à¥à¤µà¤°à¤¿à¤¤ à¤²à¥‰à¤—à¤¿à¤¨ (1-Click Demo Access):</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('farmer')}
                className="w-full bg-white text-[#164B35] border border-[#287A50]/30 hover:bg-emerald-50 text-xs font-bold py-2 px-3 rounded-xl text-left flex items-center justify-between"
              >
                <span>ðŸŒ± à¤•à¤¿à¤¸à¤¾à¤¨: à¤°à¤®à¥‡à¤¶ à¤ªà¤¾à¤Ÿà¥€à¤² (à¤…à¤•à¥‹à¤²à¤¾)</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">à¤²à¥‰à¤—à¤¿à¤¨</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('officer')}
                className="w-full bg-white text-[#164B35] border border-[#287A50]/30 hover:bg-emerald-50 text-xs font-bold py-2 px-3 rounded-xl text-left flex items-center justify-between"
              >
                <span>ðŸ›¡ï¸ à¤…à¤§à¤¿à¤•à¤¾à¤°à¥€: à¤¡à¥‰. à¤¸à¥à¤¨à¥€à¤¤à¤¾ à¤¦à¥‡à¤¶à¤®à¥à¤– (DAO)</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">à¤²à¥‰à¤—à¤¿à¤¨</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('expert')}
                className="w-full bg-white text-[#164B35] border border-[#287A50]/30 hover:bg-emerald-50 text-xs font-bold py-2 px-3 rounded-xl text-left flex items-center justify-between"
              >
                <span>ðŸ”¬ à¤µà¤¿à¤¶à¥‡à¤·à¤œà¥à¤ž: à¤¡à¥‰. à¤µà¤¿à¤¨à¤¾à¤¯à¤• à¤¶à¤¿à¤‚à¤¦à¥‡ (KVK)</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">à¤²à¥‰à¤—à¤¿à¤¨</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link to="/register" className="text-xs text-[#287A50] font-semibold hover:underline">
              à¤¨à¤¯à¤¾ à¤•à¤¿à¤¸à¤¾à¤¨ à¤–à¤¾à¤¤à¤¾ à¤¬à¤¨à¤¾à¤à¤‚ (Register New Farmer)
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
