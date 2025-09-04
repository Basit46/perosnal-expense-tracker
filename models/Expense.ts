import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExpense extends Document {
  title: string;
  max: number;
  spent: number;
  category: "weekly" | "monthly";
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema: Schema<IExpense> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    max: {
      type: Number,
      required: true,
    },
    spent: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["weekly", "monthly"],
      required: true,
    },
  },
  { timestamps: true }
);

const Expense: Model<IExpense> =
  mongoose.models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);

export default Expense;
