import connectDB from "@/lib/db";
import Expense from "@/models/expenses.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, amount, budgetId, createdBy } = await req.json();

    const expenseAlreadyExists = await Expense.findOne({ name });
    if (expenseAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: "expense already exists",
        status: 409,
      });
    }
    const newExpense = new Expense({ name, amount, budgetId, createdBy });
    await newExpense.save();
    return NextResponse.json({
      success: true,
      message: "new expense created",
      status: 200,
    });
  } catch (error: any) {
    console.log("error while creating expense ", error.message);

    return NextResponse.json({
      success: false,
      message: "error while creating new expense",
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectDB();
    const allExpense = await Expense.find().populate('createdBy');
    if (!allExpense) {
      return NextResponse.json({
        success: false,
        message: "error while fetching expenses",
        status: 500,
      });
    }
    return NextResponse.json({
      success: true,
      status: 200,
      allExpense
    });
  } catch (error: any) {
    console.log("error while fetching expenses", error.message);
  }
}
