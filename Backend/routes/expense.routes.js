import express from "express";
import { addExpense, getExpenses } from "../controllers/expense.controller.js";
import { body } from "express-validator";
import protectRoute from "../middlewares/user.middleware.js";

const router = express.Router();

router.post(
  "/expense",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("amount").notEmpty().withMessage("Amount is required"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  protectRoute,
  addExpense
);
router.get("/expense", protectRoute, getExpenses);
export default router;
