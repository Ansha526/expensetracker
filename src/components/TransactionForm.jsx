import { useState } from "react";

function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  const categories = [
    "Food",
    "Bills",
    "Shopping",
    "Transport",
    "Health",
    "Entertainment",
    "Salary",
    "Freelance",
    "Other",
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.amount) {
      alert("Please enter transaction name and amount.");
      return;
    }

    onAdd({
      ...form,
      amount: Number(form.amount),
    });

    setForm({
      title: "",
      amount: "",
      type: "expense",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <p className="text-xs font-bold tracking-widest text-indigo-600">
            TRANSACTION
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Add Transaction
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-xl font-bold text-indigo-600">
          +
        </div>

      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Transaction Name
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Grocery Shopping"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Amount
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">

            <span className="flex items-center bg-slate-50 px-4 text-sm text-slate-400">
              Rs.
            </span>

            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0"
              className="w-full border-0 px-4 py-3 text-sm outline-none"
            />

          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Transaction Type
          </label>

          <div className="grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  type: "expense",
                })
              }
              className={`rounded-xl border py-3 text-sm font-semibold transition ${
                form.type === "expense"
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              Expense
            </button>

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  type: "income",
                })
              }
              className={`rounded-xl border py-3 text-sm font-semibold transition ${
                form.type === "income"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              Income
            </button>

          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
            >
              {categories.map((category) => (
                <option key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            />
          </div>

        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700 active:scale-[0.98]"
        >
          + Add Transaction
        </button>

      </form>
    </div>
  );
}

export default TransactionForm;