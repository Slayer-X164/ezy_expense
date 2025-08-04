import connectDB from "@/lib/db";
import Budget from "@/models/budgets.model";
import Expense from "@/models/expenses.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    connectDB();

    const allBudgets = await Budget.find()
      .sort({ createdAt: -1 })
      .populate("createdBy");

    if (!allBudgets) {
      return NextResponse.json({
        success: false,
        message: "no budget found",
        status: 509,
      });
    }
    return NextResponse.json({
      success: true,
      status: 200,
      budgets: allBudgets,
    });
  } catch (error) {
    console.log("error while fetching budgets");
  }
}
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { emoji, name, amount, createdBy } = await req.json();

   
    await Budget.create({ emoji, name, amount, createdBy });
    return NextResponse.json({
      success: true,
      message: "Budget Created",
    });
  } catch (error: any) {
    console.log("error while creating budget", error.message);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
      status: 500,
    });
  }
}
