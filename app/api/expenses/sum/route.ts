import connectDB from "@/lib/db";
import Expense from "@/models/expenses.model";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await connectDB()
        const result = await Expense.aggregate([
            {
                $group: {
                    _id: null,
                    totalSumOfExpenses: { $sum: { $toInt: "$amount" } },
                    totalNumberOfExpenses: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalSumOfExpenses: 1,
                    totalNumberOfExpenses: 1,
                },
            }
        ])
        return NextResponse.json({
            success: true,
            message: "Total expenses fetched successfully",
            data: result[0] || { totalExpenses: 0 },
        });
    } catch (error:any) {
        console.error("Error fetching total expenses:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch total expenses",
                error: error.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}