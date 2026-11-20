import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileSpreadsheet, 
  CheckCheck, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  TrendingUp, 
  ArrowRight,
  ShieldAlert,
  Radio,
  BarChart3,
  Map,
  Users
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { OfficerHeader } from '../../components/layout/OfficerHeader';
import { OfficerSidebar } from '../../components/layout/OfficerSidebar';
import { DemoBanner } from '../../components/common/DemoBanner';
import { useLanguage } from '../../context/LanguageContext';
import { MAHARASHTRA_DISTRICT_HOTSPOTS } from '../../data/maharashtraGeo';

const WEEKLY_INCIDENCE_DATA = [
  { week: 'W44 (Oct)', TomatoEarlyBlight: 42, CottonAphids: 28, OnionPurpleBlotch: 15 },
  { week: 'W45 (Nov)', TomatoEarlyBlight: 58, CottonAphids: 35, OnionPurpleBlotch: 22 },
  { week: 'W46 (Nov)', TomatoEarlyBlight: 74, CottonAphids: 48, OnionPurpleBlotch: 41 },
  { week: 'W47 (Current)', TomatoEarlyBlight: 92, CottonAphids: 62, OnionPurpleBlotch: 89 },
];

const CROP_DISTRIBUTION = [
  { name: 'Tomato', value: 38, color: '#D9534F' },
  { name: 'Cotton', value: 29, color: '#F4B942' },
  { name: 'Onion', value: 21, color: '#287A50' },
  { name: 'Soybean', value: 12, color: '#164B35' }
];

