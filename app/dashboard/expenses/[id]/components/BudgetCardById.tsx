"use client";

import React, { useEffect, useState } from "react";
import BudgetCardSkeleton from "@/app/dashboard/budgets/_components/BudgetCardSkeleton";
import { div } from "framer-motion/client";

interface Budget {
  _id: string;
  name: string;
  amount: number;
  emoji: string;
  // Add more fields if your budget has them
}

const BudgetCardById = ({ id }: { id: string }) => {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [loading, setLoading] = useState(true);

  const getBudget = async () => {
    try {
      console.log("this id in BudgetCar", id);

      const res = await fetch(`/api/budgets/${id}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data) {
        setBudget(data.budget);
        console.log(data);
      } else {
        console.error("Error fetching budget:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch budget:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBudget();
  }, [id]);

  if (loading) {
    return (
      <div>
        {[1].map((el, idx) => (
          <div key={idx}>
            <BudgetCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (!budget) return <div className="text-red-500">Budget not found.</div>;

  return (
   <div>
    Manage {budget.name} expenses
     <div className="flex  items-center justify-between border-1 border-neutral-800 p-3 w-[350px] h-[100px]">
      <div className="flex items-center justify-center gap-2">
        <h2 className="text-3xl bg-neutral-800/70 p-1 rounded-full">
          {budget.emoji}
        </h2>
        <div>
          <h2 className="font-semibold text-xl text-neutral-300">
            {budget.name}
          </h2>
          <h3 className="text-sm text-neutral-500">4 expenses</h3>
        </div>
      </div>
      <div className="flex items-end flex-col">
        <h2 className="font-semibold text-neutral-200 text-lg">
          <span className="text-green-600 font-bold">₹{budget.amount}</span>
        </h2>
        <h3 className="text-xs text-red-500 bg-red-500/16 rounded-full px-2">
          spent ₹1400
        </h3>
      </div>
    </div>
   </div>
  );
};

export default BudgetCardById;
