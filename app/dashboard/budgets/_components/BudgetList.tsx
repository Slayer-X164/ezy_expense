"use client";
import React, { useEffect, useState } from "react";
import CreateNewBudget from "./CreateNewBudget";
import { useSession } from "next-auth/react";
import BudgetCardSkeleton from "./BudgetCardSkeleton";
import Link from "next/link";

interface IBudget {
  _id: string;
  name: string;
  amount: string;
  emoji: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

const BudgetList = () => {
  const { data: session, status } = useSession(); // use status to ensure session is loaded
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [expenses, setExpenses] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getAllBudgetsAndExpenses = async () => {
    if (!session?.user?.id) return;

    // 1. Fetch budgets
    const res = await fetch("/api/budgets");
    const resData = await res.json();

    if (resData.success) {
      const userBudgets = resData.budgets.filter(
        (budget: any) => budget.createdBy._id === session?.user?.id
      );
      setBudgets(userBudgets);
      console.log("filtered budgets", userBudgets);
    }

    // 2. Fetch expenses
    const resExpense = await fetch("/api/expenses");
    const resExpenseData = await resExpense.json();

    if (resExpenseData.success) {
      const userExpenses = resExpenseData.allExpense.filter(
        (expense: any) => expense.createdBy._id === session?.user?.id
      );
      setExpenses(userExpenses);
      console.log("filtered expenses", userExpenses);
    } else {
      console.error("Failed to fetch expenses:", resExpenseData.message);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getAllBudgetsAndExpenses();
    }
  }, [refresh, status]);
  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-10 ">
      <CreateNewBudget setRefresh={setRefresh} refresh={refresh} />
      {budgets.length > 0
        ? budgets.map((budget, idx) => (
            <Link key={idx} href={`/dashboard/expenses/${budget._id}`}>
            <div

              className="flex hover:shadow-2xl hover:shadow-green-700/20 cursor-pointer hover:border-green-600/30 hover:bg-green-600/15 items-center justify-between border-1 border-neutral-800 p-3 w-[350px] h-[100px]"
            >
              <div className=" items-center justify-center gap-2 flex">
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
              <div className="flex items-end flex-col ">
                <h2 className=" font-semibold text-neutral-200 text-lg">
                  <span className="text-green-600 font-bold">
                    ₹{budget.amount}
                  </span>
                </h2>
                <h3 className="text-xs text-red-500 bg-red-500/16 rounded-full px-2">
                  spent ₹1400
                </h3>
              </div>
            </div>
            </Link>
          ))
        : [1, 2, 3, 4].map((element, idx) => (
            <div key={idx}>
              <BudgetCardSkeleton />
            </div>
          ))}
    </div>
  );
};

export default BudgetList;
