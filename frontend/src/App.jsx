import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import AssetReport from "./components/AssetReport";
import CreateTransaction from "./components/CreateTransaction";
import AccountsTable from "./components/AccountsTable";
import CreateAccount from "./components/CreateAccount";
import BalanceSheet from "./components/reports/BalanceSheet";
import IncomeStatement from "./components/reports/IncomeStatement";
import "./index.css";

function App() {
  const [activeView, setActiveView] = useState("assets");

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar setActiveView={setActiveView} />
      <main className="flex-1 p-8 overflow-y-auto">
        {activeView === "assets" && <AssetReport />}
        {activeView === "createTransaction" && <CreateTransaction />}
        {activeView === "allAccounts" && <AccountsTable />}
        {activeView === "createAccount" && <CreateAccount />}
        {activeView === "balanceSheet" && <BalanceSheet />}
        {activeView === "incomeStatement" && <IncomeStatement />}
      </main>
    </div>
  );
}

export default App;
