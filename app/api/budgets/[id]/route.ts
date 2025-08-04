import connectDB from "@/lib/db";
import Budget from "@/models/budgets.model";
import { NextResponse } from "next/server";
import React from "react";

export async function GET(req: Request, {params}: { params: { id: string } }) {

  try {
    await connectDB();
    const id = params.id
    console.log(id);

    const budget = await Budget.findById(id);
    if (!budget) {
      return NextResponse.json({
        success: false,
        status: 500,
      });
    }
    return NextResponse.json({
      success: true,
      budget,
    });
  } catch (error: any) {
    console.log("error while fetching budget by ID", error.message);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
