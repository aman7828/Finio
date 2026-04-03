import { useApp } from "../../context/AppContext.jsx";
import { COLORS } from "../../data/transactions.js";

const fmt = n => "₹" + Math.abs(n).toLocaleString("en-IN");

export default function IncomeSources() {
  const { darkMode, transactions, totalIncome } = useApp();

  const surface   = darkMode ? "#1f1f1f" : "#ffffff";
  const border    = darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const text      = darkMode ? "#e6e4dc" : "#1e1e1c";
  const textSub   = darkMode ? "#888680" : "#6b6965";
  const textMuted = darkMode ? "#555350" : "#aaa8a0";

  const sources = ["Salary", "Freelance", "Investment"].map(cat => ({
    cat,
    val: transactions
      .filter(t => t.type === "income" && t.category === cat)
      .reduce((s, t) => s + t.amount, 0),
  })).filter(s => s.val > 0);

  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "20px 24px" }}>
      <div style={{ fontSize: 12, color: textMuted, marginBottom: 12 }}>INCOME SOURCES</div>
      {sources.map(({ cat, val }) => (
        <div key={cat} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 0", borderBottom: `1px solid ${border}`,
        }}>
          <span style={{ fontSize: 14, color: textSub }}>{cat}</span>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 600, color: COLORS.income }}>{fmt(val)}</div>
            <div style={{ fontSize: 11, color: textMuted }}>
              {((val / totalIncome) * 100).toFixed(0)}% of income
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}