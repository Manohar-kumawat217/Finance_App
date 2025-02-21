import { validationResult } from "express-validator";
import {
  createExpense,
  singleExpense,
  allExpenses,
  deleteExpense,
  updateExpense,
} from "../services/expense.service.js";
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
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Expenses
export const getExpenses = async (req, res) => {
  try {
    const userId = req.user._id; //Authenticated user
    // Extract query parameters for filtering, sorting, and pagination
    const {
      category,
      startDate,
      endDate,
      sort,
      page = 1,
      limit = 10,
    } = req.query;
    const expenses = await allExpenses({
      userId,
      category,
      startDate,
      endDate,
      sort,
      page,
      limit,
    });
    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
//Get single expense
export const getExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = req.user._id;

    const expense = await singleExpense({ expenseId, userId });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    } else {
      return res.status(200).json(expense);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const editExpense = async (req, res) => {
  try {
    //check for errors in request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const expenseId = req.params.id; //Expense id from URL
    const userId = req.user._id; // user id from JWT token
    const { title, amount, category, date } = req.body;
    console.log(expenseId, userId);
    console.log(userId);
    const editedExpense = await updateExpense({
      title,
      amount,
      category,
      date,
      userId,
      expenseId,
    });
    res
      .status(200)
      .json({ message: "Expense updated successfully", editedExpense });
  } catch (error) {
    console.log("Error while editing the expense", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Delete Expenses
export const removeExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const expenseId = req.params.id;
    const deletedExpense = await deleteExpense({ expenseId, userId });
    res
      .status(200)
      .json({ message: "Expense deleted successfully", deletedExpense });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
