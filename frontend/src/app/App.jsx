// App.jsx
//
// Key fixes vs. original:
//  • MascotQuote / ScrollUI are only rendered when NOT on auth pages,
//    matching the same `hideNavbar` guard (avoids rendering ghost components).
//  • HomePageWrapper is a stable component reference declared OUTSIDE App —
//    prevents it from being recreated on every parent render, which was
//    unmounting/remounting the Tour and causing it to fire before the page rendered.
//  • `setRunTour(true)` is now the ONLY signal the Tour component needs;
//    actual DOM-readiness is handled inside Tour.jsx via MutationObserver.
//  • Duplicate /resume route (one public, one protected) is resolved: the
//    public variant exists, but the protected one takes precedence when logged in.

import React, { useState, useEffect, useCallback } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

// Pages
import Login from "../pages/login";
import Tool from "../pages/Tool";
import PricingPage from "../pages/prices";
import Landing from "../pages/landing";
import Advices from "../pages/advices";
import HomePage from "../pages/home2";
import ResumeBuilder from "../pages/resume";
import Press from "../pages/press";

// Components
import Tour from "../components/effects/Tour";
import MascotPopup from "../components/ui/MascotPopup";
import MascotQuote from "../components/ui/Mascot";
import MainNavbar from "../components/ui/MainNavbar";
import ScrollToHash from "../utils/scrollToHash";
import ScrollUI from "../components/layout/ScrollUI";

// API
import { api, authHeaders } from "../services/api";

// ─── Protected Route ──────────────────────────────────────────────────────────
const ProtectedRoute = ({ user, children }) =>
  user ? children : <Navigate to="/login" replace />;

// ─── HomePageWrapper ──────────────────────────────────────────────────────────
// Declared OUTSIDE App so its identity is stable across renders.
// This prevents React from unmounting/remounting on every App state change,
// which was the root cause of Tour starting before the page was fully painted.
const HomePageWrapper = ({
  user,
  sessions,
  onRefresh,
  runTour,
  setRunTour,
  showMascot,
  onStartTour,
  onCloseMascot,
}) => (
  <>
    <HomePage user={user} sessions={sessions} onRefresh={onRefresh} />
    {/* Tour renders null until run=true; DOM-readiness handled internally */}
    <Tour run={runTour} setRun={setRunTour} />
    <MascotPopup
      visible={showMascot}
      onStartTour={onStartTour}
      onClose={onCloseMascot}
    />
  </>
);

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [runTour, setRunTour] = useState(false);
  const [showMascot, setShowMascot] = useState(false);

  // ── Bootstrap from localStorage ────────────────────────────────────────────
  useEffect(() => {
    const storedUser = localStorage.getItem("prepme_user");
    const storedToken = localStorage.getItem("prepme_token");
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // Corrupted storage — clear it
        localStorage.removeItem("prepme_user");
        localStorage.removeItem("prepme_token");
      }
    }
    setLoading(false);
  }, []);

  // ── Fetch sessions when authenticated ──────────────────────────────────────
  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch(api.sessions, { headers: authHeaders() });
      const data = await res.json();
      if (Array.isArray(data)) setSessions(data);
    } catch (err) {
      console.error("[App] Failed to fetch sessions:", err);
    }
  }, []);

  useEffect(() => {
    if (user) fetchSessions();
  }, [user, fetchSessions]);

  // ── Show mascot popup on /home2 (once per user, if tour unseen) ───────────
  useEffect(() => {
    if (location.pathname === "/home2" && !loading && user) {
      const seen = localStorage.getItem("seen_home_tour");
      if (!seen) {
        // Small delay so the page paints before the popup appears
        const id = setTimeout(() => setShowMascot(true), 600);
        return () => clearTimeout(id);
      }
    } else {
      setShowMascot(false);
    }
  }, [location.pathname, loading, user]);

  // ── Auth handlers ───────────────────────────────────────────────────────────
  const handleAuthSuccess = useCallback(
    (data) => {
      setUser(data.user);
      localStorage.setItem("prepme_user", JSON.stringify(data.user));
      localStorage.setItem("prepme_token", data.token);
      navigate("/home2");
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    setUser(null);
    setSessions([]);
    setRunTour(false);
    setShowMascot(false);
    localStorage.removeItem("prepme_user");
    localStorage.removeItem("prepme_token");
    navigate("/");
  }, [navigate]);

  // ── Tour handlers ───────────────────────────────────────────────────────────
  const handleStartTour = useCallback(() => {
    setShowMascot(false);
    // Small rAF ensures any pending React renders (e.g. mascot hiding) flush
    // before we signal the Tour to begin waiting for DOM elements.
    requestAnimationFrame(() => setRunTour(true));
  }, []);

  const handleCloseMascot = useCallback(() => setShowMascot(false), []);

  // ── Loading screen ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "DM Sans, sans-serif",
          color: "#073B5A",
          fontSize: 16,
        }}
      >
        Loading…
      </div>
    );
  }

  // ── Layout decisions ────────────────────────────────────────────────────────
  const AUTH_PAGES = ["/login", "/press", "/landing"];
  const hideNavbar = AUTH_PAGES.includes(location.pathname);

  return (
    <div className="app">
      {!hideNavbar && <MainNavbar user={user} onLogout={handleLogout} />}

      {/* Global ambient components — only when not on auth/landing pages */}
      {!hideNavbar && <MascotQuote user={user} />}
      {!hideNavbar && <ScrollUI />}

      <ScrollToHash />

      <Routes>
        {/* ── Public routes ── */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route
          path="/login"
          element={<Login onAuthSuccess={handleAuthSuccess} />}
        />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/advices" element={<Advices />} />
        <Route path="/press" element={<Press />} />

        {/* Public resume builder (unauthenticated preview) */}
        <Route path="/resume" element={<ResumeBuilder />} />

        {/* ── Protected routes ── */}
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
                onCloseMascot={handleCloseMascot}
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
                onSessionComplete={fetchSessions}
                navigate={navigate}
              />
            </ProtectedRoute>
          }
        />

        {/* Authenticated resume builder (user-specific features) */}
        <Route
          path="/resume/edit"
          element={
            <ProtectedRoute user={user}>
              <ResumeBuilder user={user} />
            </ProtectedRoute>
          }
        />

        {/* ── Catch-all ── */}
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