export const OfficerDashboardPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col">
      <DemoBanner />
      <OfficerHeader />

      <div className="flex-1 flex flex-col md:flex-row">
        <div className="hidden md:block">
          <OfficerSidebar />
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Top Title & Quick Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#164B35]">
                {t('officer_dashboard_title')}
              </h1>
              <p className="text-xs sm:text-sm text-[#5F6F65] mt-1">
                {t('officer_subtitle')} • <span className="font-semibold text-emerald-800">लाइव डेमो डेटा (Sample Verified Stream)</span>
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                to="/officer/map"
                className="bg-[#164B35] hover:bg-[#287A50] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm transition-all"
              >
                <Map size={15} />
                <span>हॉटस्पॉट मानचित्र</span>
              </Link>
              <Link
                to="/officer/alerts"
                className="bg-[#287A50] hover:bg-emerald-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm transition-all"
              >
                <Radio size={15} />
                <span>अलर्ट प्रसारित करें</span>
              </Link>
            </div>
          </div>

          {/* SECTION 15: 5 Core Command Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {/* 1. Total Reports */}
            <div className="bg-white p-4 rounded-3xl border border-[#DDE7DF] shadow-card space-y-1">
              <div className="flex items-center justify-between text-[#5F6F65]">
                <span className="text-xs font-bold">{t('stat_total_reports')}</span>
                <FileSpreadsheet size={18} className="text-[#164B35]" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-[#164B35] block">
                1,420
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold block">
                ↑ +18% पिछले सप्ताह से
              </span>
            </div>

            {/* 2. Confirmed Cases */}
            <div className="bg-white p-4 rounded-3xl border border-[#DDE7DF] shadow-card space-y-1">
              <div className="flex items-center justify-between text-[#5F6F65]">
                <span className="text-xs font-bold">{t('stat_confirmed_cases')}</span>
                <CheckCheck size={18} className="text-[#329568]" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-[#329568] block">
                980
              </span>
              <span className="text-[11px] text-[#5F6F65] block">
                KVK व वैज्ञानिकों द्वारा पुष्ट
              </span>
            </div>

            {/* 3. Active Risk Alerts */}
            <div className="bg-white p-4 rounded-3xl border border-[#DDE7DF] shadow-card space-y-1">
              <div className="flex items-center justify-between text-[#5F6F65]">
                <span className="text-xs font-bold">{t('stat_active_alerts')}</span>
                <AlertTriangle size={18} className="text-[#D9534F]" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-[#D9534F] block">
                14
              </span>
              <span className="text-[11px] text-red-700 font-semibold block">
                3 जिले गंभीर स्थिति में
              </span>
            </div>

            {/* 4. Pending Expert Verification */}
            <div className="bg-white p-4 rounded-3xl border border-[#DDE7DF] shadow-card space-y-1">
              <div className="flex items-center justify-between text-[#5F6F65]">
                <span className="text-xs font-bold">{t('stat_pending_validation')}</span>
                <Clock size={18} className="text-[#F4B942]" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-amber-600 block">
                38
              </span>
              <Link to="/officer/validation" className="text-[11px] text-[#287A50] font-bold block hover:underline">
                कतार में समीक्षा करें →
              </Link>
            </div>

            {/* 5. High-Risk Villages */}
            <div className="bg-white p-4 rounded-3xl border border-[#DDE7DF] shadow-card space-y-1 col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between text-[#5F6F65]">
                <span className="text-xs font-bold">{t('stat_high_risk_villages')}</span>
                <MapPin size={18} className="text-purple-600" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-purple-900 block">
                27
              </span>
              <span className="text-[11px] text-[#5F6F65] block">
                अकोला, नासिक, संभाजीनगर
              </span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Outbreak Progression Area Chart */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-5 shadow-card border border-[#DDE7DF] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-[#164B35]">
                    रोग प्रसार प्रवृत्ति (Weekly Outbreak Progression Trend)
                  </h3>
                  <p className="text-xs text-[#5F6F65]">
                    अकोला व नासिक संभाग में प्रमुख रोगों के साप्ताहिक मामले
                  </p>
                </div>
                <span className="text-xs bg-[#EAF4E9] text-[#164B35] font-bold px-2.5 py-1 rounded-full">
                  वास्तविक समय रुझान
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={WEEKLY_INCIDENCE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTomato" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D9534F" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#D9534F" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorOnion" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#287A50" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#287A50" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="TomatoEarlyBlight" stroke="#D9534F" fillOpacity={1} fill="url(#colorTomato)" name="टमाटर अगेती झुलसा" />
                    <Area type="monotone" dataKey="OnionPurpleBlotch" stroke="#287A50" fillOpacity={1} fill="url(#colorOnion)" name="कांदा जांभळा करपा" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center space-x-6 text-xs text-[#5F6F65] pt-2">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#D9534F]"></span>
                  <span>टमाटर अगेती झुलसा (Early Blight)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#287A50]"></span>
                  <span>कांदा जांभळा करपा (Purple Blotch)</span>
                </div>
              </div>
            </div>

            {/* Crop Vulnerability Pie */}
            <div className="bg-white rounded-3xl p-5 shadow-card border border-[#DDE7DF] space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-base text-[#164B35]">
                  फसल वार रोग हिस्सा (Crop Vulnerability)
                </h3>
                <p className="text-xs text-[#5F6F65]">
                  कुल दर्ज मामलों का फसल अनुसार प्रतिशत
                </p>
              </div>

              <div className="h-48 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CROP_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {CROP_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {CROP_DISTRIBUTION.map((item, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="text-[#5F6F65] truncate">{item.name}: <strong>{item.value}%</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hotspot Districts Table Summary */}
          <div className="bg-white rounded-3xl p-5 shadow-card border border-[#DDE7DF] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-[#164B35]">
                  महाराष्ट्र जिला हॉटस्पॉट स्थिति (District Surveillance Hotspots)
                </h3>
                <p className="text-xs text-[#5F6F65]">
                  सक्रिय रोग मामले व वातावरणीय खतरे की रैंकिंग
                </p>
              </div>
              <Link
                to="/officer/map"
                className="text-xs font-bold text-[#287A50] hover:underline flex items-center space-x-1"
              >
                <span>जीआईएस मानचित्र पर देखें</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F7F0] text-[#5F6F65] uppercase text-[11px] font-bold border-b border-[#DDE7DF]">
                  <tr>
                    <th className="py-3 px-4">जिला (District)</th>
                    <th className="py-3 px-4">मुख्य फसल</th>
                    <th className="py-3 px-4">प्रमुख समस्या</th>
                    <th className="py-3 px-4">सक्रिय रिपोर्ट्स</th>
                    <th className="py-3 px-4">जोखिम स्तर</th>
                    <th className="py-3 px-4">रुझान (Trend)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE7DF]">
                  {MAHARASHTRA_DISTRICT_HOTSPOTS.map((spot, i) => (
                    <tr key={i} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-[#164B35]">
                        {spot.district} ({spot.marathiName})
                      </td>
                      <td className="py-3 px-4 text-[#202D25]">{spot.primaryCrop}</td>
                      <td className="py-3 px-4 text-[#5F6F65]">{spot.prevalentDisease}</td>
                      <td className="py-3 px-4 font-black text-[#164B35]">{spot.activeReportsCount}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            spot.riskLevel === 'severe'
                              ? 'bg-red-100 text-red-800'
                              : spot.riskLevel === 'high'
                              ? 'bg-orange-100 text-orange-800'
                              : spot.riskLevel === 'medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {spot.riskLevel.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[11px] font-semibold">
                        {spot.trend === 'increasing' ? (
                          <span className="text-red-600">↑ बढ़ रहा है</span>
                        ) : spot.trend === 'decreasing' ? (
                          <span className="text-emerald-600">↓ घट रहा है</span>
                        ) : (
                          <span className="text-amber-600">→ स्थिर</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
