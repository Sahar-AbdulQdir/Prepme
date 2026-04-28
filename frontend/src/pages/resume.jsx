import { useState, useRef } from "react";
import { api, authHeaders } from "../services/api";
import SplashCursor from "../components/effects/splashCursor";
import Footer from "../components/ui/Footer"

// ─── Icons (SVG inline, no emojis) ───────────────────────────────────────────
const Icon = {
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  Briefcase: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  ),
  GraduationCap: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  Code: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Zap: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Heart: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  MapPin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Target: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Phone: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Globe: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Trash: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  ),
  Download: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Save: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  ),
  Sparkles: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 3l.8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8z"/><path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8z"/>
    </svg>
  ),
  Award: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  X: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Language: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/>
    </svg>
  ),
};

// ─── Black & White Color Palette for Preview (no colors) ─────────────────────
const BWG = {
  white:  "#FFFFFF",
  black:  "#000000",
  gray50: "#FAFAFA",
  gray100:"#F5F5F5",
  gray200:"#EEEEEE",
  gray300:"#E0E0E0",
  gray400:"#BDBDBD",
  gray500:"#9E9E9E",
  gray600:"#757575",
  gray700:"#616161",
  gray800:"#424242",
  gray900:"#212121",
};

// ─── UI Colors (for editing interface only) ──────────────────────────────────
const C = {
  navy:   "#1E3A5F",
  accent: "#2C5F8A",
  white:  "#FFFFFF",
  gray100:"#F8FAFC",
  gray200:"#E2E8F0",
  gray400:"#94A3B8",
  gray600:"#475569",
  bg:     "#F1F5F9",
  border: "#E2E8F0",
  textMuted: "#64748B",
};

// ─── Country & City data ──────────────────────────────────────────────────────
const countryFlag = (code) => {
  if (!code) return "";
  const letters = code.toUpperCase();
  const offset = 0x1F1E6 - 65;
  const first = letters.charCodeAt(0) + offset;
  const second = letters.charCodeAt(1) + offset;
  return String.fromCodePoint(first, second);
};

const COUNTRIES = [
  { code: "AE", name: "United Arab Emirates" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "IN", name: "India" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "EG", name: "Egypt" },
  { code: "JO", name: "Jordan" },
  { code: "LB", name: "Lebanon" },
  { code: "QA", name: "Qatar" },
  { code: "KW", name: "Kuwait" },
  { code: "OM", name: "Oman" },
  { code: "BH", name: "Bahrain" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "TR", name: "Turkey" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
  { code: "ZA", name: "South Africa" },
  { code: "NG", name: "Nigeria" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "JP", name: "Japan" },
  { code: "CN", name: "China" },
  { code: "KR", name: "South Korea" },
];

const CITIES_BY_COUNTRY = {
  AE: ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain", "Ajman"],
  US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "San Francisco"],
  GB: ["London", "Manchester", "Birmingham", "Edinburgh", "Glasgow"],
  IN: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata"],
  SA: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"],
  EG: ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan"],
  JO: ["Amman", "Zarqa", "Irbid", "Aqaba"],
  LB: ["Beirut", "Tripoli", "Sidon", "Byblos"],
  QA: ["Doha", "Al Rayyan", "Al Wakrah", "Umm Salal"],
  KW: ["Kuwait City", "Hawalli", "Salmiya", "Farwaniya"],
  OM: ["Muscat", "Salalah", "Sohar", "Nizwa"],
  BH: ["Manama", "Riffa", "Muharraq", "Hamad Town"],
  DE: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne"],
  FR: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
  CA: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  AU: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  SG: ["Singapore"],
  MY: ["Kuala Lumpur", "George Town", "Johor Bahru", "Ipoh"],
  TR: ["Istanbul", "Ankara", "Izmir", "Antalya", "Bursa"],
  IT: ["Rome", "Milan", "Naples", "Turin", "Florence"],
  ES: ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao"],
  NL: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht"],
  SE: ["Stockholm", "Gothenburg", "Malmö", "Uppsala"],
  ZA: ["Johannesburg", "Cape Town", "Durban", "Pretoria"],
  NG: ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt"],
  BR: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza"],
  MX: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Cancún"],
  JP: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya"],
  CN: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
  KR: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon"],
};

