import { PrismaClient } from "@prisma/client";
import { getAccountBalanceService } from "./accountsService.js";

const prisma = new PrismaClient();

export const generateIncomeStatementService = async () => {
  const revenueAccounts = await prisma.account.findMany({
    where: { accountType: "REVENUE" },
  });
  const expenseAccounts = await prisma.account.findMany({
    where: { accountType: "EXPENSE" },
  });

  const revenueBalances = await Promise.all(
    revenueAccounts.map((r) => getAccountBalanceService(r.id))
  );
  const expenseBalances = await Promise.all(
    expenseAccounts.map((e) => getAccountBalanceService(e.id))
  );

  const totalRevenue = revenueBalances.reduce(
    (sum, bal) => sum + bal.balance,
    0
  );
  const totalExpenses = expenseBalances.reduce(
    (sum, bal) => sum + bal.balance,
    0
  );

  const netIncome = totalRevenue - totalExpenses;

  const revenueAccountsWithBalance = revenueAccounts.map((account) => ({
    ...account,
    balance:
      revenueBalances.find((bal) => bal.account.id === account.id)?.balance ||
      0,
  }));
  const expenseAccountsWithBalance = expenseAccounts.map((account) => ({
    ...account,
    balance:
      expenseBalances.find((bal) => bal.account.id === account.id)?.balance ||
      0,
  }));

  return {
    totalRevenue,
    totalExpenses,
    netIncome,
    revenueAccounts: revenueAccountsWithBalance,
    expenseAccounts: expenseAccountsWithBalance,
  };
};

export const generateBalanceSheetService = async () => {
  const assets = await prisma.account.findMany({
    where: { accountType: "ASSET" },
  });
  const liabilities = await prisma.account.findMany({
    where: { accountType: "LIABILITY" },
  });
  const equity = await prisma.account.findMany({
    where: { accountType: "EQUITY" },
  });

  const assetBalances = await Promise.all(
    assets.map((a) => getAccountBalanceService(a.id))
  );
  const liabilityBalances = await Promise.all(
    liabilities.map((l) => getAccountBalanceService(l.id))
  );
  const equityBalances = await Promise.all(
    equity.map((e) => getAccountBalanceService(e.id))
  );

  const totalAssets = assetBalances.reduce((sum, bal) => sum + bal.balance, 0);
  const totalLiabilities = liabilityBalances.reduce(
    (sum, bal) => sum + bal.balance,
    0
  );
  const totalEquityInitial = equityBalances.reduce(
    (sum, bal) => sum + bal.balance,
    0
  );

  const { netIncome } = await generateIncomeStatementService();

  const totalEquity = totalEquityInitial + netIncome;

  const assetsWithBalance = assets.map((account) => ({
    ...account,
    balance:
      assetBalances.find((bal) => bal.account.id === account.id)?.balance || 0,
  }));
  const liabilitiesWithBalance = liabilities.map((account) => ({
    ...account,
    balance:
      liabilityBalances.find((bal) => bal.account.id === account.id)?.balance ||
      0,
  }));
  const equityWithBalance = equity.map((account) => ({
    ...account,
    balance:
      equityBalances.find((bal) => bal.account.id === account.id)?.balance || 0,
  }));

  return {
    totalAssets,
    totalLiabilities,
    totalEquity,
    assets: assetsWithBalance,
    liabilities: liabilitiesWithBalance,
    equity: equityWithBalance,
  };
};
