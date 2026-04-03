import { useApp } from "../../context/AppContext.jsx";
import { COLORS } from "../../data/transactions.js";

const fmt      = n => "₹" + Math.abs(n).toLocaleString("en-IN");
const fmtShort = n => n >= 100000
  ? "₹" + (n / 100000).toFixed(1) + "L"
  : "₹" + (n / 1000).toFixed(0) + "K";

export default function MonthlyComparison() {
  const { darkMode, monthlyData } = useApp();

  const surface   = darkMode ? "#1f1f1f" : "#ffffff";
  const border    = darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const text      = darkMode ? "#e6e4dc" : "#1e1e1c";
  const textMuted = darkMode ? "#555350" : "#aaa8a0";

  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "20px 24px" }}>
      <div style={{ fontSize: 12, color: textMuted, marginBottom: 12 }}>MONTHLY COMPARISON</div>
      {monthlyData.map(m => (
        <div key={m.month} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 0", borderBottom: `1px solid ${border}`,
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: text }}>{m.month} 2026</div>
            <div style={{ fontSize: 11, color: textMuted }}>
              Income {fmtShort(m.Income)} · Exp {fmtShort(m.Expenses)}
            </div>
          </div>
          <div style={{ fontWeight: 600, fontSize: 15, color: m.Net >= 0 ? COLORS.income : COLORS.expense }}>
            {m.Net >= 0 ? "+" : ""}{fmt(m.Net)}
          </div>
        </div>
      ))}
    </div>
  );
}