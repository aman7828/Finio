import { useApp } from "../../context/AppContext.jsx";
import { COLORS } from "../../data/transactions.js";

const fmt = n => "₹" + Math.abs(n).toLocaleString("en-IN");

export default function TopCategory() {
  const { darkMode, categoryData, totalExpense } = useApp();

  const surface   = darkMode ? "#1f1f1f" : "#ffffff";
  const border    = darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const text      = darkMode ? "#e6e4dc" : "#1e1e1c";
  const textSub   = darkMode ? "#888680" : "#6b6965";
  const textMuted = darkMode ? "#555350" : "#aaa8a0";
  const top       = categoryData[0];

  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "20px 24px" }}>
      <div style={{ fontSize: 12, color: textMuted, marginBottom: 12 }}>TOP SPENDING CATEGORY</div>
      {top && (
        <>
          <div style={{ fontSize: 30, fontFamily: "'DM Serif Display', serif", color: COLORS.expense, marginBottom: 4 }}>
            {top.name}
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: text }}>{fmt(top.value)}</div>
          <div style={{ fontSize: 13, color: textSub, marginTop: 4 }}>
            {((top.value / totalExpense) * 100).toFixed(1)}% of total spending
          </div>
          <div style={{ marginTop: 14, height: 5, borderRadius: 3, background: border, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${(top.value / totalExpense) * 100}%`,
              background: COLORS.expense, borderRadius: 3,
            }} />
          </div>
        </>
      )}
    </div>
  );
}