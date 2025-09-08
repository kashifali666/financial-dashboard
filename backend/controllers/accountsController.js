import {
  createTransactionService,
  getAccountBalanceService,
  getAccountsService,
  createAccountService,
} from "../services/accountsService.js";
import {
  generateBalanceSheetService,
  generateIncomeStatementService,
} from "../services/reportService.js";

export const createTransaction = async (req, res) => {
  try {
    const { description, entries } = req.body;
    const transaction = await createTransactionService(description, entries);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAccounts = async (req, res) => {
  try {
    const accounts = await getAccountsService();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch accounts." });
  }
};

export const getAccountBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const accountBalance = await getAccountBalanceService(id);
    res.status(200).json(accountBalance);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createAccount = async (req, res) => {
  try {
    const newAccount = await createAccountService(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(400).json({
      error:
        "Failed to create account. Account name or number may already exist.",
    });
  }
};

export const generateBalanceSheet = async (req, res) => {
  try {
    const reportData = await generateBalanceSheetService();
    res.status(200).json(reportData);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate balance sheet." });
  }
};

export const generateIncomeStatement = async (req, res) => {
  try {
    const reportData = await generateIncomeStatementService();
    res.status(200).json(reportData);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate income statement." });
  }
};
