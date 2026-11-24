import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { DemoBanner } from '../../components/common/DemoBanner';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../context/LanguageContext';
import { UserCheck, ShieldAlert, Sparkles, Sprout, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role') as UserRole) || 'farmer';
  const redirectPath = searchParams.get('redirect');
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [phone, setPhone] = useState(initialRole === 'farmer' ? 'farmer_ramesh' : 'officer_sunita');
  const [password, setPassword] = useState('demo123');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { login, loginWithCredentials } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);
    const res = await loginWithCredentials(phone, password, selectedRole);
    setSubmitting(false);

    if (res.success) {
      if (redirectPath) {
        navigate(redirectPath);
      } else if (selectedRole === 'farmer') {
        navigate('/farmer/dashboard');
      } else {
        navigate('/officer/dashboard');
      }
    } else {
      setErrorMessage(res.error || "लॉगिन असफल। कृपया जानकारी जांचें या नीचे त्वरित डेमो लॉगिन चुनें।");
    }
  };

  const handleQuickDemoLogin = async (role: UserRole) => {
    setSubmitting(true);
    setErrorMessage(null);
    const res = await login(role);
    setSubmitting(false);

    if (res.success) {
      if (redirectPath) {
        navigate(redirectPath);
      } else if (role === 'farmer') {
        navigate('/farmer/dashboard');
      } else {
        navigate('/officer/dashboard');
      }
    } else {
      setErrorMessage(res.error || "त्वरित डेमो लॉगिन असफल रहा। कृपया पुनः प्रयास करें।");
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
              {selectedRole === 'farmer' ? "किसान लॉगिन (Farmer Portal)" : "अधिकारी लॉगिन (Officer Portal)"}
            </h1>
            <p className="text-xs text-[#5F6F65]">
              कृषिगण सुरक्षित कृषि निगरानी मंच में आपका स्वागत है।
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
              🌱 किसान (Farmer)
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
              🛡️ अधिकारी (Officer)
            </button>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl text-xs font-medium">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#202D25] mb-1.5">
                {selectedRole === 'farmer' ? "यूजरनेम / मोबाइल नंबर (Phone / Username)" : "अधिकारी यूजरनेम / ईमेल"}
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder={selectedRole === 'farmer' ? "उदा. farmer_ramesh या 9822345678" : "उदा. officer_sunita"}
                className="w-full px-4 py-3 rounded-xl border border-[#DDE7DF] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#287A50]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202D25] mb-1.5">
                पासवर्ड (Password)
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="पासवर्ड दर्ज करें"
                className="w-full px-4 py-3 rounded-xl border border-[#DDE7DF] text-sm focus:outline-none focus:ring-2 focus:ring-[#287A50]"
                required
              />
              <span className="text-[10px] text-[#5F6F65] mt-1 block">
                डेमो खातों के लिए पासवर्ड: <strong className="font-mono">demo123</strong> (या demo1234)
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#164B35] hover:bg-[#287A50] text-white font-bold py-3.5 rounded-2xl shadow-touch transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {submitting ? (
                <span>प्रमाणीकरण हो रहा है...</span>
              ) : (
                <>
                  <span>पोर्टल में प्रवेश करें</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Demo Login box */}
          <div className="bg-[#EAF4E9] rounded-2xl p-4 border border-[#287A50]/20 space-y-2.5">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-[#164B35]">
              <Sparkles size={14} className="text-[#287A50]" />
              <span>जज व परीक्षक त्वरित लॉगिन (1-Click Demo Access):</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('farmer')}
                className="w-full bg-white text-[#164B35] border border-[#287A50]/30 hover:bg-emerald-50 text-xs font-bold py-2 px-3 rounded-xl text-left flex items-center justify-between"
              >
                <span>🌱 किसान: रमेश पाटील (अकोला)</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">लॉगिन</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('officer')}
                className="w-full bg-white text-[#164B35] border border-[#287A50]/30 hover:bg-emerald-50 text-xs font-bold py-2 px-3 rounded-xl text-left flex items-center justify-between"
              >
                <span>🛡️ अधिकारी: डॉ. सुनीता देशमुख (DAO)</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">लॉगिन</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('expert')}
                className="w-full bg-white text-[#164B35] border border-[#287A50]/30 hover:bg-emerald-50 text-xs font-bold py-2 px-3 rounded-xl text-left flex items-center justify-between"
              >
                <span>🔬 विशेषज्ञ: डॉ. विनायक शिंदे (KVK)</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">लॉगिन</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="w-full bg-white text-[#164B35] border border-[#287A50]/30 hover:bg-emerald-50 text-xs font-bold py-2 px-3 rounded-xl text-left flex items-center justify-between"
              >
                <span>⚙️ राज्य प्रशासक: कृषि मुख्यालय (Admin HQ)</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">लॉगिन</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link to="/register" className="text-xs text-[#287A50] font-semibold hover:underline">
              नया किसान खाता बनाएं (Register New Farmer)
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
