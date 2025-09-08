const API_URL = "/api";

export const fetchBalanceSheet = async () => {
  const response = await fetch(`${API_URL}/reports/balance-sheet`);
  if (!response.ok) {
    throw new Error("Failed to fetch balance sheet data.");
  }
  return response.json();
};

export const fetchIncomeStatement = async () => {
  const response = await fetch(`${API_URL}/reports/income-statement`);
  if (!response.ok) {
    throw new Error("Failed to fetch income statement data.");
  }
  return response.json();
};
