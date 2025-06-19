import styles from "./analyticsPage.module.css";
import MonthVsExpense from "../components/Analytical Components/MonthVsExpense";
import MonthVsItemExpense from "../components/Analytical Components/MonthVsItemExpense";
import AiSummaryGenerator from "../components/Analytical Components/AiSummaryGenerator";
import { useGetAnnualExpenseData } from "../expenses/useGetAnnualExpenseData";
import { useState } from "react";

function AnalyticsPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { data, isLoading, error } = useGetAnnualExpenseData(year); //Prefetch report

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.graph}>
          <MonthVsExpense />
          <AiSummaryGenerator />
        </div>
        <div className={styles.graph}>
          <MonthVsItemExpense />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
