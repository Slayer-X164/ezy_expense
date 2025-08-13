import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


const BASE_COLORS = [
  "rgba(5, 150, 105, 0.8)",  // darker green
  "rgba(220, 38, 38, 0.8)",  // darker red
  "rgba(217, 119, 6, 0.8)",  // darker yellow-orange
  "rgba(29, 78, 216, 0.8)",  // darker blue
  "rgba(109, 40, 217, 0.8)"  // darker purple
];



const getColor = (index: number) => {
  if (index < BASE_COLORS.length) return BASE_COLORS[index];
  return `hsl(${(index * 137.5) % 360}, 70%, 50%)`; // Generates distinct colors
};

// Type for budget data
export interface BudgetData {
  name: string;
  amount: number;       // Total budget amount
  totalSpent: number;   // How much has been spent
  totalExpenses: number; // Number of expenses under this budget
}

interface BudgetPieChartProps {
  data: BudgetData[];
}

export default function BudgetPieChart({ data }: BudgetPieChartProps) {
  // Use totalSpent as the value for pie segments
  const spendingData = data.map((item) => ({
    name: item.name,
    value: item.totalSpent
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={spendingData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={90}
         stroke="#1f2937"
        fill="#000000"
        label
      >
        {spendingData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={getColor(index)} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: "#262626", // dark gray background
          border: "none"
        }}
        itemStyle={{
          color: "#f9fafb" // light text
        }}
      />
      <Legend />
    </PieChart>
  );
}
