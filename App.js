import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function App() {
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/backtest/run_pro")
      .then(res => res.json())
      .then(res => {
        const chart = res.equity.map((v, i) => ({
          index: i,
          equity: v,
          benchmark: res.benchmark[i]
        }));
        setData(chart);
        setMetrics(res.performance);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📈 Quant AI Trading System</h1>

      <p>Return: {metrics.total_return}</p>
      <p>Drawdown: {metrics.max_drawdown}</p>
      <p>Win Rate: {metrics.win_rate}</p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="index" />
          <YAxis />
          <Tooltip />
          <Line dataKey="equity" />
          <Line dataKey="benchmark" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
