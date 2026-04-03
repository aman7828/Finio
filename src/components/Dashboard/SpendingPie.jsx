import { useApp } from "../../context/AppContext.jsx";
import { CATEGORY_COLORS } from "../../data/transactions.js";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const fmt = n => "₹" + Math.abs(n).toLocaleString("en-IN");

export default function SpendingPie() {
  const { darkMode, categoryData } = useApp();

  const surface      = darkMode ? "#1f1f1f" : "#ffffff";
  const border       = darkMode ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const textSub      = darkMode ? "#888680" : "#6b6965";
  const tooltipStyle = {
    background: surface,
    border: `1px solid ${border}`,
    borderRadius: 10,
    color: darkMode ? "#e6e4dc" : "#1e1e1c",
    fontSize: 12,
  };

  return (
    <div style={{
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 16,
      padding: "20px 24px",
    }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: textSub, marginBottom: 4 }}>
        Spending Breakdown
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%" cy="50%"
            innerRadius={52} outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {categoryData.map((e, i) => (
              <Cell key={i} fill={CATEGORY_COLORS[e.name] || "#888780"} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={v => [fmt(v), "Spent"]} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px" }}>
        {categoryData.slice(0, 5).map(d => (
          <span key={d.name} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: textSub }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: CATEGORY_COLORS[d.name],
              display: "inline-block",
            }} />
            {d.name}
          </span>
        ))}
      </div>
    </div>
  );
}