// ─── Styles (UI only) ────────────────────────────────────────────────────────
const styles = {
  app: {
    minHeight: "100vh",
    background: C.bg,
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    color: C.navy,
  },
  header: {
    background: C.navy,
    padding: "18px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 4px 24px rgba(30,58,95,0.18)",
  },
  logoText: {
    fontSize: "22px",
    fontWeight: "800",
    color: C.white,
    letterSpacing: "-0.5px",
  },
  logoAccent: { color: C.accent },
  layout: {
    display: "flex",
    gap: "0",
    minHeight: "calc(100vh - 65px)",
  },
  sidebar: {
    width: "260px",
    minWidth: "260px",
    background: C.white,
    borderRight: `1px solid ${C.border}`,
    padding: "28px 0",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  sidebarBtn: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "11px 24px",
    background: active ? `${C.accent}0c` : "transparent",
    color: active ? C.navy : C.textMuted,
    fontWeight: active ? "700" : "500",
    fontSize: "14px",
    border: "none",
    borderLeft: active ? `3px solid ${C.accent}` : "3px solid transparent",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.18s",
    borderRadius: "0 8px 8px 0",
    marginRight: "12px",
  }),
  main: {
    flex: 1,
    padding: "36px 40px",
    overflowY: "auto",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "800",
    color: C.navy,
    marginBottom: "6px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  sectionSub: {
    fontSize: "14px",
    color: C.textMuted,
    marginBottom: "28px",
  },
  card: {
    background: C.white,
    borderRadius: "16px",
    border: `1px solid ${C.border}`,
    padding: "28px",
    marginBottom: "20px",
    boxShadow: "0 2px 12px rgba(30,58,95,0.05)",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "16px",
  },
  fieldLabel: {
    display: "block",
    fontSize: "12px",
    fontWeight: "700",
    color: C.textMuted,
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: `1.5px solid ${C.border}`,
    fontSize: "14px",
    color: C.navy,
    background: C.bg,
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.15s",
    fontFamily: "inherit",
  },
  inputError: {
    border: "1.5px solid #E05C5C",
  },
  errorText: {
    fontSize: "12px",
    color: "#E05C5C",
    marginTop: "4px",
    fontWeight: "500",
  },
  textarea: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: `1.5px solid ${C.border}`,
    fontSize: "14px",
    color: C.navy,
    background: C.bg,
    outline: "none",
    boxSizing: "border-box",
    resize: "vertical",
    minHeight: "80px",
    fontFamily: "inherit",
  },
  select: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: `1.5px solid ${C.border}`,
    fontSize: "14px",
    color: C.navy,
    background: C.bg,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    appearance: "none",
    cursor: "pointer",
  },
  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "9px 18px",
    borderRadius: "10px",
    border: `1.5px dashed ${C.border}`,
    background: "transparent",
    color: C.textMuted,
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "inherit",
  },
  deleteBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    border: "none",
    background: "#FFE8E8",
    color: "#E05C5C",
    cursor: "pointer",
    flexShrink: 0,
  },
  primaryBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 28px",
    borderRadius: "12px",
    border: "none",
    background: `linear-gradient(135deg, ${C.navy}, ${C.accent})`,
    color: C.white,
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "inherit",
    boxShadow: `0 4px 16px ${C.navy}44`,
  },
  accentBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 28px",
    borderRadius: "12px",
    border: "none",
    background: `linear-gradient(135deg, ${C.accent}, #1e4a76)`,
    color: C.white,
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.15s",
    fontFamily: "inherit",
    boxShadow: `0 4px 16px ${C.accent}66`,
  },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "4px 12px",
    borderRadius: "20px",
    background: `${C.gray200}`,
    color: C.navy,
    fontSize: "13px",
    fontWeight: "600",
    border: `1px solid ${C.border}`,
  },
  tagMuted: {
    background: `${C.gray100}`,
    color: C.gray600,
    border: `1px solid ${C.border}`,
  },
  divider: {
    height: "1px",
    background: C.border,
    margin: "20px 0",
  },
  entryCard: {
    background: C.bg,
    borderRadius: "12px",
    border: `1px solid ${C.border}`,
    padding: "20px",
    marginBottom: "14px",
    position: "relative",
  },
  entryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "14px",
  },
  progressBar: () => ({
    height: "6px",
    borderRadius: "3px",
    background: C.border,
    overflow: "hidden",
    marginTop: "6px",
  }),
  progressFill: (pct) => ({
    height: "100%",
    width: `${pct}%`,
    borderRadius: "3px",
    background: C.accent,
    transition: "width 0.4s ease",
  }),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);

const Field = ({ label, children }) => (
  <div>
    <label style={styles.fieldLabel}>{label}</label>
    {children}
  </div>
);

// ─── SECTIONS CONFIG ──────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "personal",     label: "Personal Info",    Icon: Icon.User },
  { id: "contact",      label: "Contact",           Icon: Icon.Mail },
  { id: "objective",    label: "Objective",         Icon: Icon.Target },
  { id: "experience",   label: "Experience",        Icon: Icon.Briefcase },
  { id: "education",    label: "Education",         Icon: Icon.GraduationCap },
  { id: "skills",       label: "Skills",            Icon: Icon.Zap },
  { id: "projects",     label: "Projects",          Icon: Icon.Code },
  { id: "languages",    label: "Languages",         Icon: Icon.Language },
  { id: "certifications", label: "Certifications", Icon: Icon.Award },
  { id: "interests",    label: "Interests",         Icon: Icon.Heart },
  { id: "generate",     label: "Generate CV",       Icon: Icon.Sparkles },
];

// ─── DEFAULT STATE ────────────────────────────────────────────────────────────
const defaultState = () => ({
  personal: { firstName: "", lastName: "", jobTitle: "", jobApplying: "", summary: "" },
  contact: { email: "", phone: "", country: "", city: "", linkedin: "", website: "" },
  objective: { text: "" },
  experience: [],
  education: [],
  skills: { technical: [], soft: [], newSkill: "", newSoft: "" },
  projects: [],
  languages: [],
  certifications: [],
  interests: [],
  newInterest: "",
  skipExperience: false,
  skipProjects: false,
});

