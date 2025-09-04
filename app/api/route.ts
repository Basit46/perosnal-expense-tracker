import { NextRequest, NextResponse } from "next/server";
import Expense from "@/models/Expense";
import { connectDB } from "@/utils/mongodb";

// GET all expenses
export async function GET(req: NextRequest) {
  await connectDB();
  const expenses = await Expense.find().sort({ createdAt: -1 });
  return NextResponse.json(expenses);
}

// POST a new expense
export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { title, max, spent, category } = await req.json();
    const expense = await Expense.create({ title, max, spent, category });
    return NextResponse.json(expense, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
