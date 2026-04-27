import React, { useState, useEffect, useCallback } from "react";
import Setup from "../features/ToolPage/Setup";
import Interview from "../features/ToolPage/Interview";
import Sessions from "../features/ToolPage/Sessions";
import Evaluation from "../features/ToolPage/Evaluation";
import { api, authHeaders } from "../services/api";
import "../styles/global.css";
import SplashCursor from "../components/effects/splashCursor";

export default function Tool({ onLogout, user, navigate, onSessionComplete }) {
  const [view, setView] = useState("setup");
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [interviewEnded, setInterviewEnded] = useState(false);   // NEW

  const handleEndSession = async (sessionId) => {
    try {
      console.log("Ending session:", sessionId);
      setLoading(true);

      const res = await fetch(api.sessionById(sessionId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ status: "completed" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setActiveSession(data.session || null);
      setEvaluation(data.session?.evaluation || null);

      await fetchSessions();

      if (onSessionComplete) {
        onSessionComplete();
      }

      if (data.session?.evaluation) {
        setView("evaluation");
      } else {
        setView("sessions");
      }
    } catch (err) {
      setError(err.message || "Failed to end session");
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch(api.sessions, {
        headers: authHeaders(),
      });

      const data = await res.json();
      if (Array.isArray(data)) {
        setSessions(data);
      }
    } catch (err) {
      console.error("Failed to fetch sessions:", err);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const startSession = async ({ field, level, interviewType }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(api.sessions, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ field, level, interviewType }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setActiveSession(data.session);
      fetchSessions();
      setView("interview");
    } catch (err) {
      setError(err.message || "Failed to start interview.");
    } finally {
      setLoading(false);
    }
  };

  // UPDATED: show thank‑you message, then countdown, then redirect
  const sendMessage = async (sessionId, userMessage) => {
    const res = await fetch(api.interview, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ sessionId, userMessage }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    // If the interview is complete (evaluation returned by backend)
    if (data.evaluation) {
      setEvaluation(data.evaluation);

      // Append a final thank‑you message from the AI if the last message empty
      const updatedMessages = [...data.session.messages];
      const lastMsg = updatedMessages[updatedMessages.length - 1];
      const cleanContent = lastMsg?.content
        ?.replace(/<evaluation>[\s\S]*?<\/evaluation>/g, "")
        .trim();

      if (!cleanContent) {
        // Ensure a thank‑you message is shown
        updatedMessages.push({
          role: "assistant",
          content:
            "Thank you for completing this interview! Your responses have been recorded. You can review them and your evaluation in the Sessions tab.",
        });
      }

      setActiveSession({
        ...data.session,
        messages: updatedMessages,
      });

      setInterviewEnded(true);     // triggers countdown in Interview component
      fetchSessions();

      if (onSessionComplete) {
        onSessionComplete();
      }

      // Note: view does NOT change yet – wait for countdown
      return data;
    }

    // Normal flow – update active session
    setActiveSession(data.session);
    fetchSessions();
    return data;
  };

  // Called by Interview component after the 5‑second countdown
  const handleInterviewComplete = () => {
    setInterviewEnded(false);
    setView("sessions");      // go directly to sessions list
    setActiveSession(null);   // re‑fetch from sessions when needed
  };

  const loadSession = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(api.sessionById(id), {
        headers: authHeaders(),
      });

      const data = await res.json();
      setActiveSession(data);

      if (data.evaluation) {
        setEvaluation(data.evaluation);
        setView("evaluation");
      } else {
        setView("interview");
      }
    } catch (err) {
      setError("Failed to load session.");
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (id) => {
    try {
      const res = await fetch(api.sessionById(id), {
        method: "DELETE",
        headers: authHeaders(),
      });

      if (!res.ok) throw new Error("Failed to delete session");

      await fetchSessions();

      if (onSessionComplete) {
        onSessionComplete();
      }

      if (activeSession?._id === id || activeSession?.id === id) {
        setActiveSession(null);
        setView("setup");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="tool-page">
      <SplashCursor
        SIM_RESOLUTION={224}
        DYE_RESOLUTION={640}
        DENSITY_DISSIPATION={2.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.6}
        CURL={0}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={3000}
        COLOR_UPDATE_SPEED={8}
      />

      {error && (
        <div className="global-error" onClick={() => setError(null)}>
          ⚠ {error} <span>✕</span>
        </div>
      )}

      {view === "setup" && (
        <Setup onStart={startSession} loading={loading} />
      )}

      {view === "interview" && activeSession && (
        <Interview
          session={activeSession}
          onSend={sendMessage}
          onEnd={handleEndSession}
          onBack={() => setView("setup")}
          interviewEnded={interviewEnded}               // NEW
          onInterviewComplete={handleInterviewComplete}  // NEW
        />
      )}

      {view === "sessions" && (
        <Sessions
          sessions={sessions}
          onLoad={loadSession}
          onDelete={deleteSession}
          loading={loading}
        />
      )}

      {view === "evaluation" && evaluation && (
        <Evaluation
          evaluation={evaluation}
          session={activeSession}
          onBack={() => setView("sessions")}
          onNewInterview={() => {
            setEvaluation(null);
            setView("setup");
          }}
        />
      )}
    </div>
  );
}