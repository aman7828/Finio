import { useApp } from "../../context/AppContext.jsx";
import { COLORS } from "../../data/transactions.js";

const fmtShort = n => n >= 100000
  ? "₹" + (n / 100000).toFixed(1) + "L"
  : "₹" + (n / 1000).toFixed(0) + "K";

export default function SavingsRate() {
  const { darkMode, totalIncome, totalExpense, balance } = useApp();

  const surface   = darkMode ? "#1f1f1f" : "#ffffff";
  const border    = darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const text      = darkMode ? "#e6e4dc" : "#1e1e1c";
  const textSub   = darkMode ? "#888680" : "#6b6965";
  const textMuted = darkMode ? "#555350" : "#aaa8a0";
  const accent    = "#1D9E75";
  const rate      = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "20px 24px" }}>
      <div style={{ fontSize: 12, color: textMuted, marginBottom: 12 }}>SAVINGS RATE</div>
      <div style={{
        fontSize: 44, fontFamily: "'DM Serif Display', serif",
        color: balance >= 0 ? COLORS.income : COLORS.expense,
      }}>
        {rate}%
      </div>
      <div style={{ fontSize: 13, color: textSub, marginBottom: 14 }}>of total income saved</div>
      <div style={{ height: 5, borderRadius: 3, background: border, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${Math.max(0, Math.min(100, rate))}%`,
          background: accent, borderRadius: 3,
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
        <div>
          <div style={{ fontSize: 11, color: textMuted }}>Income</div>
          <div style={{ fontWeight: 600, color: COLORS.income }}>{fmtShort(totalIncome)}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: textMuted }}>Expenses</div>
          <div style={{ fontWeight: 600, color: COLORS.expense }}>{fmtShort(totalExpense)}</div>
        </div>
      </div>
    </div>
  );
}