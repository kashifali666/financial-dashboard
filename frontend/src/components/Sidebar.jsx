import React from "react";

const Sidebar = ({ setActiveView }) => {
  const navItems = [
    {
      title: "Accounting Tools",
      items: [
        { name: "🆕 Create Account", view: "createAccount" },
        { name: "📝 New Transaction", view: "createTransaction" },
        { name: "📈 All Accounts", view: "allAccounts" },
      ],
    },
    {
      title: "Financial Reports",
      items: [
        { name: "📊 Asset Report", view: "assets" },
        { name: "📋 Balance Sheet", view: "balanceSheet" },
        { name: "📈 Income Statement", view: "incomeStatement" },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 space-y-6 shadow-lg">
      <div className="text-2xl font-bold text-center mb-6">FinDash</div>
      <nav className="space-y-4">
        {navItems.map((group, index) => (
          <div key={index}>
            <h3 className="text-gray-400 uppercase text-xs font-semibold mb-2 ml-4">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.view}>
                  <button
                    onClick={() => setActiveView(item.view)}
                    className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
