import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { CityProvider } from './context/CityContext';
import { AuthModalProvider } from './context/AuthModalContext';
import { RoleDemoBar } from './components/layout/RoleDemoBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AuthGateModal } from './components/common/AuthGateModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { FindTechniciansPage } from './pages/FindTechniciansPage';
import { TechnicianDetailPage } from './pages/TechnicianDetailPage';
import { PostRequestPage } from './pages/PostRequestPage';
import { TechnicianRegisterPage } from './pages/TechnicianRegisterPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { TechnicianDashboardPage } from './pages/TechnicianDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { ChatPage } from './pages/ChatPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top component on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
        <CityProvider>
        <AuthModalProvider>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
            <ScrollToTop />
            <RoleDemoBar />
            <Navbar />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/technicians" element={<FindTechniciansPage />} />
                <Route path="/technicians/:id" element={<TechnicianDetailPage />} />
                <Route path="/post-request" element={<PostRequestPage />} />
                <Route path="/technician/register" element={<TechnicianRegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/customer/dashboard" element={<CustomerDashboardPage />} />
                <Route path="/customer/requests" element={<CustomerDashboardPage />} />
                <Route path="/technician/dashboard" element={<TechnicianDashboardPage />} />
                <Route path="/technician/radar" element={<TechnicianDashboardPage />} />
                <Route path="/technician/schedule" element={<TechnicianDashboardPage />} />
                <Route path="/technician/services" element={<TechnicianDashboardPage />} />
                <Route path="/technician/earnings" element={<TechnicianDashboardPage />} />
                <Route path="/technician/reviews" element={<TechnicianDashboardPage />} />
                <Route path="/technician/pro" element={<TechnicianDashboardPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/*" element={<AdminDashboardPage />} />
                <Route path="/my-bookings" element={<MyBookingsPage />} />
                <Route path="/my-bookings/:id" element={<OrderDetailPage />} />
                <Route path="/order-history" element={<OrderHistoryPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <Footer />
            <AuthGateModal />
          </div>
        </AuthModalProvider>
        </CityProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

