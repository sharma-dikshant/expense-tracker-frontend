import { useEffect, useMemo, useState } from "react";
import MultiAxialLineChart from "../../ui/MultiAxialLineChart";
import { getYearlyExpense } from "../../services/apiExpenses";

const currYear = new Date().getFullYear();
function MonthVsExpense() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [expenseReport, setExpenseReport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const report = await fetchReport(year);
      setExpenseReport(report);
    }
    setIsLoading(true);
    const timer = setTimeout(() => {
      loadData();
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [year]);

  const chartData = useMemo(() => prepareData(expenseReport), [expenseReport]);

  return (
    <div>
      <h1>Yearly Expense Graph</h1>
      <label htmlFor="">Select Year:</label>
      <input
        type="number"
        max={currYear}
        defaultValue={currYear}
        min={currYear - 10}
        onChange={(e) => setYear(e.target.value)}
      />
      <button onClick={fetchReport}>Load</button>
      {isLoading && <div>Loading...</div>}
      <MultiAxialLineChart data={chartData} />
    </div>
  );
}

export default MonthVsExpense;

function prepareData(report) {
  const dataValues = Array(12).fill(0);
  report?.forEach((el) => {
    dataValues[el._id - 1] = el.totalMonthlyExpense;
  });
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return {
    labels,
    datasets: [
      {
        label: "Month Expenses",
        data: dataValues,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
    ],
  };
}

async function fetchReport(year) {
  try {
    const response = await getYearlyExpense(year);
    return response.data ? response.data : [];
  } catch (error) {
    console.log("Error in getting Month expense", error);
    return [];
  }
}
