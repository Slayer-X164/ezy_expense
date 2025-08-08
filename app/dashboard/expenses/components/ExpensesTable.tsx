"use client";

import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import z from "zod";
import ExpenseSkeleton from "./ExpenseSkeleton";

interface BudgetData {
  _id: string;
  name: string;
  amount: string;
  emoji: string;
  createdBy: {
    _id: string;
  };
}
interface ExpenseData {
  _id: string;
  name: string;
  amount: string;
  budgetId: {
    _id: string;
    name: "string";
    amount: string;
    createdBy: string;
  };
  createdBy: {
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ExpensesTableProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  amount: z
    .number("Amount must be a number")
    .positive("Amount must be greater than 0"),
});

export default function ExpensesTable({ open, setOpen }: ExpensesTableProps) {
  const { data: session, status } = useSession();
  const [expData, setExpData] = useState<ExpenseData[]>([]);
  const [budgets, setBudgets] = useState<BudgetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<{ name?: string; amount?: string }>({});
  const modalRef = useRef<HTMLDivElement>(null);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setOpen(false);
      setErrors({});
    }
  };

  const getAllExpense = async () => {
    if (!session?.user?.id) return;

    const res = await fetch("/api/expenses", { method: "GET" });
    const resData = await res.json();
    if (resData.success) {
      const userExpenses = resData.allExpense.filter(
        (expense: any) => expense.createdBy._id === session?.user?.id
      );
      setExpData(userExpenses);
      setLoading(false);
      console.log("filtered expenses", userExpenses);
    } else {
      console.error("Failed to fetch expenses:", resData.message);
    }
  };

  const getAllBudgets = async () => {
    if (!session?.user?.id) return;

    const res = await fetch("/api/budgets", { method: "GET" });
    const resData = await res.json();
    if (resData.success) {
      const userBudgets = resData.budgets.filter(
        (budget: any) => budget.createdBy._id === session?.user?.id
      );

      setBudgets(userBudgets);
      console.log("filtered budgets", userBudgets);
    } else {
      console.error("Failed to fetch budgets:", resData.message);
    }
  };

  useEffect(() => {
    getAllExpense();
    getAllBudgets();
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = schema.safeParse({
      name,
      amount: Number(amount),
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        amount: fieldErrors.amount?.[0],
      });
      return;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="overflow-x-auto shadow-md">
      <table className="min-w-full divide-y divide-neutral-800 text-left text-sm">
        <thead className="bg-neutral-900 text-neutral-600 uppercase">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Budget</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-900 text-neutral-200">
          {loading ? (
            <ExpenseSkeleton />
          ) : expData.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-neutral-400">
                No expenses found
              </td>
            </tr>
          ) : (
            expData.map((item, index) => (
              <tr key={index} className="hover:bg-neutral-950">
                <td className="px-6 py-3 font-light text-lg text-neutral-300">
                  {item.name}
                </td>
                <td className="px-6 py-3 font-light text-lg text-red-300">
                  {item.amount}
                </td>
                <td className="px-6 py-3 font-light text-lg text-green-300">
                  {item.budgetId.name}
                </td>
                <td className="px-6 py-3 font-light text-lg text-neutral-300">
                  {formatDate(item.createdAt)}
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-4">
                    <button>
                      <h3 className="text-sm cursor-pointer flex items-center gap-1">
                        <FaEdit className="w-4" />
                        Edit
                      </h3>
                    </button>
                    <button>
                      <h3 className="text-sm cursor-pointer flex items-center gap-1 text-red-500 hover:text-red-700">
                        <Trash2 className="w-4" />
                        Delete
                      </h3>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {open && (
        <div
          onClick={onBackdropClick}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-xs"
        >
          <div
            ref={modalRef}
            className="bg-neutral-950 z-50 border border-neutral-800 py-4 px-6 w-full max-w-md shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-neutral-200">
                Add Expense
              </h2>
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="text-2xl text-gray-400 hover:text-gray-200"
              >
                <IoMdClose />
              </button>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-neutral-400">Name</label>
                <input
                  type="text"
                  placeholder="eg: cheese pizza DMart"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-neutral-800 bg-neutral-950 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-neutral-400">Amount</label>
                <input
                  type="text"
                  placeholder="eg: 499"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border border-neutral-800 bg-neutral-950 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-neutral-400">pick a Budget</label>
                <select
                  name="budgets"
                  id="budgets"
                  className="bg-neutral-950 border border-neutral-800 text-white px-4 py-2  outline-none focus:ring-2 focus:ring-green-700"
                >
                  {budgets.length === 0 ? (
                    <option className="bg-neutral-900  text-neutral-200">
                      {" "}
                      no budget created yet
                    </option>
                  ) : (
                    budgets.map((budget: any, idx) => (
                      <option
                        key={idx}
                        value={budget?.name}
                        className="bg-neutral-900  text-neutral-200"
                      >
                        {budget?.emoji} {budget?.name} - {budget?.amount}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {errors.name || errors.amount ? (
                <div className="text-red-500 text-sm flex flex-col gap-1 mt-2">
                  {errors.name && <span>{errors.name}</span>}
                  {errors.amount && <span>{errors.amount}</span>}
                </div>
              ) : null}

              <button
                type="submit"
                className="bg-gradient-to-br shadow-xl shadow-green-600/20 from-green-600 via-green-700 to-green-600 mt-2 text-white py-2 hover:bg-green-700 transition"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
