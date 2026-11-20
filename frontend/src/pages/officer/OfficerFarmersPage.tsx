import React, { useState } from 'react';
import { Users, Search, Phone, MapPin, Sprout, CheckCircle2, ShieldCheck } from 'lucide-react';
import { OfficerHeader } from '../../components/layout/OfficerHeader';
import { OfficerSidebar } from '../../components/layout/OfficerSidebar';
import { DemoBanner } from '../../components/common/DemoBanner';

interface FarmerRow {
  id: string;
  name: string;
  phone: string;
  district: string;
  taluka: string;
  village: string;
  crop: string;
  landAcre: number;
  totalScans: number;
  status: 'active' | 'alert_sent';
  lastScanDate: string;
}

const SAMPLE_FARMERS: FarmerRow[] = [
  {
    id: "FARM-AKL-01",
    name: "Ramesh Patil (रमेश पाटील)",
    phone: "+91 98223 45678",
    district: "Akola",
    taluka: "Akot",
    village: "Kavtha Kadu",
    crop: "Tomato (Abhinav)",
    landAcre: 3.5,
    totalScans: 8,
    status: "active",
    lastScanDate: "2026-11-20"
  },
  {
    id: "FARM-AKL-02",
    name: "Sanjay Deshmukh (संजय देशमुख)",
    phone: "+91 97654 11223",
    district: "Akola",
    taluka: "Telhara",
    village: "Wari Bhairav",
    crop: "Tomato / Cotton",
    landAcre: 5.0,
    totalScans: 4,
    status: "alert_sent",
    lastScanDate: "2026-11-19"
  },
  {
    id: "FARM-NSK-03",
    name: "Balasaheb Shinde (बाळासाहेब शिंदे)",
    phone: "+91 94231 99887",
    district: "Nashik",
    taluka: "Niphad",
    village: "Pimpalgaon Baswant",
    crop: "Onion (Gavran)",
    landAcre: 4.2,
    totalScans: 12,
    status: "alert_sent",
    lastScanDate: "2026-11-20"
  },
  {
    id: "FARM-AMR-04",
    name: "Gajanan Wankhade (गजानन वानखडे)",
    phone: "+91 98600 44556",
    district: "Amravati",
    taluka: "Morshi",
    village: "Dhamangaon",
    crop: "Cotton (Bt-II)",
    landAcre: 6.0,
    totalScans: 5,
    status: "active",
    lastScanDate: "2026-11-17"
  },
  {
    id: "FARM-NGP-05",
    name: "Vinod Sahare (विनोद सहारे)",
    phone: "+91 99701 22334",
    district: "Nagpur",
    taluka: "Katol",
    village: "Kondhali",
    crop: "Soybean (JS-335)",
    landAcre: 2.8,
    totalScans: 3,
    status: "active",
    lastScanDate: "2026-11-16"
  }
];

export const OfficerFarmersPage: React.FC = () => {
  const [farmers, setFarmers] = useState<FarmerRow[]>(SAMPLE_FARMERS);
  const [search, setSearch] = useState('');

  const filtered = farmers.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.village.toLowerCase().includes(search.toLowerCase()) ||
    f.taluka.toLowerCase().includes(search.toLowerCase()) ||
    f.crop.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col">
      <DemoBanner />
      <OfficerHeader />

      <div className="flex-1 flex flex-col md:flex-row">
        <div className="hidden md:block">
          <OfficerSidebar />
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-[#164B35]">
                पंजीकृत किसान प्रबंधन (Registered Farmers Registry)
              </h1>
              <p className="text-xs text-[#5F6F65] mt-0.5">
                महाराष्ट्र के पंजीकृत किसानों का विवरण, रकबा एवं फसल स्वास्थ्य इतिहास
              </p>
            </div>

            <span className="text-xs font-bold text-[#164B35] bg-[#EAF4E9] px-3.5 py-2 rounded-2xl border border-[#287A50]/30">
              कुल पंजीकृत किसान: <strong>24,580 (राज्यव्यापी)</strong>
            </span>
          </div>

          {/* Search bar */}
          <div className="bg-white p-4 rounded-3xl shadow-card border border-[#DDE7DF]">
            <div className="relative w-full max-w-md">
              <Search size={16} className="absolute left-3.5 top-3 text-[#5F6F65]" />
              <input
                type="text"
                placeholder="किसान का नाम, गाँव, तहसील या फसल खोजें..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#DDE7DF] focus:outline-none focus:ring-2 focus:ring-[#287A50]"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl shadow-card border border-[#DDE7DF] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F7F0] text-[#5F6F65] uppercase text-[11px] font-bold border-b border-[#DDE7DF]">
                  <tr>
                    <th className="py-3.5 px-4">किसान पहचान (ID)</th>
                    <th className="py-3.5 px-4">किसान का नाम</th>
                    <th className="py-3.5 px-4">स्थान (गाँव/तहसील/जिला)</th>
                    <th className="py-3.5 px-4">मुख्य फसल</th>
                    <th className="py-3.5 px-4">रकबा</th>
                    <th className="py-3.5 px-4">कुल स्कैन</th>
                    <th className="py-3.5 px-4">अंतिम सक्रियता</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE7DF]">
                  {filtered.map(f => (
                    <tr key={f.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#164B35]">
                        {f.id}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#202D25]">
                        {f.name}
                        <span className="block text-[10px] text-[#5F6F65] font-normal font-mono">
                          {f.phone}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#5F6F65]">
                        {f.village}, {f.taluka} ({f.district})
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#164B35]">
                        🌱 {f.crop}
                      </td>
                      <td className="py-3.5 px-4 text-[#202D25]">{f.landAcre} एकड़</td>
                      <td className="py-3.5 px-4 font-black text-[#164B35]">{f.totalScans}</td>
                      <td className="py-3.5 px-4 text-[11px] text-[#5F6F65]">{f.lastScanDate}</td>
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
