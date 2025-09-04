import { NextResponse } from "next/server";
import Expense from "@/models/Expense";
import { connectDB } from "@/utils/mongodb";

export async function GET() {
  await connectDB();

  const all = await Expense.find().sort({
    createdAt: -1,
  });
  const weekly = await Expense.find({ category: "weekly" }).sort({
    createdAt: -1,
  });
  const monthly = await Expense.find({ category: "monthly" }).sort({
    createdAt: -1,
  });

  return NextResponse.json({ all, weekly, monthly });
}

// POST a new expense
export async function POST(req: Request) {
  await connectDB();
  try {
    const { title, max, spent, category } = await req.json();

    const expense = new Expense({
      title,
      max,
      spent,
      category,
    });

    await expense.save();

    return NextResponse.json(expense, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
