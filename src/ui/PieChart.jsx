import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJs.register(ArcElement, Tooltip, Legend);

function PieChart({ data }) {
  return <Pie data={data} />;
}

export default PieChart;
