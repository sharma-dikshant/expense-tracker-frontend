import styles from "./analyticsPage.module.css";
import MonthVsExpense from "../components/Analytical Components/MonthVsExpense";
import MonthVsItemExpense from "../components/Analytical Components/MonthVsItemExpense";
import AiSummaryGenerator from "../components/Analytical Components/AiSummaryGenerator";

function AnalyticsPage() {
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
