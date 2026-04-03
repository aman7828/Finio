import { useApp } from "../../context/AppContext.jsx";
import { COLORS } from "../../data/transactions.js";

const fmt      = n => "₹" + Math.abs(n).toLocaleString("en-IN");
const fmtShort = n => n >= 100000
  ? "₹" + (n / 100000).toFixed(1) + "L"
  : "₹" + (n / 1000).toFixed(0) + "K";

export default function StatCards() {
  const { darkMode, totalIncome, totalExpense, balance, transactions } = useApp();

  const surface   = darkMode ? "#1f1f1f" : "#ffffff";
  const border    = darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const text      = darkMode ? "#e6e4dc" : "#1e1e1c";
  const textMuted = darkMode ? "#555350" : "#aaa8a0";

  const savingsRate   = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) + "%" : "0%";
  const incomeCount   = transactions.filter(t => t.type === "income").length;
  const expenseCount  = transactions.filter(t => t.type === "expense").length;

  const cards = [
    {
      label: "Net Balance",
      value: fmt(balance),
      color: balance >= 0 ? COLORS.income : COLORS.expense,
      sub: balance >= 0 ? "Positive balance" : "Negative balance",
      icon: "💳",
    },
    {
      label: "Total Income",
      value: fmtShort(totalIncome),
      color: COLORS.income,
      sub: `${incomeCount} transactions`,
      icon: "📈",
    },
    {
      label: "Total Expenses",
      value: fmtShort(totalExpense),
      color: COLORS.expense,
      sub: `${expenseCount} transactions`,
      icon: "📉",
    },
    {
      label: "Savings Rate",
      value: savingsRate,
      color: COLORS.teal,
      sub: "of total income",
      icon: "🎯",
    },
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 14,
      marginBottom: 20,
    }}>
      {cards.map(c => (
        <div key={c.label} style={{
          background: surface,
          border: `1px solid ${border}`,
          borderRadius: 16,
          padding: "20px 24px",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", marginBottom: 10,
          }}>
            <span style={{ fontSize: 12, color: textMuted }}>{c.label}</span>
            <span style={{ fontSize: 18 }}>{c.icon}</span>
          </div>
          <div style={{
            fontSize: 24, fontWeight: 600, color: c.color,
            fontFamily: "'DM Serif Display', serif", letterSpacing: -0.5,
          }}>
            {c.value}
          </div>
          <div style={{ fontSize: 11, color: textMuted, marginTop: 3 }}>{c.sub}</div>
        </div>
      ))}
    </div>
  );
}