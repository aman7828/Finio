import { useApp } from "../../context/AppContext.jsx";
import { COLORS } from "../../data/transactions.js";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const fmt      = n => "₹" + Math.abs(n).toLocaleString("en-IN");
const fmtShort = n => n >= 100000
  ? "₹" + (n / 100000).toFixed(1) + "L"
  : "₹" + (n / 1000).toFixed(0) + "K";

export default function MonthlyChart() {
  const { darkMode, monthlyData } = useApp();

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
      <div style={{ fontSize: 13, fontWeight: 500, color: textSub, marginBottom: 14 }}>
        Monthly Overview
      </div>
      <ResponsiveContainer width="100%" height={210}>
        <BarChart data={monthlyData} barSize={20} barGap={4}>
          <XAxis dataKey="month" tick={{ fill: textSub, fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: textSub, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmtShort} />
          <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [fmt(v), n]} />
          <Bar dataKey="Income"   fill={COLORS.income}  radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expenses" fill={COLORS.expense} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
        {[["Income", COLORS.income], ["Expenses", COLORS.expense]].map(([l, c]) => (
          <span key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: textSub }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, background: c, display: "inline-block" }} />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}