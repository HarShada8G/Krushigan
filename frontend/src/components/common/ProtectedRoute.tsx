import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import { PublicNavbar } from '../layout/PublicNavbar';
import { DemoBanner } from '../common/DemoBanner';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Lock, 
  ShieldAlert, 
  ShieldCheck, 
  LogIn, 
  ArrowLeft, 
  Sprout, 
  Map, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading, login, switchRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F7F0] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-[#164B35] mx-auto" />
          <p className="text-xs font-medium text-[#5F6F65]">प्रमाणीकरण जांच हो रही है... (Verifying access...)</p>
        </div>
      </div>
    );
  }

  // Get readable page name
  const getPageTitle = (path: string) => {
    if (path.includes('alerts')) return language === 'mr' ? 'इशारा प्रसारण प्रणाली' : language === 'en' ? 'Broadcast & Early Warning System' : 'अलर्ट व पूर्व चेतावनी प्रसारण';
    if (path.includes('validation')) return language === 'mr' ? 'तज्ज्ञ रोग पडताळणी कतार' : language === 'en' ? 'Expert Disease Validation Queue' : 'विशेषज्ञ रोग सत्यापन कतार';
    if (path.includes('farmers')) return language === 'mr' ? 'नोंदणीकृत शेतकरी व्यवस्थापन' : language === 'en' ? 'Farmer Registry & Advisory Management' : 'पंजीकृत किसान प्रबंधन';
    if (path.includes('case')) return language === 'mr' ? 'तपशीलवार रोग प्रकरण परीक्षण' : language === 'en' ? 'Detailed Disease Case Review' : 'विस्तृत रोग मामला समीक्षा';
    return language === 'mr' ? 'प्रशासकीय विभाग' : language === 'en' ? 'Administrative Section' : 'प्रशासनिक अनुभाग';
  };

  // Case 1: Unauthenticated visitor trying to access a role-specific page
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#F8F7F0] flex flex-col">
        <DemoBanner />
        <PublicNavbar />

        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10 flex flex-col justify-center">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-[#DDE7DF] text-center space-y-6">
            {/* Badge & Lock Icon */}
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center mx-auto shadow-sm">
              <Lock size={32} />
            </div>

            <div>
              <div className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-900 border border-amber-300/80 px-3 py-1 rounded-full text-xs font-bold mb-2">
                <span>सुरक्षित अनुभाग · Authorized Access Required</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#164B35]">
                {getPageTitle(location.pathname)}
              </h1>
              <p className="text-sm text-[#5F6F65] mt-2 max-w-lg mx-auto leading-relaxed">
                यह खंड केवल अधिकृत कृषि अधिकारियों एवं वैज्ञानिकों के लिए आरक्षित है। 
                इस पृष्ठ का डेटा देखने अथवा संशोधन करने के लिए अधिकृत खाते से लॉगिन करें।
              </p>
              {allowedRoles && allowedRoles.length > 0 && (
                <p className="text-xs font-semibold text-[#287A50] mt-1">
                  आवश्यक भूमिका (Required Role): <span className="uppercase">{allowedRoles.join(' / ')}</span>
                </p>
              )}
            </div>

            {/* Action 1: Standard Staff Login */}
            <div className="pt-2">
              <Link
                to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#164B35] hover:bg-[#287A50] text-white font-bold px-6 py-3 rounded-xl shadow-sm transition-all"
              >
                <LogIn size={16} />
                <span>अधिकृत लॉगिन करें (Staff Sign In)</span>
              </Link>
            </div>

            {/* Action 2: Quick Demo Access (for evaluation and testing) */}
            <div className="border-t border-[#DDE7DF] pt-5">
              <p className="text-xs font-bold text-[#5F6F65] mb-3 uppercase tracking-wider">
                परीक्षण एवं अवलोकन हेतु त्वरित डेमो लॉगिन (Quick Evaluation Access)
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {allowedRoles?.includes('officer') && (
                  <button
                    onClick={() => login('officer')}
                    className="bg-emerald-50 hover:bg-emerald-100 text-[#164B35] border border-emerald-300 font-semibold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5"
                  >
                    <ShieldCheck size={14} className="text-emerald-700" />
                    <span>अधिकारी डेमो (Dr. Sunita)</span>
                  </button>
                )}
                {allowedRoles?.includes('expert') && (
                  <button
                    onClick={() => login('expert')}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 font-semibold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5"
                  >
                    <UserCheck size={14} className="text-blue-700" />
                    <span>विशेषज्ञ डेमो (Dr. Vinayak)</span>
                  </button>
                )}
                {allowedRoles?.includes('admin') && (
                  <button
                    onClick={() => login('admin')}
                    className="bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-300 font-semibold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5"
                  >
                    <ShieldCheck size={14} className="text-purple-700" />
                    <span>प्रशासक डेमो (Admin HQ)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Public Alternatives */}
            <div className="border-t border-[#DDE7DF] pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[#5F6F65]">
              <Link
                to="/farmer/dashboard"
                className="hover:text-[#164B35] font-semibold flex items-center space-x-1"
              >
                <Sprout size={14} className="text-emerald-600" />
                <span>सार्वजनिक किसान पोर्टल खोलें</span>
              </Link>
              <span className="hidden sm:inline text-gray-300">•</span>
              <Link
                to="/officer/map"
                className="hover:text-[#164B35] font-semibold flex items-center space-x-1"
              >
                <Map size={14} className="text-emerald-600" />
                <span>सार्वजनिक GIS हॉटस्पॉट मैप</span>
              </Link>
              <span className="hidden sm:inline text-gray-300">•</span>
              <Link
                to="/"
                className="hover:text-[#164B35] font-semibold flex items-center space-x-1"
              >
                <ArrowLeft size={14} />
                <span>मुख्य पृष्ठ (Home)</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Case 2: Authenticated user, but their role is not allowed for this route
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-[#F8F7F0] flex flex-col">
        <DemoBanner />
        <PublicNavbar />

        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10 flex flex-col justify-center">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-[#DDE7DF] text-center space-y-6">
            {/* Access Denied Icon */}
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 border border-red-200/80 flex items-center justify-center mx-auto shadow-sm">
              <ShieldAlert size={32} />
            </div>

            <div>
              <div className="inline-flex items-center space-x-1.5 bg-red-100 text-red-900 border border-red-300 px-3 py-1 rounded-full text-xs font-bold mb-2">
                <span>403 · अनधिकृत पहुंच (Access Denied)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202D25]">
                अनुमति अस्वीकृत (Restricted Access)
              </h1>
              <div className="mt-3 bg-[#F8F7F0] p-4 rounded-2xl border border-[#DDE7DF] text-left text-xs space-y-1.5 max-w-md mx-auto">
                <p>
                  <span className="text-[#5F6F65]">लॉगिन उपयोगकर्ता:</span>{' '}
                  <strong className="text-[#202D25]">{user.name}</strong>
                </p>
                <p>
                  <span className="text-[#5F6F65]">वर्तमान भूमिका:</span>{' '}
                  <span className="capitalize font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded text-[11px]">
                    {user.role}
                  </span>
                </p>
                <p>
                  <span className="text-[#5F6F65]">आवश्यक भूमिका:</span>{' '}
                  <span className="uppercase font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded text-[11px]">
                    {allowedRoles.join(' / ')}
                  </span>
                </p>
              </div>
              <p className="text-xs text-[#5F6F65] mt-3 max-w-md mx-auto leading-relaxed">
                आपकी वर्तमान भूमिका इस खंड के संपादन अथवा अवलोकन के लिए अधिकृत नहीं है। 
                कृपया आवश्यक भूमिका वाले खाते से लॉगिन करें अथवा अपने डैशबोर्ड पर लौटें।
              </p>
            </div>

            {/* Quick Role Switch / Re-login Options */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              {allowedRoles.includes('officer') && (
                <button
                  onClick={() => switchRole('officer')}
                  className="bg-[#164B35] hover:bg-[#287A50] text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
                >
                  <ShieldCheck size={14} />
                  <span>अधिकारी मोड में बदलें (Switch to Officer)</span>
                </button>
              )}
              {allowedRoles.includes('expert') && (
                <button
                  onClick={() => switchRole('expert')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
                >
                  <UserCheck size={14} />
                  <span>विशेषज्ञ मोड में बदलें (Switch to Expert)</span>
                </button>
              )}
              <button
                onClick={() => {
                  logout();
                  navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5"
              >
                <LogIn size={14} />
                <span>अन्य खाते से लॉगिन करें</span>
              </button>
            </div>

            {/* Navigation back */}
            <div className="border-t border-[#DDE7DF] pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[#5F6F65]">
              <button
                onClick={() => navigate(user.role === 'farmer' ? '/farmer/dashboard' : '/officer/dashboard')}
                className="hover:text-[#164B35] font-semibold flex items-center space-x-1"
              >
                <ArrowLeft size={14} />
                <span>मेरे डैशबोर्ड पर लौटें ({user.role === 'farmer' ? 'किसान पोर्टल' : 'अधिकारी पोर्टल'})</span>
              </button>
              <span className="hidden sm:inline text-gray-300">•</span>
              <Link to="/" className="hover:text-[#164B35] font-semibold">
                मुख्य पृष्ठ (Home)
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Case 3: Authenticated and role matches allowedRoles
  return <>{children}</>;
};

export default ProtectedRoute;
