import connectDB from "@/lib/db";
import Budget from "@/models/budgets.model";
import { NextResponse } from "next/server";

export default async function GET() {
  try {
    connectDB();
    const allBudgets = await Budget.find();
    if (!allBudgets) {
      NextResponse.json({
        success: false,
        message: "no budget found",
        status: 509,
      });
    }
    NextResponse.json({
      success: true,
      status: 200,
      budgets: allBudgets,
    });
  } catch (error) {}
}
