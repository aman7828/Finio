import StatCards          from "../components/Dashboard/StatCards.jsx";
import MonthlyChart       from "../components/Dashboard/MonthlyChart.jsx";
import SpendingPie        from "../components/Dashboard/SpendingPie.jsx";
import SavingsTrend       from "../components/Dashboard/SavingsTrend.jsx";
import RecentTransactions from "../components/Dashboard/RecentTransactions.jsx";

export default function Dashboard() {
  return (
    <div>
      <StatCards />
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }}>
        <MonthlyChart />
        <SpendingPie />
      </div>
      <SavingsTrend />
      <RecentTransactions />
    </div>
  );
}