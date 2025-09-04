import { NextResponse } from "next/server";
import Expense from "@/models/Expense";
import { connectDB } from "@/utils/mongodb";

interface Params {
  params: { id: string };
}

// GET one expense by ID
export async function GET(req: Request, { params }: Params) {
  await connectDB();
  try {
    const expense = await Expense.findById(params.id);
    if (!expense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }
    return NextResponse.json(expense);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// UPDATE expense by ID
export async function PUT(req: Request, { params }: Params) {
  await connectDB();
  try {
    const { title, max, spent, category } = await req.json();

    const expense = await Expense.findById(params.id);
    if (!expense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    // Update fields only if they exist in request
    if (title !== undefined) expense.title = title;
    if (max !== undefined) expense.max = max;
    if (spent !== undefined) expense.spent = spent;
    if (category !== undefined) expense.category = category;

    await expense.save();

    return NextResponse.json(expense);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE expense by ID
export async function DELETE(req: Request, { params }: Params) {
  await connectDB();
  try {
    const deletedExpense = await Expense.findByIdAndDelete(params.id);
    if (!deletedExpense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Expense deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
