import { useApp } from "../../context/AppContext.jsx";

export default function Observations() {
  const { darkMode, transactions, totalExpense } = useApp();

  const surface   = darkMode ? "#1f1f1f" : "#ffffff";
  const border    = darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const textSub   = darkMode ? "#888680" : "#6b6965";
  const textMuted = darkMode ? "#555350" : "#aaa8a0";

  const utilsPct = totalExpense > 0
    ? ((transactions
        .filter(t => t.category === "Utilities")
        .reduce((s, t) => s + t.amount, 0) / totalExpense) * 100
      ).toFixed(0)
    : 0;

  const marchCount = transactions.filter(t => t.date.startsWith("2026-03")).length;

  const obs = [
    ["🏠", `Rent & Utilities is ${utilsPct}% of your total expenses`],
    ["📅", `March had ${marchCount} transactions — your busiest month`],
    ["💹", "You invest ₹10,000/month via Mutual Fund SIP consistently"],
    ["🍽️", "Food & Dining spending increased from February → March"],
    ["✈️", "Travel spending appeared only in March — one-time expense"],
  ];

  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "20px 24px" }}>
      <div style={{ fontSize: 12, color: textMuted, marginBottom: 12 }}>OBSERVATIONS</div>
      {obs.map(([icon, text]) => (
        <div key={text} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 15, flexShrink: 0 }}>{icon}</span>
          <span style={{ fontSize: 13, color: textSub, lineHeight: 1.5 }}>{text}</span>
        </div>
      ))}
    </div>
  );
}