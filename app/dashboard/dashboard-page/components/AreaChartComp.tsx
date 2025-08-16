"use client";

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
import { useEffect, useState } from "react";

type ExpenseData = {
  date: string;
  expense: number;
};

// Format date as d/m
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}`;
};

export default function AreaChartComp() {
  const [data, setData] = useState<ExpenseData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/expenses/stats`);
      const json = await res.json();
      setData(json); // API returns [{ date, totalExpense }]
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-full rounded-2xl shadow-lg relative">
      {data.length === 0 && (
        <h3 className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-center text-sm text-neutral-700">
          no expense available <br />
          to show
        </h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="2 2" stroke="#323232" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fill: "#aaa" }}
            stroke="#2B2B2B"
          />
          <YAxis tick={{ fill: "#aaa" }} stroke="#2B2B2B" />
          <Legend />
          <Tooltip
            labelFormatter={(value) => `Date: ${formatDate(value as string)}`}
            formatter={(val) => [`₹${val}`, "Expense"]}
            contentStyle={{
              backgroundColor: "#262626",
              border: 0,
              color: "#fff",
            }}
            itemStyle={{ color: "#3b82f6" }}
            labelStyle={{ color: "#f1f5f9" }}
          />

          <Area
            type="monotone"
            dataKey="expense" // match API key
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorExpense)"
            name="Daily Expense"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    
  );
}
