import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { generateUniqueRandomHSV } from "../utils/generateColor";
ChartJs.register(ArcElement, Tooltip, Legend);

function MonthlyExpensePieChart({ data }) {
  let dataVals = data?.map((el) => el.expense);
  let labels = data?.map((el) => el.name);
  const colors = generateUniqueRandomHSV(labels.length);

  const ConfigData = {
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
  return <Pie data={ConfigData} />;
}

export default MonthlyExpensePieChart;
