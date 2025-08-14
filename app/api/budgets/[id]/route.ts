import connectDB from "@/lib/db";
import Budget from "@/models/budgets.model";
import Expense from "@/models/expenses.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = context.params.id;
    console.log(id);

    const budget = await Budget.findById(id);
    if (!budget) {
      return NextResponse.json({ success: false, status: 500 });
    }

    return NextResponse.json({ success: true, budget });
  } catch (error: any) {
    console.error("Error while fetching budget by ID:", error.message);
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();
    const id = context.params.id;

    const budget = await Budget.findByIdAndDelete(id);
    await Expense.deleteMany({ budgetId: id });

    if (!budget) {
      return NextResponse.json({ success: false, status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Budget deleted successfully",
    });
  } catch (error: any) {
    console.error("Error while deleting budget by ID:", error.message);
    return NextResponse.json({ success: false, error: error.message });
  }
}
