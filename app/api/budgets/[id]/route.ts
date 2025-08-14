import connectDB from "@/lib/db";
import Budget from "@/models/budgets.model";
import Expense from "@/models/expenses.model";
import { NextRequest, NextResponse } from "next/server";

// Define params as a Promise
type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, context: { params: Params }) {
  const { id } = await context.params; // Await the params

  try {
    await connectDB();
    console.log("id:", id);

    const budget = await Budget.findById(id);
    if (!budget) {
      return NextResponse.json(
        { success: false, status: 500 },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, budget });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Error fetching budget by ID:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: { params: Params }) {
  const { id } = await context.params; // Await the params

  try {
    await connectDB();
    console.log("id:", id);

    const budget = await Budget.findByIdAndDelete(id);
    await Expense.deleteMany({ budgetId: id });

    if (!budget) {
      return NextResponse.json(
        { success: false, status: 500 },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Budget deleted successfully" },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Error deleting budget by ID:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
