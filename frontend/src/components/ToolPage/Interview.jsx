// Interview.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  MdCallEnd,
  MdVideocam,
  MdVideocamOff,
  MdMic,
  MdMicOff,
  MdSwitchCamera,
  MdSend,
  MdArrowBack,
  MdTimer,
  MdQuestionAnswer,
  MdRecordVoiceOver,
  MdKeyboard,
  MdPerson,
  MdSmartToy,
  MdBarChart,
  MdClose,
  MdWarning,
  MdMenu,
} from "react-icons/md";

export default function Interview({ session, onSend, onEnd, onBack }) {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [listening, setListening] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [error, setError] = useState(null);
  const [endNotice, setEndNotice] = useState(null);
  const [mode, setMode] = useState("read");
  const [voiceGender, setVoiceGender] = useState("male");
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const chatContainerRef = useRef(null);

  const messages = useMemo(() => session.messages || [], [session.messages]);

  // Responsive breakpoint detection
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const userMessages = messages.filter((m) => m.role === "user").length;
    setQuestionCount(userMessages);
  }, [messages]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    };
    scrollToBottom();
  }, [messages, aiTyping]);

  const toggleVoiceInput = useCallback(() => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      setInput("");
      recognitionRef.current.start();
      setListening(true);
    }
  }, [listening]);

  const handleSend = useCallback(async () => {
    let msg = input.trim();
    if (mode === "speak" && !msg && listening) {
      toggleVoiceInput();
      return;
    }
    if (!msg || sending) return;
    setInput("");
    setSending(true);
    setAiTyping(true);
    setError(null);
    try {
      await onSend(session.id || session._id, msg);
    } catch (err) {
      setError(err.message || "Failed to send message.");
    } finally {
      setSending(false);
      setAiTyping(false);
      inputRef.current?.focus();
    }
  }, [input, mode, listening, sending, onSend, session.id, session._id, toggleVoiceInput]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.onresult = (e) => {
        const transcript = Array.from(e.results)
          .map((r) => r[0].transcript)
          .join("");
        setInput(transcript);
        if (e.results[0].isFinal) {
          setTimeout(() => handleSend(), 100);
        }
      };
      recognition.onend = () => setListening(false);
      recognition.onerror = () => setListening(false);
      recognitionRef.current = recognition;
    }
    return () => {
      window.speechSynthesis?.cancel();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [handleSend]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setShowEndConfirm(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "user",
          width: { ideal: isMobile ? 640 : 1280 },
          height: { ideal: isMobile ? 480 : 720 }
        },
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraEnabled(true);
    } catch (err) {
      setError("Camera blocked. Check browser & system permissions.");
    }
  };

  const toggleCamera = () => {
    if (!streamRef.current) {
      startCamera();
      return;
    }
    const videoTrack = streamRef.current.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setCameraEnabled(videoTrack.enabled);
    }
  };

  const switchCamera = async () => {
    if (!streamRef.current) return;
    const currentTrack = streamRef.current.getVideoTracks()[0];
    const settings = currentTrack.getSettings();
    const currentFacing = settings.facingMode || "user";
    const newFacing = currentFacing === "user" ? "environment" : "user";
    streamRef.current.getTracks().forEach((track) => track.stop());
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: newFacing,
          width: { ideal: isMobile ? 640 : 1280 },
          height: { ideal: isMobile ? 480 : 720 }
        },
      });
      streamRef.current = newStream;
      videoRef.current.srcObject = newStream;
    } catch {
      setError("Could not switch camera");
    }
  };

  const speakMessage = useCallback(
    (text) => {
      if (!window.speechSynthesis || mode !== "speak") return;
      window.speechSynthesis.cancel();
      const clean = text
        .replace(/<evaluation>[\s\S]*?<\/evaluation>/g, "")
        .trim();
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1;
      utterance.pitch = voiceGender === "male" ? 1 : 1.3;
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) {
        const selected = voices.find((v) =>
          voiceGender === "male"
            ? v.name.includes("Google UK English Male") ||
              v.name.includes("Male")
            : v.name.includes("Google UK English Female") ||
              v.name.includes("Female")
        );
        if (selected) utterance.voice = selected;
      }
      window.speechSynthesis.speak(utterance);
    },
    [mode, voiceGender]
  );

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.role === "assistant" && mode === "speak") {
      speakMessage(lastMsg.content);
    }
  }, [messages, mode, speakMessage]);

  const handleEndCall = async () => {
    setEndNotice({
      type: "info",
      message:
        questionCount < 5
          ? `Ending early (${questionCount}/5 answers). Evaluation will be partial.`
          : "Ending interview... preparing your evaluation",
    });
    clearInterval(timerRef.current);
    try {
      await onEnd?.(session.id || session._id);
    } catch {
      setEndNotice({ type: "error", message: "Failed to end interview. Try again." });
      return;
    }
    setTimeout(() => setEndNotice(null), 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <style>{responsiveStyles}</style>
      <div className="interview-root" style={styles.root}>
        {/* End Confirm Modal */}
        {showEndConfirm && (
          <div className="modal-overlay" style={styles.modalOverlay}>
            <div className="modal-box" style={styles.modalBox}>
              <div style={styles.modalHeader}>
                <span style={styles.modalTitle}>End Interview?</span>
                <button className="modal-close" style={styles.modalClose} onClick={() => setShowEndConfirm(false)}>
                  <MdClose size={18} />
                </button>
              </div>
              <p style={styles.modalBody}>
                You have answered <strong style={{ color: "#073B5A" }}>{questionCount}</strong> questions.
                Are you sure you want to end this session?
              </p>
              <div style={styles.modalActions}>
                <button className="cancel-btn" style={styles.cancelBtn} onClick={() => setShowEndConfirm(false)}>
                  Cancel
                </button>
                <button
                  className="confirm-btn"
                  style={styles.confirmBtn}
                  disabled={sending}
                  onClick={async () => {
                    setShowEndConfirm(false);
                    await handleEndCall();
                  }}
                >
                  End Interview
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notice */}
        {endNotice && (
          <div className="toast" style={{ ...styles.toast, ...(endNotice.type === "error" ? styles.toastError : {}) }}>
            {endNotice.type === "error" ? <MdWarning size={16} /> : null}
            {endNotice.message}
          </div>
        )}

        {/* Header */}
        <header className="header" style={styles.header}>
          <div className="header-left">
            <button className="back-btn" style={styles.backBtn} onClick={onBack}>
              <MdArrowBack size={18} />
              <span className="back-text">Back</span>
            </button>

            <div className="session-info" style={styles.sessionInfo}>
              <span className="session-title" style={styles.sessionTitle}>{session.title}</span>
              <div className="tag-row" style={styles.tagRow}>
                {[session.field, session.level, session.interviewType].map((t) => (
                  <span key={t} className="tag" style={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={styles.mobileMenuBtn}
          >
            <MdMenu size={24} />
          </button>

          <div className={`header-right ${mobileMenuOpen ? 'mobile-open' : ''}`} style={styles.headerRight}>
            <div className="stat-chip" style={styles.statChip}>
              <MdTimer size={15} color="#073B5A" />
              <span className="stat-text" style={styles.statText}>{formatTime(elapsedSeconds)}</span>
            </div>
            <div className="stat-chip" style={styles.statChip}>
              <MdQuestionAnswer size={15} color="#073B5A" />
              <span className="stat-text" style={styles.statText}>{questionCount}/5+ Q&A</span>
            </div>

            <select
              className="voice-select"
              style={styles.select}
              value={voiceGender}
              onChange={(e) => setVoiceGender(e.target.value)}
            >
              <option value="male">Male Voice</option>
              <option value="female">Female Voice</option>
            </select>

            <button
              className={`mode-btn ${mode === "speak" ? "active" : ""}`}
              style={{ ...styles.iconBtn, ...(mode === "speak" ? styles.iconBtnActive : {}) }}
              onClick={() => setMode(mode === "read" ? "speak" : "read")}
              title={mode === "speak" ? "Speak Mode" : "Read Mode"}
            >
              {mode === "speak" ? <MdRecordVoiceOver size={18} /> : <MdKeyboard size={18} />}
              <span className="mode-text">{mode === "speak" ? "Speak" : "Type"}</span>
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="main" style={styles.main}>
          {/* Video Panel */}
          <aside className="video-panel" style={styles.videoPanel}>
            <div className="video-wrap" style={styles.videoWrap}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="video"
                style={{
                  ...styles.video,
                  opacity: cameraEnabled ? 1 : 0,
                }}
              />
              {!cameraEnabled && (
                <div className="camera-off-placeholder" style={styles.cameraOffPlaceholder}>
                  <MdVideocamOff size={isMobile ? 32 : 40} color="rgba(255,255,255,0.4)" />
                  <span className="camera-off-text" style={styles.cameraOffText}>Camera off</span>
                </div>
              )}
              <div className="video-label" style={styles.videoLabel}>
                <MdPerson size={13} />
                <span>You</span>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="video-controls" style={styles.videoControls}>
              <button
                className={`video-btn ${cameraEnabled ? "" : "off"}`}
                style={{ ...styles.videoBtn, ...(cameraEnabled ? {} : styles.videoBtnOff) }}
                onClick={toggleCamera}
                title={cameraEnabled ? "Turn off camera" : "Turn on camera"}
              >
                {cameraEnabled ? <MdVideocam size={isMobile ? 18 : 20} /> : <MdVideocamOff size={isMobile ? 18 : 20} />}
              </button>

              <button
                className={`video-btn ${listening ? "off" : ""}`}
                style={{ ...styles.videoBtn, ...(listening ? styles.videoBtnOff : {}) }}
                onClick={toggleVoiceInput}
                title={listening ? "Stop mic" : "Use mic"}
              >
                {listening ? <MdMicOff size={isMobile ? 18 : 20} /> : <MdMic size={isMobile ? 18 : 20} />}
              </button>

              <button className="video-btn" style={styles.videoBtn} onClick={switchCamera} title="Switch camera">
                <MdSwitchCamera size={isMobile ? 18 : 20} />
              </button>

              <button className="end-call-btn" style={styles.endCallBtn} onClick={() => setShowEndConfirm(true)} title="End interview">
                <MdCallEnd size={isMobile ? 20 : 22} />
              </button>
            </div>

            {/* AI Avatar Panel */}
            <div className="ai-panel" style={styles.aiPanel}>
              <div className="ai-avatar" style={styles.aiAvatar}>
                <MdSmartToy size={isMobile ? 24 : 28} color="white" />
              </div>
              <div className="ai-info" style={styles.aiInfo}>
                <span className="ai-name" style={styles.aiName}>AI Interviewer</span>
                <span className="ai-status" style={styles.aiStatus}>
                  {aiTyping ? (
                    <span className="typing-status" style={styles.typingStatus}>Thinking...</span>
                  ) : (
                    <span style={{ color: "#C3DA70" }}>Ready</span>
                  )}
                </span>
              </div>
            </div>
          </aside>

          {/* Chat Panel */}
          <section className="chat-panel" style={styles.chatPanel}>
            <div className="chat-messages" ref={chatContainerRef} style={styles.chatMessages}>
              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} isMobile={isMobile} />
              ))}
              {aiTyping && (
                <div className="msg-row" style={styles.msgRow}>
                  <div className="avatar-ai" style={styles.avatarAI}>
                    <MdSmartToy size={16} color="white" />
                  </div>
                  <div className="typing-bubble" style={styles.typingBubble}>
                    <span className="dot" style={styles.dot} />
                    <span className="dot" style={{ ...styles.dot, animationDelay: "0.2s" }} />
                    <span className="dot" style={{ ...styles.dot, animationDelay: "0.4s" }} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="input-area" style={styles.inputArea}>
              {error && (
                <div className="error-bar" style={styles.errorBar}>
                  <MdWarning size={15} />
                  <span>{error}</span>
                </div>
              )}
              {mode === "read" ? (
                <div className="input-row" style={styles.inputRow}>
                  <textarea
                    ref={inputRef}
                    className="textarea"
                    style={styles.textarea}
                    rows={isMobile ? 2 : 3}
                    placeholder="Type your answer... (Enter to send, Shift+Enter for new line)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    disabled={sending}
                  />
                  <button
                    className="send-btn"
                    style={{
                      ...styles.sendBtn,
                      opacity: !input.trim() || sending ? 0.45 : 1,
                      cursor: !input.trim() || sending ? "not-allowed" : "pointer",
                    }}
                    onClick={handleSend}
                    disabled={!input.trim() || sending}
                  >
                    {sending ? (
                      <span style={{ fontSize: 13 }}>Sending...</span>
                    ) : (
                      <>
                        <MdSend size={isMobile ? 16 : 18} />
                        <span className="send-text">Send</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="voice-area" style={styles.voiceArea}>
                  <button
                    className={`voice-btn ${listening ? "active" : ""}`}
                    style={{
                      ...styles.voiceBtn,
                      ...(listening ? styles.voiceBtnActive : {}),
                    }}
                    onClick={toggleVoiceInput}
                    disabled={sending}
                  >
                    {listening ? <MdMicOff size={isMobile ? 20 : 22} /> : <MdMic size={isMobile ? 20 : 22} />}
                    <span>{listening ? "Stop Recording" : "Speak Answer"}</span>
                  </button>
                  {input && (
                    <div className="voice-preview" style={styles.voicePreview}>
                      <span className="voice-preview-text" style={styles.voicePreviewText}>"{input}"</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

function MessageBubble({ msg, isMobile }) {
  const isAI = msg.role === "assistant";
  const cleanContent = msg.content
    .replace(/<evaluation>[\s\S]*?<\/evaluation>/g, "")
    .trim();
  const hasEval = /<evaluation>/.test(msg.content);

  return (
    <div
      className="msg-row"
      style={{
        ...styles.msgRow,
        flexDirection: isAI ? "row" : "row-reverse",
      }}
    >
      <div className={`avatar ${isAI ? "avatar-ai" : "avatar-user"}`} style={isAI ? styles.avatarAI : styles.avatarUser}>
        {isAI ? (
          <MdSmartToy size={isMobile ? 14 : 16} color="white" />
        ) : (
          <MdPerson size={isMobile ? 14 : 16} color="#073B5A" />
        )}
      </div>
      <div
        className={`bubble ${isAI ? "bubble-ai" : "bubble-user"}`}
        style={{
          ...styles.bubble,
          ...(isAI ? styles.bubbleAI : styles.bubbleUser),
        }}
      >
        <p style={{ lineHeight: 1.65, fontSize: isMobile ? 13 : 14 }}>{cleanContent}</p>
        {hasEval && (
          <div className="eval-notice" style={styles.evalNotice}>
            <MdBarChart size={isMobile ? 12 : 14} />
            <span>Evaluation complete — view your results above</span>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#f7f9fb",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    color: "#073B5A",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "12px 20px",
    background: "#ffffff",
    borderBottom: "1px solid #e8edf2",
    flexWrap: "wrap",
    position: "relative",
  },
  mobileMenuBtn: {
    display: "none",
    background: "none",
    border: "none",
    color: "#073B5A",
    cursor: "pointer",
    padding: "8px",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 14px",
    borderRadius: 8,
    border: "1px solid #e8edf2",
    background: "white",
    color: "#073B5A",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "background 0.15s",
  },
  sessionInfo: {
    flex: 1,
    minWidth: 0,
  },
  sessionTitle: {
    display: "block",
    color: "#073B5A",
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 5,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tagRow: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  tag: {
    fontSize: 11,
    fontWeight: 500,
    padding: "3px 10px",
    borderRadius: 20,
    background: "rgba(195,218,112,0.18)",
    color: "#2d4a00",
    border: "1px solid rgba(195,218,112,0.3)",
    textTransform: "capitalize",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  statChip: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    background: "#f8fafc",
    borderRadius: 20,
    padding: "5px 12px",
    border: "1px solid #e8edf2",
  },
  statText: {
    fontSize: 12,
    fontWeight: 600,
    color: "#073B5A",
  },
  select: {
    padding: "6px 12px",
    borderRadius: 8,
    border: "1px solid #e8edf2",
    background: "white",
    color: "#073B5A",
    fontSize: 12,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    outline: "none",
  },
  iconBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 14px",
    borderRadius: 8,
    border: "1px solid #e8edf2",
    background: "white",
    color: "#073B5A",
    fontSize: 12,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.15s",
  },
  iconBtnActive: {
    background: "#C3DA70",
    color: "#073B5A",
    border: "1px solid #C3DA70",
  },
  main: {
    display: "flex",
    flex: 1,
    height: "calc(100vh - 61px)",
    overflow: "hidden",
  },
  videoPanel: {
    width: 280,
    background: "#f7f9fb",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    borderRight: "1px solid #e8edf2",
  },
  videoWrap: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    minHeight: 200,
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: "scaleX(-1)",
    display: "block",
    transition: "opacity 0.3s",
  },
  cameraOffPlaceholder: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    background: "#0d1f2d",
  },
  cameraOffText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
  },
  videoLabel: {
    position: "absolute",
    bottom: 10,
    left: 10,
    display: "flex",
    alignItems: "center",
    gap: 4,
    background: "rgba(0,0,0,0.55)",
    color: "white",
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 11,
    backdropFilter: "blur(4px)",
  },
  videoControls: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    padding: "14px 12px",
    background: "#ffffff",
    borderTop: "1px solid #e8edf2",
  },
  videoBtn: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "1px solid #e8edf2",
    background: "#ffffff",
    color: "#073B5A",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
  },
  videoBtnOff: {
    background: "#f1f5f9",
    color: "#94a3b8",
  },
  endCallBtn: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 16px rgba(239,68,68,0.25)",
  },
  aiPanel: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
    background: "#ffffff",
    borderTop: "1px solid #e8edf2",
  },
  aiAvatar: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "#AA7BD9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 8px 18px rgba(170,123,217,0.25)",
  },
  aiInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  aiName: {
    fontSize: 13,
    fontWeight: 600,
    color: "#073B5A",
  },
  aiStatus: {
    fontSize: 11,
    color: "#64748b",
  },
  typingStatus: {
    color: "#AA7BD9",
  },
  chatPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
    overflow: "hidden",
  },
  chatMessages: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  msgRow: {
    display: "flex",
    gap: 10,
    alignItems: "flex-end",
  },
  avatarAI: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#AA7BD9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarUser: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#C3DA70",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  bubble: {
    maxWidth: "68%",
    padding: "12px 16px",
    borderRadius: 16,
    fontSize: 14,
    lineHeight: 1.65,
  },
  bubbleAI: {
    background: "#ffffff",
    border: "1px solid #e8edf2",
    borderBottomLeftRadius: 4,
    boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
    color: "#073B5A",
  },
  bubbleUser: {
    background: "#073B5A",
    color: "white",
    borderBottomRightRadius: 4,
    boxShadow: "0 6px 18px rgba(7,59,90,0.15)",
  },
  typingBubble: {
    background: "white",
    border: "1px solid #e8edf2",
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    gap: 5,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  dot: {
    display: "inline-block",
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#AA7BD9",
    animation: "blink 1.3s infinite",
  },
  evalNotice: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    padding: "7px 12px",
    background: "rgba(195,218,112,0.15)",
    color: "#3a6600",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 500,
  },
  inputArea: {
    padding: "14px 20px 18px",
    background: "#ffffff",
    borderTop: "1px solid #e8edf2",
  },
  textarea: {
    flex: 1,
    padding: "11px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    resize: "none",
    fontSize: 14,
    color: "#073B5A",
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: 1.55,
    background: "#f8fafc",
    outline: "none",
  },
  sendBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    padding: "0 20px",
    height: 80,
    borderRadius: 10,
    border: "none",
    background: "#073B5A",
    color: "white",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  errorBar: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    background: "#fff1f2",
    color: "#dc2626",
    padding: "8px 14px",
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 10,
  },
  inputRow: {
    display: "flex",
    gap: 10,
    alignItems: "flex-end",
  },
  voiceArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  voiceBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "12px 28px",
    borderRadius: 40,
    border: "none",
    background: "#AA7BD9",
    color: "white",
    fontSize: 15,
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s",
    width: "100%",
    maxWidth: 300,
  },
  voiceBtnActive: {
    background: "#ef4444",
    animation: "pulse-ring 1.2s infinite",
  },
  voicePreview: {
    background: "#f0f2f5",
    padding: "8px 16px",
    borderRadius: 20,
    maxWidth: "80%",
    textAlign: "center",
  },
  voicePreviewText: {
    fontSize: 13,
    color: "#073B5A",
    fontStyle: "italic",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(7,59,90,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "16px",
  },
  modalBox: {
    background: "white",
    borderRadius: 16,
    width: "100%",
    maxWidth: 340,
    padding: "24px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
    animation: "modalIn 0.2s ease",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  modalTitle: {
    fontWeight: 700,
    fontSize: 17,
    color: "#073B5A",
  },
  modalClose: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
    padding: "4px",
  },
  modalBody: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 1.6,
    marginBottom: 20,
  },
  modalActions: {
    display: "flex",
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    padding: "9px",
    borderRadius: 9,
    border: "1.5px solid #dde3ea",
    background: "white",
    cursor: "pointer",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    color: "#073B5A",
    fontWeight: 500,
    transition: "background 0.15s",
  },
  confirmBtn: {
    flex: 1,
    padding: "9px",
    borderRadius: 9,
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    transition: "background 0.15s",
  },
  toast: {
    position: "fixed",
    top: 72,
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 20px",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 500,
    zIndex: 9998,
    background: "#073B5A",
    color: "white",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    gap: 8,
    animation: "fadeSlideIn 0.2s ease",
    whiteSpace: "nowrap",
    maxWidth: "calc(100% - 32px)",
  },
  toastError: {
    background: "#ef4444",
  },
};

const responsiveStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes blink {
    0%, 60%, 100% { opacity: 0.25; transform: scale(0.85); }
    30% { opacity: 1; transform: scale(1); }
  }
  @keyframes pulse-ring {
    0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
    70% { box-shadow: 0 0 0 10px rgba(239,68,68,0); }
    100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.94); }
    to { opacity: 1; transform: scale(1); }
  }

  /* Tablet Styles */
  @media (max-width: 1024px) {
    .interview-root .main {
      height: calc(100vh - 70px);
    }
    
    .interview-root .video-panel {
      width: 240px;
    }
    
    .interview-root .bubble {
      max-width: 75% !important;
    }
    
    .interview-root .header-right {
      gap: 6px;
    }
    
    .interview-root .stat-chip {
      padding: 4px 8px;
    }
    
    .interview-root .mode-text,
    .interview-root .back-text,
    .interview-root .send-text {
      display: inline;
    }
  }

  /* Mobile Styles */
  @media (max-width: 768px) {
    .interview-root {
      height: 100vh;
      overflow: hidden;
    }
    
    .interview-root .header {
      padding: 10px 12px;
      gap: 8px;
    }
    
    .interview-root .header-left {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }
    
    .interview-root .back-btn {
      padding: 6px 10px;
    }
    
    .interview-root .back-text {
      display: none;
    }
    
    .interview-root .session-title {
      font-size: 13px;
    }
    
    .interview-root .tag {
      font-size: 10px;
      padding: 2px 8px;
    }
    
    .interview-root .mobile-menu-btn {
      display: block;
    }
    
    .interview-root .header-right {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      padding: 12px;
      border-bottom: 1px solid #e8edf2;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      z-index: 100;
      flex-wrap: wrap;
    }
    
    .interview-root .header-right.mobile-open {
      display: flex;
    }
    
    .interview-root .mode-text {
      display: none;
    }
    
    .interview-root .icon-btn {
      padding: 7px 10px;
    }
    
    .interview-root .main {
      flex-direction: column;
      height: calc(100vh - 57px);
    }
    
    .interview-root .video-panel {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid #e8edf2;
    }
    
    .interview-root .video-wrap {
      min-height: 160px;
      max-height: 200px;
    }
    
    .interview-root .video-controls {
      padding: 10px 12px;
      gap: 8px;
    }
    
    .interview-root .video-btn,
    .interview-root .end-call-btn {
      width: 36px;
      height: 36px;
    }
    
    .interview-root .ai-panel {
      padding: 10px 12px;
    }
    
    .interview-root .ai-avatar {
      width: 36px;
      height: 36px;
    }
    
    .interview-root .ai-name {
      font-size: 12px;
    }
    
    .interview-root .chat-messages {
      padding: 16px 12px;
      gap: 12px;
    }
    
    .interview-root .bubble {
      max-width: 85% !important;
      padding: 10px 12px;
      font-size: 13px;
    }
    
    .interview-root .avatar-ai,
    .interview-root .avatar-user {
      width: 28px;
      height: 28px;
    }
    
    .interview-root .input-area {
      padding: 12px;
    }
    
    .interview-root .input-row {
      gap: 8px;
    }
    
    .interview-root .textarea {
      padding: 10px 12px;
      font-size: 13px;
    }
    
    .interview-root .send-btn {
      padding: 0 16px;
      height: 60px;
    }
    
    .interview-root .send-text {
      display: none;
    }
    
    .interview-root .voice-btn {
      padding: 10px 20px;
      font-size: 14px;
      max-width: 100%;
    }
    
    .interview-root .toast {
      font-size: 12px;
      padding: 8px 16px;
      white-space: normal;
      text-align: center;
      max-width: calc(100% - 24px);
    }
    
    .interview-root .modal-box {
      margin: 16px;
      padding: 20px;
    }
  }

  /* Small Mobile Styles */
  @media (max-width: 480px) {
    .interview-root .tag-row {
      gap: 4px;
    }
    
    .interview-root .tag {
      font-size: 9px;
      padding: 2px 6px;
    }
    
    .interview-root .session-title {
      font-size: 12px;
      margin-bottom: 3px;
    }
    
    .interview-root .video-wrap {
      min-height: 140px;
    }
    
    .interview-root .chat-messages {
      padding: 12px 10px;
    }
    
    .interview-root .bubble {
      max-width: 90% !important;
      padding: 8px 10px;
      font-size: 12px;
    }
    
    .interview-root .eval-notice {
      padding: 5px 8px;
      font-size: 11px;
    }
    
    .interview-root .textarea {
      font-size: 12px;
    }
    
    .interview-root .stat-text {
      font-size: 11px;
    }
    
    .interview-root .select {
      padding: 4px 8px;
      font-size: 11px;
    }
  }

  /* Touch-friendly interactions */
  @media (hover: none) and (pointer: coarse) {
    .interview-root button,
    .interview-root select {
      min-height: 44px;
    }
    
    .interview-root .video-btn,
    .interview-root .end-call-btn {
      min-width: 44px;
      min-height: 44px;
    }
    
    .interview-root .back-btn,
    .interview-root .icon-btn {
      min-height: 44px;
    }
    
    .interview-root .modal-close {
      min-height: 44px;
      min-width: 44px;
    }
  }

  /* Landscape mode for mobile */
  @media (max-width: 768px) and (orientation: landscape) {
    .interview-root .main {
      flex-direction: row;
    }
    
    .interview-root .video-panel {
      width: 200px;
      border-right: 1px solid #e8edf2;
      border-bottom: none;
    }
    
    .interview-root .video-wrap {
      min-height: 120px;
    }
  }

  /* Print styles */
  @media print {
    .interview-root .video-panel,
    .interview-root .input-area,
    .interview-root .header-right {
      display: none;
    }
    
    .interview-root .chat-panel {
      width: 100%;
    }
    
    .interview-root .bubble {
      break-inside: avoid;
    }
  }
`;