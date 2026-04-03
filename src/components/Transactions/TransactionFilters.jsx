import { useApp } from "../../context/AppContext";

export default function TransactionFilters({
  search, setSearch,
  filterType, setFilterType,
  filterCategory, setFilterCategory,
  sortBy, setSortBy,
  onAddClick,
}) {
  const { darkMode, role, transactions } = useApp();

  const surface  = darkMode ? "#1f1f1f" : "#ffffff";
  const surface2 = darkMode ? "#2a2a2a" : "#f5f4f0";
  const border   = darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const text     = darkMode ? "#e6e4dc" : "#1e1e1c";
  const accent   = "#1D9E75";

  const categories = [...new Set(transactions.map(t => t.category))].sort();

  const base = {
    padding: "8px 12px", borderRadius: 10,
    border: `1px solid ${border}`, background: surface,
    color: text, fontSize: 13, cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by name or category..."
        style={{ ...base, flex: 1, minWidth: 180, background: surface }}
      />
      <select value={filterType} onChange={e => setFilterType(e.target.value)} style={base}>
        <option value="all">All Types</option>
        <option value="income">Income only</option>
        <option value="expense">Expenses only</option>
      </select>
      <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={base}>
        <option value="all">All Categories</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={base}>
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="amount-desc">Highest amount</option>
        <option value="amount-asc">Lowest amount</option>
      </select>
      {role === "admin" && (
        <button
          onClick={onAddClick}
          style={{ ...base, background: accent, color: "#fff", border: "none", fontWeight: 500, flexShrink: 0 }}
        >
          + Add Transaction
        </button>
      )}
    </div>
  );
}