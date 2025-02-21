import express from "express";
import {
  addExpense,
  getExpense,
  editExpense,
  getExpenses,
  removeExpense,
} from "../controllers/expense.controller.js";
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
router.get("/expense/:id", protectRoute, getExpense);
router.put(
  "/expense/:id",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("amount").notEmpty().withMessage("Amount is required"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  protectRoute,
  editExpense
);
router.delete("/expense/:id", protectRoute, removeExpense);

export default router;
