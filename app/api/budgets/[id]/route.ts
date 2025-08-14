import connectDB from "@/lib/db";
import Budget from "@/models/budgets.model";
import Expense from "@/models/expenses.model";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

export async function GET(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    await connectDB();
    const { id } = context.params;

    const budget = await Budget.findById(id);
    if (!budget) {
      return NextResponse.json({ success: false, status: 500 });
    }

    return NextResponse.json({ success: true, budget });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error while fetching budget by ID:", message);
    return NextResponse.json({ success: false, error: message });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    await connectDB();
    const { id } = context.params;

    const budget = await Budget.findByIdAndDelete(id);
    await Expense.deleteMany({ budgetId: id });

    if (!budget) {
      return NextResponse.json({ success: false, status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Budget deleted successfully",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error while deleting budget by ID:", message);
    return NextResponse.json({ success: false, error: message });
  }
}
