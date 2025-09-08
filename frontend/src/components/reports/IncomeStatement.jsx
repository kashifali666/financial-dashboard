import React, { useState, useEffect } from "react";
import { fetchIncomeStatement } from "../../api/reportsApi";

const IncomeStatement = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReport = async () => {
      try {
        const data = await fetchIncomeStatement();
        setReportData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getReport();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading Income Statement...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  const {
    totalRevenue,
    totalExpenses,
    netIncome,
    revenueAccounts,
    expenseAccounts,
  } = reportData;

  const renderAccountTable = (accounts, title) => (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-700 mb-4">{title}</h3>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Account Name</th>
            <th className="py-3 px-6 text-right">Balance</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {accounts.map((account) => (
            <tr
              key={account.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {account.accountName}
              </td>
              <td className="py-3 px-6 text-right">
                {account.balance !== undefined
                  ? `$${account.balance.toFixed(2)}`
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📈 Income Statement
      </h2>
      <div className="mb-6 p-4 bg-green-100 rounded-lg text-green-800 font-bold text-center">
        Total Revenue: ${totalRevenue.toFixed(2)}
      </div>
      {renderAccountTable(revenueAccounts, "Revenue Accounts")}
      <div className="mb-6 p-4 bg-red-100 rounded-lg text-red-800 font-bold text-center">
        Total Expenses: ${totalExpenses.toFixed(2)}
      </div>
      {renderAccountTable(expenseAccounts, "Expense Accounts")}
      <div className="p-4 bg-blue-100 rounded-lg text-blue-800 font-bold text-center">
        Net Income: ${netIncome.toFixed(2)}
      </div>
    </div>
  );
};

export default IncomeStatement;
