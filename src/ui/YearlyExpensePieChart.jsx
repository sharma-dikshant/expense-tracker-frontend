import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { generateUniqueRandomHSV } from "../utils/generateColor";
import { getMonthName } from "../utils/dateUtils";

ChartJs.register(ArcElement, Tooltip, Legend);

function YearlyExpensePieChart({ expenseLog, year }) {
  let dataVals = expenseLog?.map((el) => el.totalMonthlyExpense);
  let labels = expenseLog?.map((el) => el._id);
  labels = labels?.map((m_id) => getMonthName(m_id, year));
  const colors = generateUniqueRandomHSV(labels.length);

  const data = {
    labels: labels,
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
  return <Pie data={data} />;
}

export default YearlyExpensePieChart;
