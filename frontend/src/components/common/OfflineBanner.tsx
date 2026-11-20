import React from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle } from 'lucide-react';
import { useOffline } from '../../context/OfflineContext';
import { useLanguage } from '../../context/LanguageContext';

export const OfflineBanner: React.FC = () => {
  const { isOnline, queuedReports, syncReports, isSyncing, syncSuccessMessage } = useOffline();
  const { t } = useLanguage();

  if (syncSuccessMessage) {
    return (
      <div className="bg-[#329568] text-white px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-center space-x-2 animate-fadeIn">
        <CheckCircle size={16} />
        <span>{syncSuccessMessage}</span>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="bg-[#F4B942] text-[#202D25] px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2">
          <WifiOff size={16} className="text-amber-900 animate-pulse" />
          <span>{t('offline_status')}</span>
        </div>
        {queuedReports.length > 0 && (
          <span className="bg-amber-800 text-white text-[11px] px-2 py-0.5 rounded-full font-bold">
            {queuedReports.length} रिपोर्ट सुरक्षित (Queued)
          </span>
        )}
      </div>
    );
  }

  if (queuedReports.length > 0) {
    return (
      <div className="bg-[#EAF4E9] text-[#164B35] border-b border-[#287A50]/20 px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wifi size={16} className="text-[#329568]" />
          <span>इंटरनेट चालू है! {queuedReports.length} रिपोर्ट सर्वर पर भेजने के लिए तैयार है।</span>
        </div>
        <button
          onClick={syncReports}
          disabled={isSyncing}
          className="flex items-center space-x-1.5 bg-[#164B35] text-white px-3 py-1 rounded text-xs font-semibold hover:bg-[#287A50] transition-colors disabled:opacity-50"
        >
          <RefreshCw size={12} className={isSyncing ? "animate-spin" : ""} />
          <span>{isSyncing ? "सिंक हो रहा है..." : "सिंक करें (Sync)"}</span>
        </button>
      </div>
    );
  }

  return null;
};
