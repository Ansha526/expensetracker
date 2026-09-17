import { useState } from "react";

function TransactionList({
  transactions,
  onDelete,
  onEdit,
}) {
  const [editingId, setEditingId] = useState(null);

  const icons = {
    Food: "🍔",
    Bills: "🧾",
    Shopping: "🛍️",
    Transport: "🚗",
    Health: "❤️",
    Entertainment: "🎬",
    Salary: "💼",
    Freelance: "💻",
    Other: "📌",
  };

  const handleEdit = (transaction) => {
    const newTitle = prompt(
      "Enter new transaction name:",
      transaction.title
    );

    if (newTitle && newTitle.trim()) {
      onEdit({
        ...transaction,
        title: newTitle,
      });
    }

    setEditingId(null);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-4 flex items-center justify-between">

        <div>
          <p className="text-xs font-bold tracking-widest text-indigo-600">
            ACTIVITY
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Recent Transactions
          </h2>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          {transactions.length} items
        </span>

      </div>

      <div className="max-h-[470px] overflow-y-auto">

        {transactions.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            No transactions available.
          </div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="group flex items-center gap-3 border-b border-slate-100 py-4 last:border-0"
            >

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                {icons[transaction.category] || "📌"}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {transaction.title}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {transaction.category} • {transaction.date}
                </p>
              </div>

              <div
                className={`text-right text-sm font-bold ${
                  transaction.type === "income"
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                {transaction.type === "income"
                  ? "+"
                  : "-"}
                Rs.{" "}
                {Number(
                  transaction.amount
                ).toLocaleString()}
              </div>

              <div className="flex gap-1">

                <button
                  onClick={() =>
                    handleEdit(transaction)
                  }
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                  title="Edit"
                >
                  ✎
                </button>

                <button
                  onClick={() =>
                    onDelete(transaction.id)
                  }
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  title="Delete"
                >
                  ×
                </button>

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default TransactionList;