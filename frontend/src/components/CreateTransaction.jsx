import React, { useState, useEffect } from "react";
import { getAccounts, createTransaction } from "../api/accountsApi";

const CreateTransaction = () => {
  const [description, setDescription] = useState("");
  const [entries, setEntries] = useState([
    { accountId: "", debit: 0, credit: 0 },
  ]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccounts();
        setAccounts(data);
      } catch (err) {
        setError("Failed to load accounts. Please try again.");
      }
    };
    fetchAccounts();
  }, []);

  const handleEntryChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { accountId: "", debit: 0, credit: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const totalDebits = entries.reduce(
      (sum, entry) => sum + parseFloat(entry.debit || 0),
      0
    );
    const totalCredits = entries.reduce(
      (sum, entry) => sum + parseFloat(entry.credit || 0),
      0
    );
    if (Math.abs(totalDebits - totalCredits) > 0.001) {
      setError("Transaction is out of balance. Debits must equal credits.");
      setLoading(false);
      return;
    }

    try {
      await createTransaction({ description, entries });
      alert("Transaction created successfully!");
      setDescription("");
      setEntries([{ accountId: "", debit: 0, credit: 0 }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Transaction
      </h2>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Journal Entries
        </h3>
        {entries.map((entry, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:space-x-4 mb-4 items-center"
          >
            <select
              className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
              value={entry.accountId}
              onChange={(e) =>
                handleEntryChange(index, "accountId", e.target.value)
              }
              required
            >
              <option value="">Select Account</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.accountName}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Debit"
              className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
              value={entry.debit}
              onChange={(e) =>
                handleEntryChange(index, "debit", parseFloat(e.target.value))
              }
            />
            <input
              type="number"
              placeholder="Credit"
              className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={entry.credit}
              onChange={(e) =>
                handleEntryChange(index, "credit", parseFloat(e.target.value))
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addEntry}
          className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 mb-6 focus:outline-none"
        >
          + Add another entry
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Transaction"}
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;
