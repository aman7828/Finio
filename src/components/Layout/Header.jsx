import { useApp } from "../../context/AppContext.jsx";

const TABS = [
  ["dashboard",    "Dashboard"],
  ["transactions", "Transactions"],
  ["insights",     "Insights"],
];

export default function Header() {
  const { darkMode, setDarkMode, role, setRole, activeTab, setActiveTab } = useApp();

  const surface  = darkMode ? "#1f1f1f" : "#ffffff";
  const border   = darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const text     = darkMode ? "#e6e4dc" : "#1e1e1c";
  const textSub  = darkMode ? "#888680" : "#6b6965";
  const surface2 = darkMode ? "#2a2a2a" : "#f5f4f0";
  const accent   = "#1D9E75";

  return (
    <header style={{
      background: surface,
      borderBottom: `1px solid ${border}`,
      padding: "0 24px",
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 58,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 9,
            background: accent,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: text }}>
            Finio
          </span>
        </div>

        <nav style={{ display: "flex", gap: 4 }}>
          {TABS.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                padding: "7px 16px", borderRadius: 9, border: "none",
                cursor: "pointer", fontSize: 13, fontWeight: 500,
                background: activeTab === id ? accent : "transparent",
                color:      activeTab === id ? "#fff" : textSub,
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{
              padding: "7px 12px", borderRadius: 9,
              border: `1px solid ${border}`,
              background: surface2, color: text,
              fontSize: 13, cursor: "pointer",
            }}
          >
            <option value="admin">👤 Admin</option>
            <option value="viewer">👁 Viewer</option>
          </select>

          <button
            onClick={() => setDarkMode(d => !d)}
            style={{
              width: 34, height: 34, borderRadius: 9,
              border: `1px solid ${border}`,
              background: surface2, cursor: "pointer", fontSize: 15,
            }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}