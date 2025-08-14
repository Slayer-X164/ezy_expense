import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Budget from "@/models/budgets.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
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

    const result = await Budget.aggregate([
      {
        $match: { createdBy: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: null,
          totalSumOfBudgets: { $sum: { $toInt: "$amount" } },
          totalNumberOfBudgets: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          createdBy: 1,
          totalSumOfBudgets: 1,
          totalNumberOfBudgets: 1,
        },
      },
    ]);
    return NextResponse.json({
      success: true,
      message: "Total budget fetched successfully",
      data: result[0] || { totalBudget: 0 },
    });
  } catch (error: any) {
    console.error("Error fetching total budget:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch total budget",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
