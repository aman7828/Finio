import { useApp } from "../../context/AppContext.jsx";

const fmt = n => "₹" + Math.abs(n).toLocaleString("en-IN");

export default function TransactionRow({ tx, showActions = true, onEdit }) {
  const { darkMode, role, deleteTransaction } = useApp();

  const border    = darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const text      = darkMode ? "#e6e4dc" : "#1e1e1c";
  const textMuted = darkMode ? "#555350" : "#aaa8a0";
  const surface2  = darkMode ? "#2a2a2a" : "#f5f4f0";
  const isIncome  = tx.type === "income";

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "11px 0",
      borderBottom: `1px solid ${border}`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 15,
        background: isIncome ? "#e1f5ee" : "#faece7",
      }}>
        {isIncome ? "💹" : "💸"}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 500, color: text,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {tx.desc}
        </div>
        <div style={{ fontSize: 12, color: textMuted }}>
          {tx.category} · {tx.date}
        </div>
      </div>

      <div style={{
        fontWeight: 600, fontSize: 14, flexShrink: 0,
        color: isIncome ? "#1D9E75" : "#D85A30",
      }}>
        {isIncome ? "+" : "-"}{fmt(tx.amount)}
      </div>

      {showActions && role === "admin" && (
        <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
          <button
            onClick={() => onEdit && onEdit(tx)}
            style={{
              width: 28, height: 28, borderRadius: 7,
              border: `1px solid ${border}`,
              background: surface2, cursor: "pointer", fontSize: 12,
            }}
            title="Edit"
          >✏️</button>
          <button
            onClick={() => deleteTransaction(tx.id)}
            style={{
              width: 28, height: 28, borderRadius: 7,
              border: `1px solid ${border}`,
              background: surface2, cursor: "pointer", fontSize: 12,
            }}
            title="Delete"
          >🗑</button>
        </div>
      )}
    </div>
  );
}