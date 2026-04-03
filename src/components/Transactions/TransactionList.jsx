import { useApp } from "../../context/AppContext.jsx";
import TransactionRow from "./TransactionRow.jsx";

export default function TransactionList({ transactions, onEdit }) {
  const { darkMode } = useApp();

  const surface   = darkMode ? "#1f1f1f" : "#ffffff";
  const border    = darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const textMuted = darkMode ? "#555350" : "#aaa8a0";

  if (transactions.length === 0) {
    return (
      <div style={{
        background: surface, border: `1px solid ${border}`,
        borderRadius: 16, padding: "20px 24px",
      }}>
        <div style={{ textAlign: "center", padding: "48px 0", color: textMuted }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 15 }}>No transactions match your filters</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Try adjusting your search or filters</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: surface, border: `1px solid ${border}`,
      borderRadius: 16, padding: "20px 24px",
    }}>
      {transactions.map(tx => (
        <TransactionRow key={tx.id} tx={tx} showActions={true} onEdit={onEdit} />
      ))}
    </div>
  );
}