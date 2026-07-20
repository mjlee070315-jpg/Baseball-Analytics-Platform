import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function PerformanceChart({ gameLog }) {
  if (!gameLog || gameLog.length === 0) {
    return null;
  }

  const data = gameLog.map((game, index) => ({
    game: index + 1,
    OPS: Number(game.ops),
    AVG: Number(game.avg),
  }));

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2>Season Performance Trend</h2>
        <p>OPS & AVG progression throughout the season</p>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 25,
            left: 5,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="opsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.03} />
            </linearGradient>

            <linearGradient id="avgGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.03} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#e5e7eb"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="game"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 13 }}
          />

          <YAxis
            domain={[0, 1]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 13 }}
          />

          <Tooltip
            formatter={(value) => Number(value).toFixed(3)}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 8px 24px rgba(0,0,0,.15)",
            }}
          />

          <Legend verticalAlign="top" height={40} />

          <Area
            type="monotone"
            dataKey="OPS"
            stroke="#2563eb"
            strokeWidth={3}
            fill="url(#opsGradient)"
            dot={false}
            activeDot={{ r: 6 }}
          />

          <Area
            type="monotone"
            dataKey="AVG"
            stroke="#ef4444"
            strokeWidth={3}
            fill="url(#avgGradient)"
            dot={false}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceChart;