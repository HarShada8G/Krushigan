import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CropReport } from '../types';

interface OfflineContextType {
  isOnline: boolean;
  queuedReports: CropReport[];
  queueReport: (report: CropReport) => void;
  syncReports: () => Promise<void>;
  isSyncing: boolean;
  syncSuccessMessage: string | null;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);

  const [queuedReports, setQueuedReports] = useState<CropReport[]>(() => {
    const saved = localStorage.getItem('cropguardian_offline_queue');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cropguardian_offline_queue', JSON.stringify(queuedReports));
  }, [queuedReports]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Auto-trigger sync if there are queued reports
      if (queuedReports.length > 0) {
        syncReports();
      }
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [queuedReports.length]);

  const queueReport = (report: CropReport) => {
    setQueuedReports(prev => [report, ...prev]);
  };

  const syncReports = async () => {
    if (queuedReports.length === 0) return;
    setIsSyncing(true);
    try {
      // Simulate network sync transmission to backend API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Append queued reports into farmer history storage
      const existingHistoryStr = localStorage.getItem('cropguardian_reports_history');
      let history: CropReport[] = existingHistoryStr ? JSON.parse(existingHistoryStr) : [];
      
      const newItems = queuedReports.map(item => ({
        ...item,
        status: 'pending' as const
      }));

      localStorage.setItem('cropguardian_reports_history', JSON.stringify([...newItems, ...history]));
      
      const count = queuedReports.length;
      setQueuedReports([]);
      setSyncSuccessMessage(`${count} ऑफ़लाइन रिपोर्ट सफलतापूर्वक सर्वर से सिंक हो गई! (${count} report(s) synced)`);

      setTimeout(() => {
        setSyncSuccessMessage(null);
      }, 4000);
    } catch (e) {
      console.error('Error syncing reports:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <OfflineContext.Provider
      value={{
        isOnline,
        queuedReports,
        queueReport,
        syncReports,
        isSyncing,
        syncSuccessMessage
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = (): OfflineContextType => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};
