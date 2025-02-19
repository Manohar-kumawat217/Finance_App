import { validationResult } from "express-validator";
import { createExpense, allExpenses } from "../services/expense.service.js";
//Add Expense
export const addExpense = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //extract data from request body
    const { title, amount, category, date } = req.body;

    const expense = await createExpense({
      userId: req.user._id, //Authenticated user
      title,
      amount,
      category,
      date,
    });

    return res
      .status(201)
      .json({ message: "Expense added successfully", expense });
  } catch (error) {
    console.log("Error------> ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Expenses
export const getExpenses = async (req, res) => {
  try {
    const userId = req.user._id; //Authenticated user
    const expenses = await allExpenses({ userId });
    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
