import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Browse from './pages/Browse';
import ContentDetails from './pages/ContentDetails';
import UserDashboard from './pages/UserDashboard';
import SecureWatch from './pages/SecureWatch';
import FreeWatch from './pages/FreeWatch';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import About from './pages/About';
import { PrivacyPolicy, TermsOfService, RefundPolicy } from './pages/Legal';

const NotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 mb-8">The page you are looking for does not exist.</p>
        <a href="#/" className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Return Home
        </a>
    </div>
);

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Standalone Routes (No Navigation) */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/watch/:bookingId" element={<SecureWatch />} />
          <Route path="/play/:id" element={<FreeWatch />} />
          
          {/* Main Application Layout Routes */}
          <Route element={<Layout><Outlet /></Layout>}>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/about" element={<About />} />
              <Route path="/content/:id" element={<ContentDetails />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              
              {/* Legal Pages */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/refund" element={<RefundPolicy />} />

              {/* Catch-all for inside the layout */}
              <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;