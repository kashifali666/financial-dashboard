import express from "express";
import {
  createTransaction,
  getAccounts,
  getAccountBalance,
  createAccount,
  generateBalanceSheet,
  generateIncomeStatement,
} from "../controllers/accountsController.js";

const router = express.Router();

// Create a new account
router.post("/accounts", createAccount);

// Get all accounts
router.get("/accounts", getAccounts);

// Get the balance of a specific account
router.get("/accounts/:id/balance", getAccountBalance);

// Create a new transaction
router.post("/transactions", createTransaction);

// Get balance sheet report
router.get("/reports/balance-sheet", generateBalanceSheet);

// Get income statement report
router.get("/reports/income-statement", generateIncomeStatement);

export default router;
