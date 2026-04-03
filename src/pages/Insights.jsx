import TopCategory       from "../components/Insights/TopCategory.jsx";
import SavingsRate       from "../components/Insights/SavingsRate.jsx";
import MonthlyComparison from "../components/Insights/MonthlyComparison.jsx";
import CategoryBreakdown from "../components/Insights/CategoryBreakdown.jsx";
import IncomeSources     from "../components/Insights/IncomeSources.jsx";
import Observations      from "../components/Insights/Observations.jsx";

export default function Insights() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <TopCategory />
      <SavingsRate />
      <MonthlyComparison />
      <CategoryBreakdown />
      <IncomeSources />
      <Observations />
    </div>
  );
}