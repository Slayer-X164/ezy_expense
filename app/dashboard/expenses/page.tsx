'use client'
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import ExpensesTable from "./components/ExpensesTable";
import { useState } from "react";
export default function ExpensesPage() {
   const [open, setOpen] = useState(false);
  return (
    <div className="p-6 w-full">
      <div className="w-full gap-4 lg:gap-0 mb-8 flex-col lg:flex-row flex justify-between items-start lg:items-center">
        <h3 className="text-3xl font-bold text-neutral-200 pt-6 lg:pt-0">My Expenses</h3>

        <div className="flex items-center gap-3 text-sm">
          <button onClick={()=>setOpen(!open)} className="p-2 bg-red-950 border-1 border-red-300 cursor-pointer text-red-200">
            Create New Expense
          </button>
          <button className="p-2 text-neutral-300  cursor-pointer flex items-center gap-1">
            sort by budget <FaChevronDown />
          </button>
        </div>
      </div>
      {/* table */}
     <ExpensesTable open={open} setOpen={setOpen}/>
    </div>
  );
}
