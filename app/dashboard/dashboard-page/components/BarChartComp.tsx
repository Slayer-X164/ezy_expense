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
import { div } from "framer-motion/client";

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
    amount: Number(item.amount),

  }));
  console.log('budgetStat:',data);


  return (
    <div className="w-full h-full rounded-2xl shadow-lg relative">
      {data.length ==0 && <h3 className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-center text-sm text-neutral-700">no budget/spending available <br />to show</h3>}
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} barSize={25} barGap={5}>
        <CartesianGrid stroke="#323232" strokeDasharray="2"/>
        <XAxis dataKey="name"  stroke="#323232"/>
        <YAxis stroke="#323232"/>
        <Tooltip content={<CustomToolTip/>}  cursor={{ fill: "#262626", opacity: 0 }}/>
        <Legend />
        <Bar dataKey="amount" name="Budget" fill="#00821a" activeBar={false}/>
        <Bar dataKey="totalSpend" name="Spending" fill="#fa3448" activeBar={false} />
      </BarChart>
    </ResponsiveContainer>
    </div>

  );
}
