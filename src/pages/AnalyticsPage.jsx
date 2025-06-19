import styles from "./analyticsPage.module.css";
import MonthVsExpense from "../components/Analytical Components/MonthVsExpense";
import MonthVsItemExpense from "../components/Analytical Components/MonthVsItemExpense";

function AnalyticsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.graph}>
        <MonthVsExpense />
      </div>
      <div className={styles.graph}>
        <MonthVsItemExpense />
      </div>
    </div>
  );
}

export default AnalyticsPage;
