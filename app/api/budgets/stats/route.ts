// app/api/budgets/stats/route.ts

import connectDB from "@/lib/db";
import Budget from "@/models/budgets.model";
import Expense from "@/models/expenses.model";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();

    const budgetsWithStats = await Budget.aggregate([
      {
        $lookup: {
          from: "expenses",
          localField: "_id",
          foreignField: "budgetId",
          as: "expenses",
        },
      },
      {
        $addFields: {
          totalSpent: {
            $sum: {
              $map: {
                input: "$expenses",
                as: "e",
                in: { $toInt: "$$e.amount" },
              },
            },
          },
          totalExpenses: { $size: "$expenses" },
        },
      },
      {
        $project: {
          name: 1,
          amount: 1,
          emoji: 1,
          createdBy: 1, // keep createdBy in result
          totalSpent: 1,
          totalExpenses: 1,
          createdAt:1,
        },
      },
    ]);

    return NextResponse.json({ success: true, data: budgetsWithStats });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
