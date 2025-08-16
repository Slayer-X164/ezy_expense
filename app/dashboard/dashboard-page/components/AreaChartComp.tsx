"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "2025-07-10", amount: 800 },
  { date: "2025-07-11", amount: 650 },
  { date: "2025-07-12", amount: 900 },
  { date: "2025-07-13", amount: 1100 },
  { date: "2025-07-14", amount: 950 },
  { date: "2025-07-15", amount: 1200 },
  { date: "2025-07-16", amount: 1000 },
  { date: "2025-07-17", amount: 1050 },
  { date: "2025-07-18", amount: 1150 },
  { date: "2025-07-19", amount: 900 },
  { date: "2025-07-20", amount: 700 },
  { date: "2025-07-21", amount: 850 },
];

// Format date as d/m/yyyy
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export default function AreaChartComp() {
  return (
    <div className="w-full h-96 p-4 bg-gray-900 rounded-2xl shadow-lg">
      <h2 className="text-white text-xl font-semibold mb-4">Revenue</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fill: "#aaa" }}
          />
          <YAxis tick={{ fill: "#aaa" }} />
          <Tooltip labelFormatter={(value) => formatDate(value as string)} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorAmount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
