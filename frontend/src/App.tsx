import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { OfflineProvider } from './context/OfflineContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Farmer Pages
import { FarmerDashboardPage } from './pages/farmer/FarmerDashboardPage';
import { FarmerScanPage } from './pages/farmer/FarmerScanPage';
import { FarmerResultPage } from './pages/farmer/FarmerResultPage';
import { FarmerMyCropsPage } from './pages/farmer/FarmerMyCropsPage';
import { FarmerAdvisoryPage } from './pages/farmer/FarmerAdvisoryPage';
import { FarmerHistoryPage } from './pages/farmer/FarmerHistoryPage';
import { FarmerProfilePage } from './pages/farmer/FarmerProfilePage';

// Officer Pages
import { OfficerDashboardPage } from './pages/officer/OfficerDashboardPage';
import { OfficerMapPage } from './pages/officer/OfficerMapPage';
import { OfficerReportsPage } from './pages/officer/OfficerReportsPage';
import { OfficerValidationPage } from './pages/officer/OfficerValidationPage';
import { OfficerFarmersPage } from './pages/officer/OfficerFarmersPage';
import { OfficerAlertsPage } from './pages/officer/OfficerAlertsPage';
import { OfficerAnalyticsPage } from './pages/officer/OfficerAnalyticsPage';

// Expert Pages
import { ExpertCasePage } from './pages/expert/ExpertCasePage';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <OfflineProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Farmer Portal Routes - Fully accessible to all public visitors & farmers */}
              <Route path="/farmer/dashboard" element={<FarmerDashboardPage />} />
              <Route path="/farmer/scan" element={<FarmerScanPage />} />
              <Route path="/farmer/result" element={<FarmerResultPage />} />
              <Route path="/farmer/my-crops" element={<FarmerMyCropsPage />} />
              <Route path="/farmer/advisory" element={<FarmerAdvisoryPage />} />
              <Route path="/farmer/history" element={<FarmerHistoryPage />} />
              <Route path="/farmer/profile" element={<FarmerProfilePage />} />

              {/* Surveillance & GIS Public Views - Freely browseable without login */}
              <Route path="/officer/dashboard" element={<OfficerDashboardPage />} />
              <Route path="/officer/map" element={<OfficerMapPage />} />
              <Route path="/officer/reports" element={<OfficerReportsPage />} />
              <Route path="/officer/analytics" element={<OfficerAnalyticsPage />} />

              {/* Genuinely Protected Administrative & Expert Operations */}
              <Route path="/officer/alerts" element={<ProtectedRoute allowedRoles={['officer', 'admin']}><OfficerAlertsPage /></ProtectedRoute>} />
              <Route path="/officer/farmers" element={<ProtectedRoute allowedRoles={['officer', 'expert', 'admin']}><OfficerFarmersPage /></ProtectedRoute>} />
              <Route path="/officer/validation" element={<ProtectedRoute allowedRoles={['officer', 'expert', 'admin']}><OfficerValidationPage /></ProtectedRoute>} />

              {/* Expert Portal Routes */}
              <Route path="/expert/validation" element={<ProtectedRoute allowedRoles={['expert', 'officer', 'admin']}><OfficerValidationPage /></ProtectedRoute>} />
              <Route path="/expert/case/:id" element={<ProtectedRoute allowedRoles={['expert', 'officer', 'admin']}><ExpertCasePage /></ProtectedRoute>} />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </OfflineProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
