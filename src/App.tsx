import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import WelcomePage from './components/WelcomePage';
import LoginForm from './components/auth/LoginForm';
import AdminDashboard from './components/dashboard/AdminDashboard';
import ManagerDashboard from './components/dashboard/ManagerDashboard';
import CashierDashboard from './components/dashboard/CashierDashboard';
import StudentDashboard from './components/dashboard/StudentDashboard';
import AnimatedBackground from './components/common/AnimatedBackground';
import LoadingSpinner from './components/common/LoadingSpinner';

const AppContent: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, []);

  const handleGetStarted = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setShowWelcome(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (showWelcome) {
    return <WelcomePage onGetStarted={handleGetStarted} />;
  }

  if (!user) {
    return (
      <>
        <AnimatedBackground />
        <LoginForm />
      </>
    );
  }

  const getDashboardComponent = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'cashier':
        return <CashierDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <>
      <AnimatedBackground />
      {getDashboardComponent()}
    </>
  );
};



function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/*" element={<AppContent />} />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1f2937',
                color: '#ffffff',
                borderRadius: '12px',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;