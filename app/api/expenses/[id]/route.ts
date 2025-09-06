import { NextRequest, NextResponse } from "next/server";

import Expense from "@/models/Expense";
import { connectDB } from "@/utils/mongodb";

// GET a single expense
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = await params;
  const expense = await Expense.findById(id);

  if (!expense) {
    return NextResponse.json({ error: "Expense not found" }, { status: 404 });
  }

  return NextResponse.json(expense);
}

// PUT update expense
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = await params;
  try {
    const { title, max, spent, category } = await req.json();
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { title, max, spent, category },
      { new: true, runValidators: true }
    );
    if (!updatedExpense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }
    return NextResponse.json(updatedExpense);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}

// DELETE an expense
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = await params;
  try {
    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Expense deleted successfully" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
