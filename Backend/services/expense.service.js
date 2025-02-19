import expenseModel from "../models/expense.model.js";

export const createExpense = async ({
  userId,
  title,
  amount,
  category,
  date,
}) => {
  if (!userId || !title || !amount || !category) {
    throw new Error("All fields are required");
  }

  const expense = await expenseModel.create({
    userId,
    title,
    amount,
    category,
    date,
  });

  return expense;
};

export const allExpenses = async ({ userId }) => {
  if (!userId) {
    throw new Error("User id is required");
  }
  const expenses = await expenseModel
    .find({ userId: userId })
    .sort({ date: -1 });

  return expenses;
};
