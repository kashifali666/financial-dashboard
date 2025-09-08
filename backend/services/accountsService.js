import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTransactionService = async (description, entries) => {
  try {
    const totalDebits = entries.reduce(
      (sum, entry) => sum + (entry.debit || 0),
      0
    );
    const totalCredits = entries.reduce(
      (sum, entry) => sum + (entry.credit || 0),
      0
    );

    if (totalDebits !== totalCredits) {
      throw new Error(
        "Transaction is out of balance. Debits must equal credits."
      );
    }

    const transaction = await prisma.$transaction(async (prismaTransaction) => {
      const newTransaction = await prismaTransaction.transaction.create({
        data: {
          description: description,
          journalEntries: {
            createMany: {
              data: entries,
            },
          },
        },
        include: {
          journalEntries: true,
        },
      });
      return newTransaction;
    });

    return transaction;
  } catch (error) {
    throw new Error(`Failed to create transaction: ${error.message}`);
  }
};

export const getAccountsService = async () => {
  return await prisma.account.findMany();
};

export const getAccountsByTypeService = async (accountType) => {
  return await prisma.account.findMany({
    where: { accountType: accountType },
    include: { journalEntries: true },
  });
};

export const getAccountBalanceService = async (accountId) => {
  const account = await prisma.account.findUnique({
    where: { id: accountId },
  });
  if (!account) {
    throw new Error("Account not found");
  }

  const journalEntries = await prisma.journalEntry.findMany({
    where: { accountId: accountId },
  });

  if (journalEntries.length === 0) {
    return { account, balance: 0 };
  }

  const totalDebits = journalEntries.reduce(
    (sum, entry) => sum + entry.debit.toNumber(),
    0
  );
  const totalCredits = journalEntries.reduce(
    (sum, entry) => sum + entry.credit.toNumber(),
    0
  );

  let balance;
  if (account.normalBalance === "DEBIT") {
    balance = totalDebits - totalCredits;
  } else {
    balance = totalCredits - totalDebits;
  }

  return { account, balance };
};

export const createAccountService = async (data) => {
  return await prisma.account.create({
    data,
  });
};
