import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCheck, 
  FlaskConical, 
  HelpCircle, 
  Camera, 
  MapPin, 
  Calendar,
  Share2
} from 'lucide-react';
import { OfficerHeader } from '../../components/layout/OfficerHeader';
import { DemoBanner } from '../../components/common/DemoBanner';
import { getFarmerReports, saveCropReport } from '../../services/api';
import { CropReport } from '../../types';

export const ExpertCasePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [report, setReport] = useState<CropReport | null>(null);
  const [labNotes, setLabNotes] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const all = await getFarmerReports();
      const found = all.find(r => r.id === id) || all[0];
      setReport(found);
    })();
  }, [id]);

  if (!report) {
    return (
      <div className="min-h-screen bg-[#F8F7F0] flex items-center justify-center text-xs font-bold">
        लोड हो रहा है...
      </div>
    );
  }

  const handleReferLab = async () => {
    const updated: CropReport = {
      ...report,
      status: 'lab_referred',
      expertValidation: {
        expertId: 'EXP-KVK-AKL-09',
        expertName: 'Dr. Vinayak Shinde',
        verifiedDiagnosis: 'Referred to Regional Plant Pathology Lab',
        notes: labNotes || 'Microscopic spore assay & PCR testing requested for strain isolation.',
        validatedAt: new Date().toLocaleString(),
        status: 'lab_referral'
      }
    };
    await saveCropReport(updated);
    setReport(updated);
    setMsg("केस क्षेत्रीय पादप रोग विज्ञान प्रयोगशाला (Regional Pathology Lab) को प्रेषित किया गया।");
    setTimeout(() => setMsg(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F0] flex flex-col">
      <DemoBanner />
      <OfficerHeader />

      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/officer/validation')}
            className="flex items-center space-x-1 text-xs font-bold text-[#164B35] bg-white px-3 py-1.5 rounded-xl border border-[#DDE7DF]"
          >
            <ArrowLeft size={14} />
            <span>सत्यापन कतार पर वापस</span>
          </button>
          <span className="text-xs font-bold text-[#5F6F65]">
            केस विश्लेषण: {report.id}
          </span>
        </div>

        {msg && (
          <div className="bg-[#329568] text-white p-3 rounded-2xl text-xs font-bold text-center animate-fadeIn shadow-sm">
            ✓ {msg}
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 shadow-card border border-[#DDE7DF] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DDE7DF] pb-4">
            <div>
              <span className="text-xs font-bold text-[#287A50]">
                🌱 {report.crop} ({report.variety || 'Standard Variety'})
              </span>
              <h1 className="text-2xl font-black text-[#164B35] mt-0.5">
                {report.diagnosis?.hindiName} ({report.diagnosis?.detectedProblem})
              </h1>
              <p className="text-xs text-[#5F6F65]">
                किसान: {report.farmerName} • गाँव: {report.village}, {report.taluka} ({report.district})
              </p>
            </div>
            <div className="text-right text-xs">
              <span className="font-mono text-[#5F6F65] block">{report.timestamp}</span>
              <span className="text-emerald-700 font-bold">
                एआई आत्मविश्वास: {(Number(report.diagnosis?.confidenceScore || 0.9) * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-black/5 border border-[#DDE7DF]">
              <img
                src={report.imageUrl}
                alt="High resolution lesion"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-[#F8F7F0] p-4 rounded-2xl space-y-1">
                <span className="font-bold text-[#164B35] block">
                  लक्षण व माइक्रो-क्लाइमेट सहसंबंध:
                </span>
                <p className="text-[#5F6F65] leading-relaxed">
                  {report.diagnosis?.environmentalRiskCorrelation}
                </p>
              </div>

              <div>
                <label className="block font-bold text-[#202D25] mb-1">
                  लैब रेफरल निर्देश / कल्चर जांच टिप्पणी:
                </label>
                <textarea
                  rows={3}
                  value={labNotes}
                  onChange={e => setLabNotes(e.target.value)}
                  placeholder="कल्चर मीडिया, पत्ती का नमूना संग्रह व जीवाणु/विषाणु जांच निर्देश..."
                  className="w-full p-3 rounded-xl border border-[#DDE7DF] text-xs focus:outline-none focus:ring-2 focus:ring-[#287A50]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleReferLab}
                  className="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <FlaskConical size={14} />
                  <span>प्रयोगशाला जांच हेतु भेजें</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
