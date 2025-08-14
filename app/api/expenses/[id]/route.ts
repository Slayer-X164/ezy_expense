import connectDB from "@/lib/db";
import Expense from "@/models/expenses.model";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function DELETE(req: NextRequest, context: { params: Params }) {
  const { id } = await context.params;
  try {
    await connectDB();

    console.log("params", id);

    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return NextResponse.json({
        success: false,
        message: "Expense not found",
        status: 404,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Expense deleted successfully",
      status: 200,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error while deleting expense", message);
    return NextResponse.json({
      success: false,
      message: "Error while deleting expense",
      status: 500,
    });
  }
}
