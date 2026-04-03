import { useApp } from "../../context/AppContext.jsx";
import TransactionRow from "../Transactions/TransactionRow.jsx";

export default function RecentTransactions() {
  const { darkMode, transactions, setActiveTab } = useApp();

  const surface = darkMode ? "#1f1f1f" : "#ffffff";
  const border  = darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const textSub = darkMode ? "#888680" : "#6b6965";
  const accent  = "#1D9E75";

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div style={{
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 16,
      padding: "20px 24px",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 14,
      }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: textSub }}>Recent Transactions</span>
        <button
          onClick={() => setActiveTab("transactions")}
          style={{ fontSize: 12, color: accent, background: "none", border: "none", cursor: "pointer" }}
        >
          View all →
        </button>
      </div>
      {recent.map(tx => (
        <TransactionRow key={tx.id} tx={tx} showActions={false} />
      ))}
    </div>
  );
}