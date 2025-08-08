import connectDB from "@/lib/db";
import Expense from "@/models/expenses.model";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    console.log("params", params.id);

    const expense = await Expense.findByIdAndDelete(params.id);
    if (!expense) {
      return NextResponse.json({
        success: false,
        message: "expense not found",
        status: 404,
      });
    }

    return NextResponse.json({
      success: true,
      message: "expense deleted successfully",
      status: 200,
    });
  } catch (error: any) {
    console.log("error while deleting expense", error.message);
    return NextResponse.json({
      success: false,
      message: "error while deleting expense",
      status: 500,
    });
  }
}
