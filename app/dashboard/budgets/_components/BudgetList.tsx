"use client";
import React, { useEffect, useState } from "react";
import CreateNewBudget from "./CreateNewBudget";
import { useSession } from "next-auth/react";
import BudgetCardSkeleton from "./BudgetCardSkeleton";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface IBudget {
  _id: string;
  name: string;
  amount: string;
  emoji: string;
  createdBy: string;
  totalSpent: number;
  totalExpenses: number;
}

const BudgetList = () => {
  const { data: session, status } = useSession();
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [expenses, setExpenses] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<IBudget | null>(null);

  const getAllBudgetsAndExpenses = async () => {
    if (!session?.user?.id) return;

    const res = await fetch("/api/budgets/stats");
    const resData = await res.json();
    if (resData.success) {
      const userBudgets = resData.data.filter(
        (budget: any) => budget.createdBy === session?.user?.id
      );
      setBudgets(userBudgets);
    }

    const resExpense = await fetch("/api/expenses");
    const resExpenseData = await resExpense.json();

    if (resExpenseData.success) {
      const userExpenses = resExpenseData.allExpense.filter(
        (expense: any) => expense.createdBy._id === session?.user?.id
      );
      setExpenses(userExpenses);
      setLoading(false);
    } else {
      console.error("Failed to fetch expenses:", resExpenseData.message);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getAllBudgetsAndExpenses();
    }
  }, [refresh, status]);

  // Delete handler
  const handleDelete = async () => {
    if (!selectedBudget) return;
    try {
      const res = await fetch(`/api/budgets/${selectedBudget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setSelectedBudget(null);
        setRefresh((prev) => !prev);
      } else {
        alert("Failed to delete budget");
      }
    } catch (err) {
      alert("Error deleting budget");
    }
  };

  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-10 ">
      <CreateNewBudget setRefresh={setRefresh} refresh={refresh} />
      {loading ? (
        [1, 2, 3, 4].map((element, idx) => (
          <div key={idx}>
            <BudgetCardSkeleton />
          </div>
        ))
      ) : budgets.length === 0 ? (
        <h3 className="w-[350px] h-[100px] flex items-center justify-center text-neutral-600 text-lg">
          No budget created yet
        </h3>
      ) : (
        budgets.map((budget, idx) => (
          <div
            key={idx}
            className="flex relative  items-center  justify-between border-1 border-neutral-800 p-3 w-full lg:w-[350px] h-[100px]"
          >
            <div className=" items-center justify-center gap-2 flex">
              {budget.totalSpent > parseInt(budget.amount) && (
                <h3 className="absolute text-sm text-yellow-500 bg-yellow-950 py-1 px-2 -top-3 -left-2">
                  over spending
                </h3>
              )}
              <h2 className="text-3xl bg-neutral-800/70 p-1 rounded-full">
                {budget.emoji}
              </h2>
              <div>
                <h2 className="font-semibold text-xl text-neutral-300">
                  {budget.name}
                </h2>
                <h3 className="text-sm text-neutral-500">
                  {budget.totalExpenses} expenses
                </h3>
              </div>
            </div>
            <div className="flex items-end flex-col ">
              <h3>
                <Trash2
                  className="w-4 absolute top-0 right-1 text-neutral-500 cursor-pointer"
                  onClick={() => {
                    setSelectedBudget(budget);
                    setShowModal(true);
                  }}
                />
              </h3>
              <h2 className=" font-semibold text-neutral-200 text-lg">
                <span className="text-green-600 font-bold">
                  ₹{budget.amount}
                </span>
              </h2>
              <h3 className="text-xs text-red-500 bg-red-500/16 rounded-full px-2">
                spent ₹{budget.totalSpent}
              </h3>
            </div>
          </div>
        ))
      )}

      {/* Modal */}
      {showModal && selectedBudget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80">
          <div className="bg-neutral-900 rounded-lg p-6 ">
            <h2 className="text-lg font-semibold mb-4 text-neutral-200">
              Delete Budget
            </h2>
            <p className="mb-6 text-sm text-neutral-400 max-w-md">
              Are you sure you want to delete{" "}
              <span className="font-bold text-neutral-400">
                {selectedBudget.name}
              </span>{" "}
              ?
              <br /> this will also delete all the expenses related to this
              budget.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded bg-neutral-700 cursor-pointer text-neutral-200"
                onClick={() => {
                  setShowModal(false);
                  setSelectedBudget(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-800 cursor-pointer text-white"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetList;