// ─── BLACK & WHITE RESUME PREVIEW (single column, no colors) ─────────────────
function ResumePreview({ data, resumeRef }) {
  const { personal, contact, objective, experience, education, skills, projects, languages, certifications, interests, skipExperience, skipProjects } = data;
  const fullName = `${personal.firstName} ${personal.lastName}`.trim() || "Your Name";

  const SectionTitle = ({ title }) => (
    <div style={{ margin: "18px 0 6px", borderBottom: `1px solid ${BWG.gray300}`, paddingBottom: "4px" }}>
      <span style={{ fontSize: "13px", fontWeight: "800", letterSpacing: "1.2px", textTransform: "uppercase", color: BWG.black }}>{title}</span>
    </div>
  );

  const textLine = (text) => (
    <p style={{ fontSize: "12px", color: BWG.gray800, lineHeight: "1.5", margin: "3px 0" }}>{text}</p>
  );

  const commaList = (items) => (
    <span style={{ fontSize: "12px", color: BWG.gray800 }}>{items.join(", ")}</span>
  );

  return (
    <div ref={resumeRef} style={{
      width: "794px",
      minHeight: "1123px",
      background: BWG.white,
      fontFamily: "'DM Sans', sans-serif",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      margin: "0 auto",
      padding: "44px 48px",
      position: "relative",
    }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "900", color: BWG.black, margin: "0 0 6px", letterSpacing: "-0.3px" }}>{fullName}</h1>
        {(personal.jobTitle || personal.jobApplying) && (
          <p style={{ fontSize: "14px", color: BWG.gray700, fontWeight: "600", margin: "0 0 8px", letterSpacing: "0.2px" }}>
            {personal.jobApplying || personal.jobTitle}
          </p>
        )}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px", fontSize: "11px", color: BWG.gray600, fontWeight: "500" }}>
          {contact.email && <span>{contact.email}</span>}
          {contact.phone && <span>{contact.phone}</span>}
          {[contact.city, contact.country].filter(Boolean).join(", ") && <span>{[contact.city, contact.country].filter(Boolean).join(", ")}</span>}
          {contact.linkedin && <span>{contact.linkedin}</span>}
          {contact.website && <span>{contact.website}</span>}
        </div>
      </div>

      {(objective.text || personal.summary) && (
        <>
          <SectionTitle title="Professional Summary" />
          <p style={{ fontSize: "12px", color: BWG.gray800, lineHeight: "1.6", margin: "0 0 8px" }}>{objective.text || personal.summary}</p>
        </>
      )}

      {!skipExperience && experience.length > 0 && (
        <>
          <SectionTitle title="Work Experience" />
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <div>
                  <p style={{ margin: "0 0 2px", fontSize: "13px", fontWeight: "700", color: BWG.black }}>{exp.role}</p>
                  <p style={{ margin: "0 0 4px", fontSize: "12px", fontWeight: "600", color: BWG.gray700 }}>{exp.company}</p>
                </div>
                <span style={{ fontSize: "11px", color: BWG.gray600, whiteSpace: "nowrap" }}>
                  {exp.startDate}{exp.startDate && exp.endDate ? " – " : ""}{exp.endDate}
                </span>
              </div>
              {exp.description && textLine(exp.description)}
            </div>
          ))}
        </>
      )}

      {education.length > 0 && (
        <>
          <SectionTitle title="Education" />
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <p style={{ margin: "0 0 1px", fontSize: "13px", fontWeight: "700", color: BWG.black }}>{edu.degree}</p>
              <p style={{ margin: "0 0 2px", fontSize: "12px", fontWeight: "600", color: BWG.gray700 }}>{edu.institution}</p>
              <p style={{ margin: "0 0 2px", fontSize: "12px", color: BWG.gray600 }}>{edu.field}</p>
              <span style={{ fontSize: "11px", color: BWG.gray600 }}>{edu.startYear}{edu.startYear && edu.endYear ? " – " : ""}{edu.endYear}</span>
              {edu.gpa && <span style={{ fontSize: "11px", color: BWG.gray600 }}> · GPA: {edu.gpa}</span>}
            </div>
          ))}
        </>
      )}

      {!skipProjects && projects.length > 0 && (
        <>
          <SectionTitle title="Projects" />
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <p style={{ margin: "0 0 3px", fontSize: "13px", fontWeight: "700", color: BWG.black }}>{proj.name}</p>
                {proj.link && <a href={proj.link} style={{ fontSize: "11px", color: BWG.gray700, textDecoration: "none" }}>{proj.link}</a>}
              </div>
              {proj.tech && <p style={{ margin: "0 0 4px", fontSize: "12px", fontWeight: "600", color: BWG.gray700 }}>{proj.tech}</p>}
              {proj.description && textLine(proj.description)}
            </div>
          ))}
        </>
      )}

      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <>
          <SectionTitle title="Skills" />
          {skills.technical.length > 0 && (
            <div style={{ marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: BWG.black }}>Technical: </span>
              {commaList(skills.technical)}
            </div>
          )}
          {skills.soft.length > 0 && (
            <div>
              <span style={{ fontSize: "12px", fontWeight: "700", color: BWG.black }}>Soft: </span>
              {commaList(skills.soft)}
            </div>
          )}
        </>
      )}

      {languages.length > 0 && (
        <>
          <SectionTitle title="Languages" />
          {languages.map((lang, i) => (
            <div key={i} style={{ fontSize: "12px", marginBottom: "4px" }}>
              <span style={{ fontWeight: "700", color: BWG.black }}>{lang.name}</span>: <span style={{ color: BWG.gray700 }}>{lang.level}</span>
            </div>
          ))}
        </>
      )}

      {certifications.length > 0 && (
        <>
          <SectionTitle title="Certifications" />
          {certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: "8px", fontSize: "12px" }}>
              <span style={{ fontWeight: "700", color: BWG.black }}>{cert.name}</span>
              {cert.issuer && <span style={{ color: BWG.gray600 }}> – {cert.issuer}</span>}
              {cert.date && <span style={{ color: BWG.gray600 }}> ({cert.date})</span>}
            </div>
          ))}
        </>
      )}

      {interests.length > 0 && (
        <>
          <SectionTitle title="Interests" />
          <p style={{ fontSize: "12px", color: BWG.gray800 }}>{interests.join(", ")}</p>
        </>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState("personal");
  const [data, setData] = useState(defaultState());
  const [showPreview, setShowPreview] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [aiEnhancingAll, setAiEnhancingAll] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [enhanceMessage, setEnhanceMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const resumeRef = useRef(null);

  const update = (section, key, val) => {
    setData(d => ({ ...d, [section]: { ...d[section], [key]: val } }));
    // Validation
    if (section === "contact" && key === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (val && !emailRegex.test(val)) {
        setEmailError("Please enter a valid email (must contain @ and domain).");
      } else {
        setEmailError("");
      }
    }
    if (section === "contact" && key === "phone") {
      // Only digits allowed; validation ensures exactly 10 digits if any entered
      if (val && val.length !== 10) {
        setPhoneError("Phone number must be exactly 10 digits.");
      } else {
        setPhoneError("");
      }
    }
  };

  const updateArr = (section, idx, key, val) =>
    setData(d => {
      const arr = [...d[section]];
      arr[idx] = { ...arr[idx], [key]: val };
      return { ...d, [section]: arr };
    });

  const addItem = (section, template) =>
    setData(d => ({ ...d, [section]: [...d[section], { id: uid(), ...template }] }));

  const removeItem = (section, idx) =>
    setData(d => {
      const arr = [...d[section]];
      arr.splice(idx, 1);
      return { ...d, [section]: arr };
    });

  const addSkill = (type) => {
    const key = type === "technical" ? "newSkill" : "newSoft";
    const val = data.skills[key].trim();
    if (!val) return;
    setData(d => ({
      ...d,
      skills: { ...d.skills, [type]: [...d.skills[type], val], [key]: "" }
    }));
  };

  const removeSkill = (type, idx) =>
    setData(d => {
      const arr = [...d.skills[type]];
      arr.splice(idx, 1);
      return { ...d, skills: { ...d.skills, [type]: arr } };
    });

  const addInterest = () => {
    const val = data.newInterest?.trim();
    if (!val) return;
    setData(d => ({ ...d, interests: [...d.interests, val], newInterest: "" }));
  };

  const handleDownload = () => window.print();
  const handleSave = async () => {
    try {
      const response = await fetch(`${api.resumes}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSavedMsg("Saved successfully!");
        setTimeout(() => setSavedMsg(""), 3000);
      }
    } catch {
      setSavedMsg("Saved locally!");
      localStorage.setItem("resume_draft", JSON.stringify(data));
      setTimeout(() => setSavedMsg(""), 3000);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1200));
    setGenerating(false);
    setGenerated(true);
    setShowPreview(true);
  };

  // ── AI Enhance All (targets all free‑text fields) ────────────────────────
  const handleAIEnhanceAll = async () => {
    setAiEnhancingAll(true);
    const textsToEnhance = [];

    if (data.objective.text?.trim()) {
      textsToEnhance.push({ section: "objective", path: ["objective", "text"], content: data.objective.text });
    }
    if (data.personal.summary?.trim()) {
      textsToEnhance.push({ section: "summary", path: ["personal", "summary"], content: data.personal.summary });
    }
    data.experience.forEach((exp, idx) => {
      if (exp.description?.trim()) {
        textsToEnhance.push({ section: "experience", path: ["experience", idx, "description"], content: exp.description });
      }
    });
    data.projects.forEach((proj, idx) => {
      if (proj.description?.trim()) {
        textsToEnhance.push({ section: "projects", path: ["projects", idx, "description"], content: proj.description });
      }
    });

    if (textsToEnhance.length === 0) {
      setEnhanceMessage("No text fields to enhance (add objective, experience, projects, or summary).");
      setTimeout(() => setEnhanceMessage(""), 3000);
      setAiEnhancingAll(false);
      return;
    }

    try {
      const response = await fetch(`${api.enhanceAll}`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ texts: textsToEnhance, jobTitle: data.personal.jobApplying }),
      });

      if (response.ok) {
        const result = await response.json();
        setData(prev => {
          const newData = { ...prev };
          result.enhanced.forEach(({ path, enhancedText }) => {
            if (path.length === 2 && path[0] === "objective") {
              newData.objective.text = enhancedText;
            } else if (path.length === 2 && path[0] === "personal" && path[1] === "summary") {
              newData.personal.summary = enhancedText;
            } else if (path.length === 3 && path[0] === "experience") {
              newData.experience[path[1]].description = enhancedText;
            } else if (path.length === 3 && path[0] === "projects") {
              newData.projects[path[1]].description = enhancedText;
            }
          });
          return newData;
        });
        setEnhanceMessage(`Enhanced ${result.enhanced.length} section(s) via backend.`);
        setTimeout(() => setEnhanceMessage(""), 3000);
      } else {
        throw new Error("Backend API error, using LanguageTool fallback.");
      }
    } catch (err) {
      console.warn("Backend enhance failed, using LanguageTool public API:", err);
      try {
        const enhancedTexts = await enhanceWithLanguageTool(textsToEnhance);
        setData(prev => {
          const newData = { ...prev };
          enhancedTexts.forEach(({ path, enhancedText }) => {
            if (path.length === 2 && path[0] === "objective") {
              newData.objective.text = enhancedText;
            } else if (path.length === 2 && path[0] === "personal" && path[1] === "summary") {
              newData.personal.summary = enhancedText;
            } else if (path.length === 3 && path[0] === "experience") {
              newData.experience[path[1]].description = enhancedText;
            } else if (path.length === 3 && path[0] === "projects") {
              newData.projects[path[1]].description = enhancedText;
            }
          });
          return newData;
        });
        setEnhanceMessage(`LanguageTool enhanced ${enhancedTexts.length} field(s).`);
        setTimeout(() => setEnhanceMessage(""), 3000);
      } catch (ltErr) {
        console.error("LanguageTool fallback failed:", ltErr);
        const enhanced = textsToEnhance.map(item => ({
          path: item.path,
          enhancedText: simulateEnhancement(item.content)
        }));
        setData(prev => {
          const newData = { ...prev };
          enhanced.forEach(({ path, enhancedText }) => {
            if (path.length === 2 && path[0] === "objective") {
              newData.objective.text = enhancedText;
            } else if (path.length === 2 && path[0] === "personal" && path[1] === "summary") {
              newData.personal.summary = enhancedText;
            } else if (path.length === 3 && path[0] === "experience") {
              newData.experience[path[1]].description = enhancedText;
            } else if (path.length === 3 && path[0] === "projects") {
              newData.projects[path[1]].description = enhancedText;
            }
          });
          return newData;
        });
        setEnhanceMessage(`Basic fixes applied to ${textsToEnhance.length} field(s).`);
        setTimeout(() => setEnhanceMessage(""), 3000);
      }
    } finally {
      setAiEnhancingAll(false);
    }
  };

  // ── LanguageTool public API fallback ──────────────────────────────────────
  const enhanceWithLanguageTool = async (texts) => {
    const results = [];
    for (const item of texts) {
      const { content, path } = item;
      const params = new URLSearchParams({
        text: content,
        language: "en-US",
        enabledOnly: "false",
      });
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });
      if (!response.ok) throw new Error(`LanguageTool API error: ${response.status}`);
      const json = await response.json();
      let corrected = content;
      if (json.matches && json.matches.length > 0) {
        const matches = json.matches
          .filter(m => m.replacements && m.replacements.length > 0)
          .sort((a, b) => b.offset - a.offset);
        for (const match of matches) {
          const replacement = match.replacements[0].value;
          const offset = match.offset;
          const length = match.length;
          corrected = corrected.slice(0, offset) + replacement + corrected.slice(offset + length);
        }
      }
      results.push({ path, enhancedText: corrected });
    }
    return results;
  };

  const simulateEnhancement = (text) => {
    let enhanced = text.trim();
    if (!enhanced.endsWith('.') && !enhanced.endsWith('!') && !enhanced.endsWith('?')) enhanced += '.';
    enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);
    enhanced = enhanced.replace(/\s(i)\s/gi, ' I ');
    return enhanced;
  };

  const completionPct = () => {
    let filled = 0, total = 6;
    if (data.personal.firstName) filled++;
    if (data.contact.email && !emailError) filled++;
    // Phone counts only if it's exactly 10 digits
    if (data.contact.phone && data.contact.phone.length === 10 && !phoneError) filled++;
    if (data.objective.text) filled++;
    if (!data.skipExperience && data.experience.length > 0) filled++;
    if (data.education.length > 0) filled++;
    if (data.skills.technical.length > 0) filled++;
    return Math.round((filled / total) * 100);
  };
  const pct = completionPct();

  const renderPersonal = () => (
    <div>
      <div style={styles.sectionTitle}><Icon.User /> Personal Information</div>
      <p style={styles.sectionSub}>Tell us about yourself — this appears at the top of your resume.</p>
      <div style={styles.card}>
        <div style={{ ...styles.grid2, marginBottom: "16px" }}>
          <Field label="First Name"><input style={styles.input} value={data.personal.firstName} onChange={e => update("personal", "firstName", e.target.value)} placeholder="John" /></Field>
          <Field label="Last Name"><input style={styles.input} value={data.personal.lastName} onChange={e => update("personal", "lastName", e.target.value)} placeholder="Doe" /></Field>
        </div>
        <div style={{ ...styles.grid2, marginBottom: "16px" }}>
          <Field label="Current Job Title"><input style={styles.input} value={data.personal.jobTitle} onChange={e => update("personal", "jobTitle", e.target.value)} placeholder="e.g. Software Engineer" /></Field>
          <Field label="Job Applying For"><input style={styles.input} value={data.personal.jobApplying} onChange={e => update("personal", "jobApplying", e.target.value)} placeholder="e.g. Senior Frontend Developer" /></Field>
        </div>
        <Field label="Short Summary (optional)">
          <textarea style={styles.textarea} rows="3" value={data.personal.summary} onChange={e => update("personal", "summary", e.target.value)} placeholder="Brief summary about yourself..." />
        </Field>
      </div>
    </div>
  );

  const renderContact = () => (
    <div>
      <div style={styles.sectionTitle}><Icon.Mail /> Contact Information</div>
      <p style={styles.sectionSub}>How employers can reach you.</p>
      <div style={styles.card}>
        <div style={{ ...styles.grid2, marginBottom: "16px" }}>
          <Field label="Email Address">
            <input
              style={{ ...styles.input, ...(emailError ? styles.inputError : {}) }}
              type="email"
              value={data.contact.email}
              onChange={e => update("contact", "email", e.target.value)}
              placeholder="john.doe@email.com"
            />
            {emailError && <div style={styles.errorText}>{emailError}</div>}
          </Field>
          <Field label="Phone Number">
            <input
              style={{ ...styles.input, ...(phoneError ? styles.inputError : {}) }}
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={data.contact.phone}
              onChange={e => {
                const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                update("contact", "phone", digits);
              }}
              onKeyDown={e => {
                if (!/\d/.test(e.key) && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Delete" && e.key !== "Tab") {
                  e.preventDefault();
                }
              }}
              placeholder="Enter 10-digit number"
            />
            {phoneError && <div style={styles.errorText}>{phoneError}</div>}
          </Field>
        </div>
        <div style={{ ...styles.grid2, marginBottom: "16px" }}>
          <Field label="Country">
            <select
              style={styles.select}
              value={data.contact.country}
              onChange={e => {
                update("contact", "country", e.target.value);
                update("contact", "city", "");
              }}
            >
              <option value="">Select country</option>
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>
                  {countryFlag(c.code)} {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="City">
            {CITIES_BY_COUNTRY[data.contact.country]?.length > 0 ? (
              <select
                style={styles.select}
                value={data.contact.city}
                onChange={e => update("contact", "city", e.target.value)}
              >
                <option value="">Select city</option>
                {CITIES_BY_COUNTRY[data.contact.country].map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            ) : (
              <input
                style={styles.input}
                value={data.contact.city}
                onChange={e => update("contact", "city", e.target.value)}
                placeholder="e.g. Dubai"
                disabled={!data.contact.country}
              />
            )}
          </Field>
        </div>
        <div style={{ ...styles.grid2 }}>
          <Field label="LinkedIn URL"><input style={styles.input} value={data.contact.linkedin} onChange={e => update("contact", "linkedin", e.target.value)} placeholder="linkedin.com/in/johndoe" /></Field>
          <Field label="Website / Portfolio"><input style={styles.input} value={data.contact.website} onChange={e => update("contact", "website", e.target.value)} placeholder="johndoe.com" /></Field>
        </div>
      </div>
    </div>
  );

  const renderObjective = () => (
    <div>
      <div style={styles.sectionTitle}><Icon.Target /> Professional Objective</div>
      <p style={styles.sectionSub}>A concise statement about your career goals and what you bring to the role.</p>
      <div style={styles.card}>
        <Field label="Professional Summary / Objective">
          <textarea style={styles.textarea} rows="5" value={data.objective.text} onChange={e => update("objective", "text", e.target.value)} placeholder="Motivated software engineer with 5+ years building scalable web applications..." />
        </Field>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div>
      <div style={styles.sectionTitle}><Icon.Briefcase /> Work Experience</div>
      <p style={styles.sectionSub}>Add your work history, starting with the most recent.</p>
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input type="checkbox" checked={data.skipExperience} onChange={e => {
            setData(d => ({ ...d, skipExperience: e.target.checked }));
            if (e.target.checked) setData(d => ({ ...d, experience: [] }));
          }} />
          <span style={{ fontSize: "13px", fontWeight: "500" }}>I have no work experience (skip this section)</span>
        </label>
      </div>
      {!data.skipExperience && (
        <>
          {data.experience.map((exp, i) => (
            <div key={exp.id} style={styles.entryCard}>
              <div style={styles.entryHeader}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: C.navy }}>Position {i + 1}</span>
                <button style={styles.deleteBtn} onClick={() => removeItem("experience", i)}><Icon.Trash /></button>
              </div>
              <div style={{ ...styles.grid2, marginBottom: "14px" }}>
                <Field label="Job Title / Role"><input style={styles.input} value={exp.role} onChange={e => updateArr("experience", i, "role", e.target.value)} placeholder="Software Engineer" /></Field>
                <Field label="Company / Organization"><input style={styles.input} value={exp.company} onChange={e => updateArr("experience", i, "company", e.target.value)} placeholder="Acme Corp" /></Field>
              </div>
              <div style={{ ...styles.grid3, marginBottom: "14px" }}>
                <Field label="Start Date"><input style={styles.input} value={exp.startDate} onChange={e => updateArr("experience", i, "startDate", e.target.value)} placeholder="Jan 2021" /></Field>
                <Field label="End Date"><input style={styles.input} value={exp.endDate} onChange={e => updateArr("experience", i, "endDate", e.target.value)} placeholder="Present" /></Field>
                <Field label="Location"><input style={styles.input} value={exp.location} onChange={e => updateArr("experience", i, "location", e.target.value)} placeholder="Dubai, UAE" /></Field>
              </div>
              <Field label="Key Responsibilities & Achievements">
                <textarea style={styles.textarea} rows="3" value={exp.description} onChange={e => updateArr("experience", i, "description", e.target.value)} placeholder="• Led development of customer-facing features used by 50k+ users..." />
              </Field>
            </div>
          ))}
          <button style={styles.addBtn} onClick={() => addItem("experience", { role: "", company: "", startDate: "", endDate: "", location: "", description: "" })}>
            <Icon.Plus /> Add Experience
          </button>
        </>
      )}
    </div>
  );

  const renderEducation = () => (
    <div>
      <div style={styles.sectionTitle}><Icon.GraduationCap /> Education</div>
      <p style={styles.sectionSub}>Your academic background and qualifications.</p>
      {data.education.map((edu, i) => (
        <div key={edu.id} style={styles.entryCard}>
          <div style={styles.entryHeader}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: C.navy }}>Education {i + 1}</span>
            <button style={styles.deleteBtn} onClick={() => removeItem("education", i)}><Icon.Trash /></button>
          </div>
          <div style={{ ...styles.grid2, marginBottom: "14px" }}>
            <Field label="Degree / Level">
              <select style={styles.select} value={edu.degree} onChange={e => updateArr("education", i, "degree", e.target.value)}>
                <option value="">Select level</option>
                <option>High School Diploma</option>
                <option>Associate's Degree</option>
                <option>Bachelor's Degree</option>
                <option>Master's Degree</option>
                <option>Doctorate (PhD)</option>
                <option>Professional Certificate</option>
                <option>Bootcamp / Vocational</option>
              </select>
            </Field>
            <Field label="Institution / University"><input style={styles.input} value={edu.institution} onChange={e => updateArr("education", i, "institution", e.target.value)} placeholder="MIT" /></Field>
          </div>
          <div style={{ ...styles.grid3, marginBottom: "14px" }}>
            <Field label="Field of Study"><input style={styles.input} value={edu.field} onChange={e => updateArr("education", i, "field", e.target.value)} placeholder="Computer Science" /></Field>
            <Field label="Start Year"><input style={styles.input} value={edu.startYear} onChange={e => updateArr("education", i, "startYear", e.target.value)} placeholder="2018" /></Field>
            <Field label="End Year / Expected"><input style={styles.input} value={edu.endYear} onChange={e => updateArr("education", i, "endYear", e.target.value)} placeholder="2022" /></Field>
          </div>
          <Field label="GPA / Grade (optional)">
            <input style={styles.input} value={edu.gpa} onChange={e => updateArr("education", i, "gpa", e.target.value)} placeholder="3.8 / 4.0" />
          </Field>
        </div>
      ))}
      <button style={styles.addBtn} onClick={() => addItem("education", { degree: "", institution: "", field: "", startYear: "", endYear: "", gpa: "" })}>
        <Icon.Plus /> Add Education
      </button>
    </div>
  );

  const renderSkills = () => (
    <div>
      <div style={styles.sectionTitle}><Icon.Zap /> Skills</div>
      <p style={styles.sectionSub}>Highlight your professional skills relevant to the job.</p>
      <div style={{ marginBottom: "16px", padding: "12px 16px", background: "#F0F4FF", borderRadius: "10px", fontSize: "13px", color: C.navy }}>
        💡 <strong>Tip:</strong> Focus on work-related skills (e.g., Project Management, Data Analysis). Avoid generic hobbies like chess or hiking.
      </div>
      <div style={styles.card}>
        <label style={{ ...styles.fieldLabel, marginBottom: "10px" }}>Technical Skills</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
          {data.skills.technical.map((s, i) => (
            <span key={i} style={styles.tag}>
              {s}
              <button onClick={() => removeSkill("technical", i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: C.navy, display: "flex" }}><Icon.X /></button>
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <input style={{ ...styles.input, flex: 1 }} value={data.skills.newSkill} onChange={e => update("skills", "newSkill", e.target.value)} onKeyDown={e => e.key === "Enter" && addSkill("technical")} placeholder="e.g. React, Python, AWS..." />
          <button style={{ ...styles.accentBtn, padding: "10px 16px" }} onClick={() => addSkill("technical")}><Icon.Plus /></button>
        </div>
      </div>
      <div style={styles.card}>
        <label style={{ ...styles.fieldLabel, marginBottom: "10px" }}>Soft Skills</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
          {data.skills.soft.map((s, i) => (
            <span key={i} style={styles.tag}>
              {s}
              <button onClick={() => removeSkill("soft", i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: C.navy, display: "flex" }}><Icon.X /></button>
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <input style={{ ...styles.input, flex: 1 }} value={data.skills.newSoft} onChange={e => update("skills", "newSoft", e.target.value)} onKeyDown={e => e.key === "Enter" && addSkill("soft")} placeholder="e.g. Leadership, Communication..." />
          <button style={{ ...styles.accentBtn, padding: "10px 16px" }} onClick={() => addSkill("soft")}><Icon.Plus /></button>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div>
      <div style={styles.sectionTitle}><Icon.Code /> Projects</div>
      <p style={styles.sectionSub}>Showcase your notable personal or professional projects.</p>
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input type="checkbox" checked={data.skipProjects} onChange={e => {
            setData(d => ({ ...d, skipProjects: e.target.checked }));
            if (e.target.checked) setData(d => ({ ...d, projects: [] }));
          }} />
          <span style={{ fontSize: "13px", fontWeight: "500" }}>I have no projects to show (skip this section)</span>
        </label>
      </div>
      {!data.skipProjects && (
        <>
          {data.projects.map((proj, i) => (
            <div key={proj.id} style={styles.entryCard}>
              <div style={styles.entryHeader}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: C.navy }}>Project {i + 1}</span>
                <button style={styles.deleteBtn} onClick={() => removeItem("projects", i)}><Icon.Trash /></button>
              </div>
              <div style={{ ...styles.grid2, marginBottom: "14px" }}>
                <Field label="Project Name"><input style={styles.input} value={proj.name} onChange={e => updateArr("projects", i, "name", e.target.value)} placeholder="E-commerce Platform" /></Field>
                <Field label="Technologies Used"><input style={styles.input} value={proj.tech} onChange={e => updateArr("projects", i, "tech", e.target.value)} placeholder="React, Node.js, MongoDB" /></Field>
              </div>
              <Field label="Project Link / GitHub (optional)">
                <input style={{ ...styles.input, marginBottom: "14px" }} value={proj.link} onChange={e => updateArr("projects", i, "link", e.target.value)} placeholder="https://github.com/user/project" />
              </Field>
              <Field label="Description">
                <textarea style={styles.textarea} rows="3" value={proj.description} onChange={e => updateArr("projects", i, "description", e.target.value)} placeholder="Built a full-stack e-commerce solution with real-time inventory management..." />
              </Field>
            </div>
          ))}
          <button style={styles.addBtn} onClick={() => addItem("projects", { name: "", tech: "", link: "", description: "" })}>
            <Icon.Plus /> Add Project
          </button>
        </>
      )}
    </div>
  );

  const renderLanguages = () => (
    <div>
      <div style={styles.sectionTitle}><Icon.Language /> Languages</div>
      <p style={styles.sectionSub}>Languages you speak and your proficiency level.</p>
      {data.languages.map((lang, i) => (
        <div key={lang.id} style={styles.entryCard}>
          <div style={styles.entryHeader}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: C.navy }}>Language {i + 1}</span>
            <button style={styles.deleteBtn} onClick={() => removeItem("languages", i)}><Icon.Trash /></button>
          </div>
          <div style={styles.grid2}>
            <Field label="Language"><input style={styles.input} value={lang.name} onChange={e => updateArr("languages", i, "name", e.target.value)} placeholder="Arabic" /></Field>
            <Field label="Proficiency Level">
              <select style={styles.select} value={lang.level} onChange={e => updateArr("languages", i, "level", e.target.value)}>
                <option value="">Select level</option>
                <option>Native</option>
                <option>Fluent</option>
                <option>Advanced</option>
                <option>Intermediate</option>
                <option>Basic</option>
              </select>
            </Field>
          </div>
        </div>
      ))}
      <button style={styles.addBtn} onClick={() => addItem("languages", { name: "", level: "" })}>
        <Icon.Plus /> Add Language
      </button>
    </div>
  );

  const renderCertifications = () => (
    <div>
      <div style={styles.sectionTitle}><Icon.Award /> Certifications</div>
      <p style={styles.sectionSub}>Professional certifications and credentials.</p>
      {data.certifications.map((cert, i) => (
        <div key={cert.id} style={styles.entryCard}>
          <div style={styles.entryHeader}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: C.navy }}>Certification {i + 1}</span>
            <button style={styles.deleteBtn} onClick={() => removeItem("certifications", i)}><Icon.Trash /></button>
          </div>
          <div style={{ ...styles.grid3 }}>
            <Field label="Certification Name"><input style={styles.input} value={cert.name} onChange={e => updateArr("certifications", i, "name", e.target.value)} placeholder="AWS Solutions Architect" /></Field>
            <Field label="Issuing Organization"><input style={styles.input} value={cert.issuer} onChange={e => updateArr("certifications", i, "issuer", e.target.value)} placeholder="Amazon Web Services" /></Field>
            <Field label="Date Obtained"><input style={styles.input} value={cert.date} onChange={e => updateArr("certifications", i, "date", e.target.value)} placeholder="March 2023" /></Field>
          </div>
        </div>
      ))}
      <button style={styles.addBtn} onClick={() => addItem("certifications", { name: "", issuer: "", date: "" })}>
        <Icon.Plus /> Add Certification
      </button>
    </div>
  );

  const renderInterests = () => (
    <div>
      <div style={styles.sectionTitle}><Icon.Heart /> Interests & Hobbies</div>
      <p style={styles.sectionSub}>Personal interests that show your personality.</p>
      <div style={styles.card}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
          {data.interests.map((interest, i) => (
            <span key={i} style={styles.tag}>
              {interest}
              <button onClick={() => setData(d => ({ ...d, interests: d.interests.filter((_, idx) => idx !== i) }))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: C.navy, display: "flex" }}><Icon.X /></button>
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <input style={{ ...styles.input, flex: 1 }} value={data.newInterest || ""} onChange={e => setData(d => ({ ...d, newInterest: e.target.value }))} onKeyDown={e => e.key === "Enter" && addInterest()} placeholder="e.g. Photography, Chess, Hiking..." />
          <button style={{ ...styles.accentBtn, padding: "10px 16px" }} onClick={addInterest}><Icon.Plus /></button>
        </div>
      </div>
    </div>
  );

  const renderGenerate = () => (
    <div>
      <div style={styles.sectionTitle}><Icon.Sparkles /> Generate Your Resume</div>
      <p style={styles.sectionSub}>Review your information and generate a professional resume.</p>
      <div style={{ ...styles.card, background: `${C.gray100}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontSize: "14px", fontWeight: "700", color: C.navy }}>Profile Completion</span>
          <span style={{ fontSize: "20px", fontWeight: "900", color: pct >= 70 ? C.navy : C.textMuted }}>{pct}%</span>
        </div>
        <div style={styles.progressBar()}>
          <div style={styles.progressFill(pct)} />
        </div>
        <p style={{ fontSize: "12px", color: C.textMuted, marginTop: "8px", marginBottom: 0 }}>
          {pct < 50 ? "Add more essential sections to create a stronger resume." : pct < 80 ? "Looking good! A few more details will make it shine." : "Excellent! Your resume is well-rounded."}
        </p>
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px", marginTop: "16px" }}>
        <button style={styles.accentBtn} onClick={handleGenerate} disabled={generating}>
          <Icon.Sparkles />
          {generating ? "Generating..." : "Generate Resume"}
        </button>
        {generated && (
          <>
            <button style={styles.primaryBtn} onClick={handleDownload}>
              <Icon.Download /> Download PDF
            </button>
            <button style={{ ...styles.primaryBtn, background: `linear-gradient(135deg, ${C.accent}, ${C.navy})` }} onClick={handleSave}>
              <Icon.Save /> Save Resume
            </button>
          </>
        )}
        <button style={styles.accentBtn} onClick={handleAIEnhanceAll} disabled={aiEnhancingAll}>
          <Icon.Sparkles />
          {aiEnhancingAll ? "Enhancing all text..." : "AI Enhance All"}
        </button>
      </div>
      {enhanceMessage && (
        <div style={{ marginTop: "10px", padding: "8px 12px", background: "#e8f0fe", borderRadius: "8px", fontSize: "13px" }}>
          {enhanceMessage}
        </div>
      )}
      {savedMsg && (
        <div style={{ marginTop: "14px", padding: "12px 18px", borderRadius: "10px", background: `${C.accent}18`, border: `1px solid ${C.accent}`, color: C.navy, fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
          <Icon.Check /> {savedMsg}
        </div>
      )}
    </div>
  );

  const sectionRenderers = {
    personal: renderPersonal,
    contact: renderContact,
    objective: renderObjective,
    experience: renderExperience,
    education: renderEducation,
    skills: renderSkills,
    projects: renderProjects,
    languages: renderLanguages,
    certifications: renderCertifications,
    interests: renderInterests,
    generate: renderGenerate,
  };

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus, textarea:focus, select:focus { border-color: ${C.accent} !important; box-shadow: 0 0 0 3px ${C.accent}18; }
        button:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        button:active:not(:disabled) { transform: translateY(0); }
        button:disabled { opacity: 0.6; cursor: not-allowed; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        @media print {
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview { position: fixed; left: 0; top: 0; width: 100%; }
        }
        @media screen and (max-width: 1024px) {
          .layout { flex-direction: column !important; }
          .sidebar { width: 100% !important; min-width: 100% !important; flex-direction: row !important; flex-wrap: wrap !important; padding: 16px 20px !important; gap: 8px !important; border-right: none !important; border-bottom: 1px solid ${C.border} !important; }
          .sidebar button { flex: 1 !important; min-width: 140px !important; justify-content: center !important; margin-right: 0 !important; border-left: none !important; border-bottom: 3px solid transparent !important; border-radius: 8px 8px 0 0 !important; padding: 10px 16px !important; }
          .sidebar button[style*="border-left: 3px solid"] { border-left: none !important; border-bottom: 3px solid ${C.accent} !important; }
          .main { padding: 24px 20px !important; }
          .header { padding: 16px 20px !important; flex-wrap: wrap !important; gap: 12px !important; }
          .logoText { font-size: 18px !important; }
        }
        @media screen and (max-width: 768px) {
          .grid2, .grid3 { grid-template-columns: 1fr !important; gap: 12px !important; }
          .card { padding: 20px !important; }
          .sectionTitle { font-size: 20px !important; }
          .sectionSub { font-size: 13px !important; margin-bottom: 20px !important; }
          .sidebar { padding: 12px 16px !important; }
          .sidebar button { min-width: 120px !important; font-size: 13px !important; padding: 8px 12px !important; }
          .header > div:last-child { width: 100% !important; justify-content: space-between !important; }
          .entryCard { padding: 16px !important; }
          .primaryBtn, .accentBtn { padding: 10px 20px !important; font-size: 14px !important; width: 100% !important; justify-content: center !important; }
          .resume-preview-container { transform: scale(0.7); transform-origin: top left; }
        }
        @media screen and (max-width: 480px) {
          .header { padding: 12px 16px !important; }
          .logoText { font-size: 16px !important; }
          .sidebar { padding: 10px 12px !important; }
          .sidebar button { min-width: 100px !important; font-size: 12px !important; gap: 6px !important; }
          .sidebar button svg { width: 14px !important; height: 14px !important; }
          .main { padding: 20px 16px !important; }
          .sectionTitle { font-size: 18px !important; }
          .card { padding: 16px !important; border-radius: 12px !important; }
          .input, .textarea, .select { padding: 8px 12px !important; font-size: 13px !important; }
          .fieldLabel { font-size: 11px !important; }
          .tag { font-size: 12px !important; padding: 3px 10px !important; }
          .entryHeader span { font-size: 12px !important; }
          .deleteBtn { width: 26px !important; height: 26px !important; }
          .addBtn { padding: 8px 14px !important; font-size: 12px !important; }
          .resume-preview-container { transform: scale(0.5); }
        }
      `}</style>

      {/* <header style={styles.header} className="header"> */}
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
        {/* <div style={styles.logoText} className="logoText">
          cv<span style={styles.logoAccent}>craft</span>
          <span style={{ fontSize: "12px", fontWeight: "500", color: `${C.white}77`, marginLeft: "10px", letterSpacing: "0.5px" }}>AI-Powered Resume Builder</span>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: `${C.white}15`, padding: "6px 14px", borderRadius: "20px" }}>
            <div style={{ width: "60px", height: "5px", borderRadius: "3px", background: `${C.white}30`, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: C.accent, borderRadius: "3px", transition: "width 0.4s" }} />
            </div>
            <span style={{ fontSize: "12px", fontWeight: "700", color: C.accent }}>{pct}%</span>
          </div>
          {generated && (
            <button style={{ ...styles.accentBtn, padding: "8px 18px", fontSize: "13px" }} onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
          )}
        </div>
      </header> */}

      <div style={styles.layout} className="layout">
        <aside style={styles.sidebar} className="sidebar">
          <div style={{ padding: "0 16px 16px", borderBottom: `1px solid ${C.border}`, marginBottom: "8px" }}>
            <p style={{ fontSize: "11px", fontWeight: "700", color: C.textMuted, letterSpacing: "0.8px", textTransform: "uppercase" }}>Sections</p>
          </div>
          {SECTIONS.map(({ id, label, Icon: SIcon }) => (
            <button key={id} style={styles.sidebarBtn(activeSection === id)} onClick={() => setActiveSection(id)}>
              <SIcon />
              <span>{label}</span>
              {id === "generate" && pct === 100 && (
                <span style={{ marginLeft: "auto", width: "8px", height: "8px", borderRadius: "50%", background: C.accent, flexShrink: 0 }} />
              )}
            </button>
          ))}
        </aside>

        <main style={styles.main} className="main">
          {showPreview && generated ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
                <div style={styles.sectionTitle}><Icon.Sparkles /> Professional Resume Preview</div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button style={styles.primaryBtn} onClick={handleDownload}><Icon.Download /> Download PDF</button>
                  <button style={{ ...styles.primaryBtn, background: `linear-gradient(135deg, ${C.accent}, ${C.navy})` }} onClick={handleSave}><Icon.Save /> Save</button>
                  <button style={{ ...styles.accentBtn, padding: "12px 18px" }} onClick={() => setShowPreview(false)}>Back to Edit</button>
                </div>
              </div>
              <div id="resume-preview" className="resume-preview-container" style={{ overflowX: "auto" }}>
                <ResumePreview data={data} resumeRef={resumeRef} />
              </div>
            </div>
          ) : (
            sectionRenderers[activeSection]?.()
          )}

          {activeSection !== "generate" && !showPreview && (
            <div style={{ marginTop: "28px", display: "flex", justifyContent: "flex-end" }}>
              <button style={styles.primaryBtn} onClick={() => {
                const idx = SECTIONS.findIndex(s => s.id === activeSection);
                if (idx < SECTIONS.length - 1) setActiveSection(SECTIONS[idx + 1].id);
              }}>
                Next Section <Icon.ChevronRight />
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer/>
    </div>

  
  );
}