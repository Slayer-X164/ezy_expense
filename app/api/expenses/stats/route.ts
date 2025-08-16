import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Expense from "@/models/expenses.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

   const session = await auth();
      const userId = session?.user?.id;

      if (!userId) {
        return NextResponse.json(
          {
            success: false,
            message: "User not authenticated",
          },
          { status: 401 }
        );
      }

    const results = await Expense.aggregate([
      {
       $match: { createdBy: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalExpense: { $sum: { $toInt: "$amount" } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const formatted = results.map((item) => ({
      date: item._id,
      expense: item.totalExpense,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
  }
}
