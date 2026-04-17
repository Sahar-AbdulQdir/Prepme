// App.jsx - Updated to start at landing page
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

// Pages
import Login from "./pages/login";
import Tool from "./pages/Tool";
import PricingPage from "./pages/prices";
import Landing from "./pages/landing";
import Advices from "./pages/advices";
import HomePage from "./pages/home2";
import ResumeBuilder from "./pages/resume";
import Tour from "./components/Tour";
import MascotPopup from "./components/MascotPopup";
import ScrollToHash from "./components/scrollToHash";
// API
import { api, authHeaders } from "./api";
// Navbar
import MainNavbar from "./components/MainNavbar";

// Protected Route Component
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Wrapper component for HomePage with Tour and Mascot
const HomePageWrapper = ({ user, sessions, onRefresh, runTour, setRunTour, showMascot, onStartTour, onCloseMascot }) => {
  return (
    <>
      <HomePage 
        user={user} 
        sessions={sessions} 
        onRefresh={onRefresh}
      />
      <Tour run={runTour} setRun={setRunTour} />
      <MascotPopup 
        visible={showMascot} 
        onStartTour={onStartTour}
        onClose={onCloseMascot}
      />
    </>
  );
};

export default function App() {
  const [runTour, setRunTour] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showMascot, setShowMascot] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);

  // Fetch user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("prepme_user");
    const storedToken = localStorage.getItem("prepme_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Fetch sessions when user is authenticated
  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const fetchSessions = async () => {
    try {
      const res = await fetch(api.sessions, {
        headers: authHeaders(),
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setSessions(data);
      }
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    }
  };

  // Show mascot popup on home2 only if tour hasn't been seen
  useEffect(() => {
    if (location.pathname === "/home2" && !loading && user) {
      const seen = localStorage.getItem("seen_home_tour");
      if (!seen) {
        const timer = setTimeout(() => {
          setShowMascot(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    } else {
      setShowMascot(false);
    }
  }, [location.pathname, loading, user]);

  const handleAuthSuccess = (data) => {
    setUser(data.user);
    localStorage.setItem("prepme_user", JSON.stringify(data.user));
    localStorage.setItem("prepme_token", data.token);
    navigate("/home2");
  };

  const handleLogout = () => {
    setUser(null);
    setSessions([]);
    localStorage.removeItem("prepme_user");
    localStorage.removeItem("prepme_token");
    navigate("/");
  };

  const handleStartTour = () => {
    setRunTour(true);
    setShowMascot(false);
  };

  const handleSessionComplete = () => {
    fetchSessions();
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'DM Sans, sans-serif',
        color: '#073B5A'
      }}>
        Loading...
      </div>
    );
  }

  // Hide navbar on landing page, login page, and root path
  const hideNavbar =
    location.pathname === "/login" || 
    location.pathname === "/landing" || 
    location.pathname === "/";

  return (
    <div className="app">
      {!hideNavbar && (
        <MainNavbar user={user} onLogout={handleLogout} />
      )}
      <ScrollToHash />

      <Routes>
        {/* Public Routes - Accessible without authentication */}
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login onAuthSuccess={handleAuthSuccess} />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/advices" element={<Advices />} />
        
        {/* Protected Routes - Require authentication */}
        <Route
          path="/home2"
          element={
            <ProtectedRoute user={user}>
              <HomePageWrapper 
                user={user}
                sessions={sessions}
                onRefresh={fetchSessions}
                runTour={runTour}
                setRunTour={setRunTour}
                showMascot={showMascot}
                onStartTour={handleStartTour}
                onCloseMascot={() => setShowMascot(false)}
              />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/tool"
          element={
            <ProtectedRoute user={user}>
              <Tool 
                user={user} 
                onLogout={handleLogout} 
                onSessionComplete={handleSessionComplete}
                navigate={navigate}
              />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/resume"
          element={
            <ProtectedRoute user={user}>
              <ResumeBuilder user={user} />
            </ProtectedRoute>
          }
        />
        
        {/* Catch-all route - redirect to appropriate page based on auth status */}
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/home2" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}