import { useEffect, useMemo, useState } from "react";
import PieChart from "../../ui/PieChart";
import { generateUniqueRandomHSV } from "../../utils/generateColor";
import { getMonthExpense, getYearlyExpense } from "../../services/apiExpenses";

const months = [
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

const currYear = new Date().getFullYear();
const currMonth = new Date().getMonth() + 1;

function MonthVsItemExpense() {
  const [year, setYear] = useState(currYear);
  const [month, setMonth] = useState(currMonth);
  const [report, setReport] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getYearlyExpense(year);
        setReport(response);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, [month, year]);

  const chartData = useMemo(() => prepareData(report, month), [report, month]);

  return (
    <div>
      <h1>Monthly Expense Report</h1>
      <label htmlFor="">Select Year:</label>
      <input
        type="number"
        max={currYear}
        defaultValue={currYear}
        min={currYear - 10}
        onChange={(e) => setYear(e.target.value)}
      />
      <label htmlFor="">Select Month:</label>
      <select
        defaultValue={currMonth}
        onChange={(e) => setMonth(parseInt(e.target.value))}
      >
        {months.map((month, index) => (
          <option key={index} value={index + 1}>
            {month}
          </option>
        ))}
      </select>
      <button>Load</button>
      <PieChart data={chartData} />
    </div>
  );
}

export default MonthVsItemExpense;

function prepareData(report, month) {
  // month 1 based
  let totalMonthExpense = 0;

  let dataVals = [];
  let labels = [];

  let idx = -1;
  if (report.data) {
    idx = report.data.findIndex((el) => el._id === month);
  }

  if (idx != -1) {
    totalMonthExpense = report.data[idx].totalMonthlyExpense;
    report.data[idx].items.forEach((el) => {
      dataVals.push(el.expense);
      labels.push(el.name);
    });
  }

  const colors = generateUniqueRandomHSV(labels.length);

  return {
    labels,
    datasets: [
      {
        label: "Total Expense",
        data: dataVals,
        backgroundColor: colors[0],
        borderColor: colors[1],
        borderWidth: 1,
      },
    ],
  };
}
