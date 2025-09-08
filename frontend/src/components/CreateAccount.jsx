import React, { useState } from "react";
import { createAccount } from "../api/accountsApi";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    accountName: "",
    accountNumber: "",
    accountType: "ASSET",
    normalBalance: "DEBIT",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await createAccount({
        ...formData,
        accountNumber: parseInt(formData.accountNumber),
      });
      setSuccess("Account created successfully!");

      setFormData({
        accountName: "",
        accountNumber: "",
        accountType: "ASSET",
        normalBalance: "DEBIT",
        description: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📝 Create New Account
      </h2>
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="accountName"
            >
              Account Name
            </label>
            <input
              type="text"
              name="accountName"
              id="accountName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.accountName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="accountNumber"
            >
              Account Number
            </label>
            <input
              type="number"
              name="accountNumber"
              id="accountNumber"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.accountNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="accountType"
            >
              Account Type
            </label>
            <select
              name="accountType"
              id="accountType"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.accountType}
              onChange={handleChange}
            >
              <option value="ASSET">ASSET</option>
              <option value="LIABILITY">LIABILITY</option>
              <option value="EQUITY">EQUITY</option>
              <option value="REVENUE">REVENUE</option>
              <option value="EXPENSE">EXPENSE</option>
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="normalBalance"
            >
              Normal Balance
            </label>
            <select
              name="normalBalance"
              id="normalBalance"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.normalBalance}
              onChange={handleChange}
            >
              <option value="DEBIT">DEBIT</option>
              <option value="CREDIT">CREDIT</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="description"
          >
            Description (Optional)
          </label>
          <textarea
            name="description"
            id="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
