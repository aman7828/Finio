import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { ALL_CATEGORIES } from "../../data/transactions.js";

const EMPTY = {
  desc: "", amount: "", category: "Food & Dining", type: "expense", date: "2026-04-01",
};

export default function TransactionModal({ editingTx, onClose }) {
  const { darkMode, addTransaction, updateTransaction } = useApp();
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(editingTx
      ? {
          desc:     editingTx.desc,
          amount:   String(editingTx.amount),
          category: editingTx.category,
          type:     editingTx.type,
          date:     editingTx.date,
        }
      : EMPTY
    );
  }, [editingTx]);

  const surface   = darkMode ? "#1f1f1f" : "#ffffff";
  const surface2  = darkMode ? "#2a2a2a" : "#f5f4f0";
  const border    = darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const text      = darkMode ? "#e6e4dc" : "#1e1e1c";
  const textSub   = darkMode ? "#888680" : "#6b6965";
  const textMuted = darkMode ? "#555350" : "#aaa8a0";
  const accent    = "#1D9E75";

  const inputStyle = {
    width: "100%", padding: "9px 12px", borderRadius: 10,
    border: `1px solid ${border}`,
    background: surface2, color: text, fontSize: 14,
  };

  const handleSave = () => {
    if (!form.desc.trim() || !form.amount) return;
    const data = { ...form, amount: Number(form.amount) };
    if (editingTx) {
      updateTransaction(editingTx.id, data);
    } else {
      addTransaction(data);
    }
    onClose();
  };

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 200,
      }}
    >
      <div style={{
        background: surface, borderRadius: 20, padding: 28,
        width: 380, maxWidth: "90vw",
        border: `1px solid ${border}`,
      }}>
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 22, marginBottom: 20, color: text,
        }}>
          {editingTx ? "Edit Transaction" : "New Transaction"}
        </div>

        {[
          { label: "Description", key: "desc",   type: "text",   placeholder: "e.g. Grocery Store" },
          { label: "Amount (₹)",  key: "amount", type: "number", placeholder: "e.g. 2500"          },
          { label: "Date",        key: "date",   type: "date",   placeholder: ""                    },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, color: textMuted, display: "block", marginBottom: 5 }}>
              {f.label}
            </label>
            <input
              type={f.type}
              value={form[f.key]}
              placeholder={f.placeholder}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              style={inputStyle}
            />
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, color: textMuted, display: "block", marginBottom: 5 }}>Type</label>
          <div style={{ display: "flex", gap: 8 }}>
            {["income", "expense"].map(t => (
              <button
                key={t}
                onClick={() => setForm(p => ({ ...p, type: t }))}
                style={{
                  flex: 1, padding: "8px", borderRadius: 10,
                  border: `1px solid ${border}`,
                  cursor: "pointer", fontSize: 13, fontWeight: 500,
                  background: form.type === t
                    ? (t === "income" ? "#1D9E75" : "#D85A30")
                    : surface2,
                  color: form.type === t ? "#fff" : textSub,
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, color: textMuted, display: "block", marginBottom: 5 }}>Category</label>
          <select
            value={form.category}
            onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
            style={inputStyle}
          >
            {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "10px", borderRadius: 10,
              border: `1px solid ${border}`,
              background: surface2, color: textSub,
              fontSize: 14, cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              flex: 1, padding: "10px", borderRadius: 10,
              border: "none", background: accent,
              color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer",
            }}
          >
            {editingTx ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}