import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: "true",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be grater then zero"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Food", "Transport", "Entertainment", "Shopping", "Others"],
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Expense", expenseSchema);
