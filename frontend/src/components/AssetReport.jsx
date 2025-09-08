import React, { useState, useEffect } from "react";
import { getAccounts, getAccountBalance } from "../api/accountsApi";

const AssetReport = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const allAccounts = await getAccounts();
        const assetAccounts = allAccounts.filter(
          (acc) => acc.accountType === "ASSET"
        );

        const assetsWithBalances = await Promise.all(
          assetAccounts.map(async (account) => {
            const { balance } = await getAccountBalance(account.id);
            return { ...account, balance };
          })
        );

        setAssets(assetsWithBalances);
      } catch (err) {
        setError("Failed to fetch asset data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssetData();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading assets report...
      </div>
    );
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  const totalAssets = assets.reduce((sum, asset) => sum + asset.balance, 0);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        📊 Total Assets Report
      </h2>
      <div className="mb-6 p-4 bg-blue-100 rounded-lg text-blue-800 font-semibold text-center">
        Total Assets: ${totalAssets.toFixed(2)}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Account Name</th>
              <th className="py-3 px-6 text-left">Account Number</th>
              <th className="py-3 px-6 text-right">Balance</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {assets.map((asset) => (
              <tr
                key={asset.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {asset.accountName}
                </td>
                <td className="py-3 px-6 text-left">{asset.accountNumber}</td>
                <td className="py-3 px-6 text-right font-medium">
                  ${asset.balance.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetReport;
