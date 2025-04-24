import { useEffect, useState } from "react";
import { getYearlyExpense } from "../services/apiExpenses";
import styles from "./yearlyExpenseTracker.module.css";

function YearlyExpenseTracker() {
  const [year, setYear] = useState(new Date().getUTCFullYear());
  const [show, setShow] = useState(false);
  const [expenseLog, setExpenseLog] = useState([]);

  useEffect(() => {
    async function getYearlyExpenseLog() {
      const res = await getYearlyExpense(year);
      console.log(res);
      if (res.data) {
        setExpenseLog(res.data);
      } else {
        setExpenseLog([]);
      }
    }
    if (show) {
      getYearlyExpenseLog();
    }
  }, [year, show]);

  function getMonthName(month) {
    const day = 1;
    const date = new Date(year, month - 1, day);
    const monthName = date.toLocaleString("en-US", { month: "long" });
    return monthName;
  }

  return (
    <div className={styles.yearlyExpenseTracker}>
      <h1 className={styles.heading}>Yearly Expense Tracker</h1>
      <input
        type="number"
        className={styles.yearInput}
        placeholder="Enter year"
        min={2000}
        max={new Date().getUTCFullYear()}
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button className={styles.toggleButton} onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"} Expenses
      </button>

      {show &&
        (expenseLog.length > 0 ? (
          <div className={styles.expenseList}>
            <p>Here is your yearly expense tracker for {year}</p>
            {expenseLog.map((exp) => {
              return (
                <div key={exp._id} className={styles.expenseItem}>
                  <span>
                    {getMonthName(exp._id)} :: {exp.monthyExpense}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.noExpense}>No expenses found for {year}</div>
        ))}
    </div>
  );
}

export default YearlyExpenseTracker;
