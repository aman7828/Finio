import { useApp } from "./context/AppContext.jsx";
import Header       from "./components/Layout/Header.jsx";
import Dashboard    from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import Insights     from "./pages/Insights.jsx";

export default function App() {
  const { darkMode, activeTab } = useApp();

  const bg   = darkMode ? "#151515" : "#f5f4f0";
  const text = darkMode ? "#e6e4dc" : "#1e1e1c";

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, transition: "background 0.2s" }}>
      <Header />
      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "24px" }}>
        {activeTab === "dashboard"    && <Dashboard />}
        {activeTab === "transactions" && <Transactions />}
        {activeTab === "insights"     && <Insights />}
      </main>
    </div>
  );
}