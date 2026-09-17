import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import Dashboard from './pages/Dashboard';
import ClientRegistryPage from './pages/ClientRegistryPage';
import OrderTicketsPage from './pages/OrderTicketsPage';
import CuttingPatternsPage from './pages/CuttingPatternsPage';
import FabricInventoryPage from './pages/FabricInventoryPage';
import AtelierSetupPage from './pages/AtelierSetupPage';
import PrintSlipModal from './components/PrintSlipModal';
import BackupModal from './components/BackupModal';
import ToastContainer from './components/Toast';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-container">
          {/* Fixed Left Navigation Sidebar */}
          <Sidebar />

          {/* Main Viewport */}
          <div className="atelier-viewport">
            <TopHeader />

            {/* Application Pages */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<ClientRegistryPage />} />
              <Route path="/orders" element={<OrderTicketsPage />} />
              <Route path="/cutting" element={<CuttingPatternsPage />} />
              <Route path="/fabrics" element={<FabricInventoryPage />} />
              <Route path="/setup" element={<AtelierSetupPage />} />
            </Routes>
          </div>
        </div>

        {/* Global Modals & Notifications */}
        <PrintSlipModal />
        <BackupModal />
        <ToastContainer />
      </BrowserRouter>
    </AppProvider>
  );
}
