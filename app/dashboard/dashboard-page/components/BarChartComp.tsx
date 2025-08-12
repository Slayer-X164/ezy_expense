"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CustomToolTip } from "./CustomToolTip";

type BudgetItem = {
  _id: string;
  name: string;
  amount: string; // comes as string from API
  totalSpent: number;
};

type BarChartCompProps = {
  data: BudgetItem[];
};

export default function BarChartComp({ data }: BarChartCompProps) {
  const chartData = data.map((item) => ({
    name: item.name,
    totalSpend: item.totalSpent,
    amount: Number(item.amount), // convert to number for chart
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} barSize={25} barGap={5}>
        <CartesianGrid stroke="#6b7280" strokeDasharray="2 4"/>
        <XAxis dataKey="name"  />
        <YAxis />
        <Tooltip content={<CustomToolTip/>}  cursor={{ fill: "#262626", opacity: 0 }}/>
        <Legend />
        <Bar dataKey="totalSpend" name="Spending" fill="#fa3448" activeBar={false}/>
        <Bar dataKey="amount" name="Budget" fill="#00821a" activeBar={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}
