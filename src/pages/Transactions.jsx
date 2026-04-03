import { useState, useMemo } from "react";
import { useApp }             from "../context/AppContext.jsx";
import TransactionFilters     from "../components/Transactions/TransactionFilters.jsx";
import TransactionList        from "../components/Transactions/TransactionList.jsx";
import TransactionModal       from "../components/Transactions/TransactionModal.jsx";

export default function Transactions() {
  const { darkMode, transactions, role } = useApp();

  const [search,         setSearch]         = useState("");
  const [filterType,     setFilterType]     = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy,         setSortBy]         = useState("date-desc");
  const [showModal,      setShowModal]      = useState(false);
  const [editingTx,      setEditingTx]      = useState(null);

  const textMuted = darkMode ? "#555350" : "#aaa8a0";

  const filtered = useMemo(() => {
    let tx = [...transactions];
    if (search)
      tx = tx.filter(t =>
        t.desc.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
      );
    if (filterType !== "all")
      tx = tx.filter(t => t.type === filterType);
    if (filterCategory !== "all")
      tx = tx.filter(t => t.category === filterCategory);
    tx.sort((a, b) => {
      if (sortBy === "date-desc")   return new Date(b.date) - new Date(a.date);
      if (sortBy === "date-asc")    return new Date(a.date) - new Date(b.date);
      if (sortBy === "amount-desc") return b.amount - a.amount;
      return a.amount - b.amount;
    });
    return tx;
  }, [transactions, search, filterType, filterCategory, sortBy]);

  const openAdd  = () => { setEditingTx(null);  setShowModal(true); };
  const openEdit = tx => { setEditingTx(tx);    setShowModal(true); };

  return (
    <div>
      <TransactionFilters
        search={search}                 setSearch={setSearch}
        filterType={filterType}         setFilterType={setFilterType}
        filterCategory={filterCategory} setFilterCategory={setFilterCategory}
        sortBy={sortBy}                 setSortBy={setSortBy}
        onAddClick={openAdd}
      />
      <TransactionList transactions={filtered} onEdit={openEdit} />
      <div style={{ marginTop: 10, fontSize: 12, color: textMuted }}>
        Showing {filtered.length} of {transactions.length} transactions
      </div>
      {showModal && role === "admin" && (
        <TransactionModal
          editingTx={editingTx}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}