import express from "express";
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getSummary
} from "../controllers/expensesController.js";

const router = express.Router();

router.post("/", addExpense);
router.get("/", getExpenses);
router.get("/summary", getSummary);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;