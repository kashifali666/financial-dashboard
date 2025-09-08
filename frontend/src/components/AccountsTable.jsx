import React, { useState, useEffect } from "react";
import { getAccounts } from "../api/accountsApi";

const AccountsTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccounts();
        setAccounts(data);
      } catch (err) {
        setError("Failed to fetch accounts. Please check the API server.");
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-500">Loading accounts...</div>
    );
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 All Accounts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Account Name</th>
              <th className="py-3 px-6 text-left">Account Number</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Normal Balance</th>
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
                <td className="py-3 px-6 text-left">{account.accountNumber}</td>
                <td className="py-3 px-6 text-left">{account.accountType}</td>
                <td className="py-3 px-6 text-left">{account.normalBalance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountsTable;
