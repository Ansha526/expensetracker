import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Charts from "./components/Charts";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("expenseTracker");

    if (saved) {
      return JSON.parse(saved);
    }

    return [
      {
        id: 1,
        title: "Monthly Salary",
        amount: 60000,
        type: "income",
        category: "Salary",
        date: "2026-09-01",
      },
      {
        id: 2,
        title: "Grocery Shopping",
        amount: 8500,
        type: "expense",
        category: "Food",
        date: "2026-09-04",
      },
      {
        id: 3,
        title: "Internet Bill",
        amount: 3000,
        type: "expense",
        category: "Bills",
        date: "2026-09-06",
      },
      {
        id: 4,
        title: "Freelance Project",
        amount: 12000,
        type: "income",
        category: "Freelance",
        date: "2026-09-08",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(
      "expenseTracker",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [
      {
        ...newTransaction,
        id: Date.now(),
      },
      ...prev,
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const editTransaction = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === updatedTransaction.id
          ? updatedTransaction
          : item
      )
    );
  };

  const totals = useMemo(() => {
    const income = transactions
      .filter((item) => item.type === "income")
      .reduce(
        (total, item) => total + Number(item.amount),
        0
      );

    const expense = transactions
      .filter((item) => item.type === "expense")
      .reduce(
        (total, item) => total + Number(item.amount),
        0
      );

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [transactions]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Welcome */}
        <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-sm font-bold tracking-widest text-indigo-600">
              PERSONAL FINANCE
            </p>

            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Expense Tracker
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your income and expenses easily.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <p className="text-xs text-slate-400">
              Today
            </p>

            <p className="font-semibold text-slate-800">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </section>

        {/* Summary */}
        <SummaryCards totals={totals} />

        {/* Form + Transactions */}
        <section className="mt-6 grid gap-6 lg:grid-cols-5">

          <div className="lg:col-span-2">
            <TransactionForm
              onAdd={addTransaction}
            />
          </div>

          <div className="lg:col-span-3">
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
              onEdit={editTransaction}
            />
          </div>

        </section>

        {/* Charts */}
        <Charts transactions={transactions} />

      </main>
    </div>
  );
}

export default App;