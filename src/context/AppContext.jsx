import { createContext, useContext, useState, useMemo } from "react";
import * as data from "../data/transactions.js"; // 🔥 import everything safely

const { INITIAL_TRANSACTIONS, CATEGORY_COLORS } = data;

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [role, setRole] = useState("admin");
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const balance = totalIncome - totalExpense;

  const monthlyData = useMemo(() => {
    const months = {
      Jan: { income: 0, expense: 0 },
      Feb: { income: 0, expense: 0 },
      Mar: { income: 0, expense: 0 },
    };

    transactions.forEach((t) => {
      const m = new Date(t.date).toLocaleString("en", {
        month: "short",
      });
      if (months[m]) months[m][t.type] += t.amount;
    });

    return Object.entries(months).map(([month, v]) => ({
      month,
      Income: v.income,
      Expenses: v.expense,
      Net: v.income - v.expense,
    }));
  }, [transactions]);

  const categoryData = useMemo(() => {
    const cats = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        cats[t.category] = (cats[t.category] || 0) + t.amount;
      });

    return Object.entries(cats)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const addTransaction = (tx) =>
    setTransactions((p) => [...p, { ...tx, id: Date.now() }]);

  const updateTransaction = (id, data) =>
    setTransactions((p) =>
      p.map((t) => (t.id === id ? { ...t, ...data } : t))
    );

  const deleteTransaction = (id) =>
    setTransactions((p) => p.filter((t) => t.id !== id));

  return (
    <AppContext.Provider
      value={{
        transactions,
        CATEGORY_COLORS, // ✅ now safely available
        role,
        setRole,
        darkMode,
        setDarkMode,
        activeTab,
        setActiveTab,
        totalIncome,
        totalExpense,
        balance,
        monthlyData,
        categoryData,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);