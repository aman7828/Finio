import { useApp } from "../../context/AppContext.jsx";
import { CATEGORY_COLORS } from "../../data/transactions.js";

const fmt = n => "₹" + Math.abs(n).toLocaleString("en-IN");

export default function CategoryBreakdown() {
  const { darkMode, categoryData } = useApp();

  const surface   = darkMode ? "#1f1f1f" : "#ffffff";
  const border    = darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const textSub   = darkMode ? "#888680" : "#6b6965";
  const textMuted = darkMode ? "#555350" : "#aaa8a0";
  const accent    = "#1D9E75";
  const top       = categoryData[0]?.value || 1;

  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "20px 24px" }}>
      <div style={{ fontSize: 12, color: textMuted, marginBottom: 12 }}>CATEGORY BREAKDOWN</div>
      {categoryData.slice(0, 6).map(d => (
        <div key={d.name} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
            <span style={{ color: textSub }}>{d.name}</span>
            <span style={{ fontWeight: 500 }}>{fmt(d.value)}</span>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: border, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${(d.value / top) * 100}%`,
              background: CATEGORY_COLORS[d.name] || accent,
              borderRadius: 2,
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}