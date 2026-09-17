function SummaryCards({ totals }) {
  const money = (value) =>
    `Rs. ${Number(value).toLocaleString()}`;

  const cards = [
    {
      title: "Current Balance",
      value: totals.balance,
      icon: "💰",
      text: "Available balance",
      iconBg: "bg-indigo-100",
      iconText: "text-indigo-600",
    },
    {
      title: "Total Income",
      value: totals.income,
      icon: "↗",
      text: "Money received",
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-600",
    },
    {
      title: "Total Expenses",
      value: totals.expense,
      icon: "↘",
      text: "Money spent",
      iconBg: "bg-red-100",
      iconText: "text-red-600",
    },
  ];

  return (
    <section className="grid gap-5 md:grid-cols-3">

      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >

          <div className="flex items-center gap-3">

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${card.iconBg} ${card.iconText}`}
            >
              {card.icon}
            </div>

            <span className="text-sm font-medium text-slate-500">
              {card.title}
            </span>

          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            {money(card.value)}
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            {card.text}
          </p>

        </div>
      ))}

    </section>
  );
}

export default SummaryCards;