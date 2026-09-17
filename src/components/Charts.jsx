import Chart from "react-apexcharts";

function Charts({ transactions }) {
  const expenses = transactions.filter(
    (item) => item.type === "expense"
  );

  const incomes = transactions.filter(
    (item) => item.type === "income"
  );

  // Expense categories
  const categoryData = {};

  expenses.forEach((item) => {
    if (!categoryData[item.category]) {
      categoryData[item.category] = 0;
    }

    categoryData[item.category] += Number(
      item.amount
    );
  });

  const categoryNames = Object.keys(categoryData);
  const categoryValues = Object.values(categoryData);

  // Total income
  const totalIncome = incomes.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  // Total expense
  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  // Donut chart
  const donutOptions = {
    chart: {
      type: "donut",
    },

    labels: categoryNames,

    legend: {
      position: "bottom",
      fontSize: "13px",
    },

    dataLabels: {
      enabled: true,
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },

    tooltip: {
      y: {
        formatter: (value) =>
          `Rs. ${value.toLocaleString()}`,
      },
    },
  };

  // Bar chart
  const barOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "45%",
      },
    },

    xaxis: {
      categories: ["Income", "Expenses"],
    },

    dataLabels: {
      enabled: false,
    },

    grid: {
      borderColor: "#e2e8f0",
    },

    yaxis: {
      labels: {
        formatter: (value) =>
          `Rs. ${Number(value).toLocaleString()}`,
      },
    },

    tooltip: {
      y: {
        formatter: (value) =>
          `Rs. ${value.toLocaleString()}`,
      },
    },
  };

  return (
    <section className="mt-6">

      <div className="mb-5">
        <p className="text-xs font-bold tracking-widest text-indigo-600">
          ANALYTICS
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-900">
          Financial Overview
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Donut */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-2">
            <h3 className="font-bold text-slate-800">
              Expenses by Category
            </h3>

            <p className="text-xs text-slate-400">
              Where your money is going
            </p>
          </div>

          {categoryValues.length > 0 ? (
            <Chart
              options={donutOptions}
              series={categoryValues}
              type="donut"
              height={330}
            />
          ) : (
            <div className="flex h-[330px] items-center justify-center text-sm text-slate-400">
              No expense data available.
            </div>
          )}

        </div>

        {/* Bar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-2">
            <h3 className="font-bold text-slate-800">
              Income vs Expenses
            </h3>

            <p className="text-xs text-slate-400">
              Compare your total income and spending
            </p>
          </div>

          <Chart
            options={barOptions}
            series={[
              {
                name: "Amount",
                data: [
                  totalIncome,
                  totalExpense,
                ],
              },
            ]}
            type="bar"
            height={330}
          />

        </div>

      </div>
    </section>
  );
}

export default Charts;