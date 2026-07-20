import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

function StatsChart({ stats }) {
  const data = [
    {
      name: "AVG",
      value: Number(stats.avg) || 0,
      display: stats.avg || "-",
    },
    {
      name: "OPS",
      value: Number(stats.ops) || 0,
      display: stats.ops || "-",
    },
    {
      name: "HR",
      value: Number(stats.homeRuns) || 0,
      display: stats.homeRuns || "-",
    },
    {
      name: "RBI",
      value: Number(stats.rbi) || 0,
      display: stats.rbi || "-",
    },
  ];

  const colors = [
    "#2563eb",
    "#3b82f6",
    "#60a5fa",
    "#93c5fd",
  ];

  return (
    <div className="chart-card">
      <h2>Player Performance</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          barCategoryGap={35}
        >
          <CartesianGrid
            stroke="#e5e7eb"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            tick={{ fill: "#374151", fontWeight: 700 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280" }}
          />

          <Tooltip
            cursor={{ fill: "#f3f4f6" }}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 8px 24px rgba(0,0,0,.12)",
            }}
            formatter={(value, name, props) => [
              props.payload.display,
              props.payload.name,
            ]}
          />

          <Bar
            dataKey="value"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={colors[index]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatsChart;