"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { GiPayMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

export default function dashboardPage() {
  const { data: session, status } = useSession();
  const [sumBudget, setSumBudget] = useState<number | null>(null);
  const [numOfBudgets, setNumOfBudgets] = useState<number | null>(null);
  const [numOfExpenses, setNumOfExpenses] = useState<number | null>(null);
  const [sumExpense, setSumExpense] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  if (status === "unauthenticated") {
    redirect("/");
  }

  const getSumOfBudgets = async () => {
    const res = await fetch("/api/budgets/sum");
    const data = await res.json();
    if (data.success) {
      setSumBudget(data.data.totalSumOfBudgets);
      setNumOfBudgets(data.data.totalNumberOfBudgets);
      setLoading(false);
      // console.log("Total Budgets:", );
    }
  };
  const getSumOfExpenses = async () => {
    const res = await fetch("/api/expenses/sum");
    const data = await res.json();
    if (data.success) {
      setSumExpense(data.data.totalSumOfExpenses);
      setNumOfExpenses(data.data.totalNumberOfExpenses);
      setLoading(false);
    }
  };
  const fetchData = () => {
    getSumOfBudgets();
    getSumOfExpenses();
  };
  useEffect(() => {
    fetchData();
  }, [status]);

  if (!loading) {
    console.log("total budget:", sumBudget);
    console.log("total Expense:", sumExpense);
    console.log("total number of budgets:", numOfBudgets);
  }

  return (
    <div className=" w-full   flex flex-col gap-4">
      <div className="p-6">
        <h1 className="text-4xl font-bold text-neutral-200">
          Hello, {session?.user?.name} 😃
        </h1>
        <p className="text-sm text-neutral-500 pt-2">
          Here's your expense summary. Let's keep those budgets in check!{" "}
        </p>
      </div>
      <div className="grid grid-cols-1 divide-neutral-800 divide-x-1 border-b-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full border-t-1 border-neutral-800">
        {/*  total budget card*/}
        <div className="p-6 w-[300px] flex items-center justify-between">
          <div>
            <h3 className="text-lg text-neutral-200">total budget</h3>
            <h2 className="text-4xl font-bold">₹{sumBudget}</h2>
          </div>
          <div>
            <Link href="/dashboard/budgets">
              <h3 className="p-2 bg-green-700/25">
                <GrMoney className="text-4xl text-green-700" />
              </h3>
            </Link>
          </div>
        </div>
        {/* total expense card */}
        <div className="p-6 w-[300px] flex items-center justify-between">
          <div>
            <h3 className="text-lg text-neutral-200">total Expenses</h3>
            <h2 className="text-4xl font-bold">₹{sumExpense}</h2>
          </div>
          <div>
            <Link href="/dashboard/budgets">
              <h3 className="p-2 bg-red-700/25">
                <GiPayMoney className="text-4xl text-red-400" />
              </h3>
            </Link>
          </div>
        </div>
        {/* total number of budgets and expense card */}
        <div className="p-6 w-[300px] flex items-center justify-between border-r-1 border-neutral-800">
          <div className="">
            <h3 className="text-lg text-neutral-200">No. of Budgets</h3>
            <h2 className="text-2xl font-bold">{numOfBudgets}</h2>
          </div>
          <div>
            <Link href="/dashboard/budgets">
              <h3 className="p-2 bg-neutral-700/40">
                <MdOutlineAccountBalanceWallet className="text-4xl text-neutral-400" />
              </h3>
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
