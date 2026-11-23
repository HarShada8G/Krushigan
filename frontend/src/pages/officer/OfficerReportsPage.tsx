import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Eye, 
  ArrowUpDown,
  Download
} from 'lucide-react';
import { OfficerHeader } from '../../components/layout/OfficerHeader';
import { OfficerSidebar } from '../../components/layout/OfficerSidebar';
import { DemoBanner } from '../../components/common/DemoBanner';
import { getFarmerReports } from '../../services/api';
import { CropReport } from '../../types';

export const OfficerReportsPage: React.FC = () => {
  const [reports, setReports] = useState<CropReport[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('all');
  const [selectedReportModal, setSelectedReportModal] = useState<CropReport | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getFarmerReports();
    setReports(data);
  };

  const filteredReports = reports.filter(r => {
    const matchSearch =
      r.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.crop.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCrop = selectedCropFilter === 'all' || r.crop.toLowerCase() === selectedCropFilter.toLowerCase();
    return matchSearch && matchCrop;
  });

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col">
      <DemoBanner />
      <OfficerHeader />

      <div className="flex-1 flex flex-col md:flex-row">
        <div className="hidden md:block">
          <OfficerSidebar />
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#164B35]">
                रोग व कीट फील्ड रिपोर्ट्स रजिस्ट्री (Field Reports Registry)
              </h1>
              <p className="text-xs text-[#5F6F65] mt-0.5">
                महाराष्ट्र के किसानों द्वारा प्रेषित फसल स्वास्थ्य रिपोर्ट्स की संपूर्ण सूची
              </p>
            </div>

            <button
              onClick={() => alert("CSV निर्यात प्रारंभ हो गया (Demo export: 1420 rows)")}
              className="bg-white border border-[#287A50] text-[#164B35] hover:bg-emerald-50 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-colors"
            >
              <Download size={14} />
              <span>CSV एक्सपोर्ट करें</span>
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-3xl shadow-card border border-[#DDE7DF] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3.5 top-3 text-[#5F6F65]" />
              <input
                type="text"
                placeholder="किसान का नाम, रिपोर्ट आईडी, गाँव..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#DDE7DF] focus:outline-none focus:ring-2 focus:ring-[#287A50]"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-[#5F6F65]">फसल फ़िल्टर:</span>
              <select
                value={selectedCropFilter}
                onChange={e => setSelectedCropFilter(e.target.value)}
                className="bg-[#F8F7F0] text-[#164B35] font-bold text-xs px-3 py-2 rounded-xl border border-[#DDE7DF]"
              >
                <option value="all">सभी फसलें (All Crops)</option>
                <option value="Tomato">टमाटर (Tomato)</option>
                <option value="Cotton">कपास (Cotton)</option>
                <option value="Onion">प्याज (Onion)</option>
                <option value="Soybean">सोयाबीन (Soybean)</option>
              </select>
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white rounded-3xl shadow-card border border-[#DDE7DF] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F7F0] text-[#5F6F65] uppercase text-[11px] font-bold border-b border-[#DDE7DF]">
                  <tr>
                    <th className="py-3.5 px-4">रिपोर्ट आईडी</th>
                    <th className="py-3.5 px-4">किसान</th>
                    <th className="py-3.5 px-4">स्थान (गाँव/तहसील)</th>
                    <th className="py-3.5 px-4">फसल</th>
                    <th className="py-3.5 px-4">एआई निदान</th>
                    <th className="py-3.5 px-4">स्थिति</th>
                    <th className="py-3.5 px-4 text-right">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE7DF]">
                  {filteredReports.map(rep => (
                    <tr key={rep.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#164B35]">
                        {rep.id}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#202D25]">
                        {rep.farmerName}
                        <span className="block text-[10px] text-[#5F6F65] font-normal font-mono">
                          {rep.phone}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#5F6F65]">
                        {rep.village}, {rep.taluka} ({rep.district})
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#164B35]">
                        🌱 {rep.crop}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-[#202D25] block">
                          {rep.diagnosis?.hindiName || rep.diagnosis?.detectedProblem || 'अर्ली ब्लाइट'}
                        </span>
                        <span className="text-[10px] text-amber-800">
                          गंभीरता: {rep.diagnosis?.severity || 'medium'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            rep.status === 'expert_confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {rep.status === 'expert_confirmed' ? '✓ सत्यापित' : 'समीक्षाधीन'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedReportModal(rep)}
                          className="bg-[#164B35] text-white hover:bg-[#287A50] px-3 py-1.5 rounded-xl font-bold text-[11px] inline-flex items-center space-x-1"
                        >
                          <Eye size={13} />
                          <span>जांचें</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Modal for viewing single report details */}
      {selectedReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#DDE7DF] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#DDE7DF] pb-3">
              <div>
                <h3 className="font-black text-lg text-[#164B35]">
                  {selectedReportModal.id}
                </h3>
                <span className="text-xs text-[#5F6F65]">
                  {selectedReportModal.farmerName} • {selectedReportModal.village}, {selectedReportModal.district}
                </span>
              </div>
              <button
                onClick={() => setSelectedReportModal(null)}
                className="text-[#5F6F65] hover:text-[#164B35] font-bold text-sm px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black/5">
              <img
                src={selectedReportModal.imageUrl}
                alt="Plant lesion"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/images/crops/crop_fallback.svg') {
                    target.src = '/images/crops/crop_fallback.svg';
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-[#F8F7F0] p-3 rounded-2xl">
                <span className="text-[#5F6F65] block font-bold">एआई सुझाया गया निदान:</span>
                <p className="text-base font-black text-[#164B35] mt-0.5">
                  {selectedReportModal.diagnosis?.hindiName} ({selectedReportModal.diagnosis?.detectedProblem})
                </p>
                <p className="text-[11px] text-[#5F6F65] mt-1">
                  Confidence Score: {(Number(selectedReportModal.diagnosis?.confidenceScore || 0.9) * 100).toFixed(0)}%
                </p>
              </div>

              {selectedReportModal.expertValidation && (
                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
                  <span className="font-bold text-emerald-900 block">
                    सत्यापनकर्ता: {selectedReportModal.expertValidation.expertName}
                  </span>
                  <p className="text-emerald-800 italic mt-0.5">
                    "{selectedReportModal.expertValidation.notes}"
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedReportModal(null)}
                className="bg-[#164B35] text-white px-5 py-2.5 rounded-xl text-xs font-bold"
              >
                बंद करें (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
