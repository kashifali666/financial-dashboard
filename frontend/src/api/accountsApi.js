const API_URL = "/api";

export const createAccount = async (data) => {
  const response = await fetch(`${API_URL}/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error);
  }
  return result;
};

export const getAccounts = async () => {
  const response = await fetch(`${API_URL}/accounts`);
  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }
  return response.json();
};

export const createTransaction = async (data) => {
  const response = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error);
  }
  return result;
};

export const getAccountBalance = async (id) => {
  const response = await fetch(`${API_URL}/accounts/${id}/balance`);
  if (!response.ok) {
    throw new Error("Account not found");
  }
  return response.json();
};
