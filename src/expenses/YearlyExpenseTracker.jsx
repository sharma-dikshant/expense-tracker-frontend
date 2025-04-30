import { useEffect, useState } from "react";
import { getYearlyExpense } from "../services/apiExpenses";
import styles from "./yearlyExpenseTracker.module.css";

import MonthlyExpensePieChart from "../ui/MonthlyExpensePieChart";
import { getMonthName } from "../utils/dateUtils";
import YearlyExpensePieChart from "../ui/YearlyExpensePieChart";

function YearlyExpenseTracker() {
  const [year, setYear] = useState(new Date().getUTCFullYear());
  const [show, setShow] = useState(false);
  const [expenseLog, setExpenseLog] = useState([]);
  const [showMonthChart, setShowMonthChart] = useState("");

  useEffect(() => {
    async function getYearlyExpenseLog() {
      const res = await getYearlyExpense(year);
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

  return (
    <>
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
              {expenseLog?.map((exp) => {
                return (
                  <div
                    key={exp._id}
                    className={styles.expenseItem}
                    onClick={(e) => {
                      if (showMonthChart !== "") setShowMonthChart("");
                      else setShowMonthChart(exp._id);
                    }}
                  >
                    <span>
                      <strong>-:: {getMonthName(exp._id, year)} ::-</strong>
                    </span>
                    <ul>
                      {showMonthChart === exp._id && (
                        <MonthlyExpensePieChart data={exp.items} />
                      )}
                      {exp?.items.map((i, _i) => (
                        <li key={_i}>
                          <div style={{ display: "flex" }}>
                            <span style={{ width: "40%", textAlign: "left" }}>
                              {i.name}
                            </span>
                            <span>{i.expense}</span>
                          </div>
                          <div></div>
                        </li>
                      ))}
                    </ul>
                    <span>total : {exp.totalMonthlyExpense}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.noExpense}>No expenses found for {year}</div>
          ))}
      </div>
      <YearlyExpensePieChart expenseLog={expenseLog} year={year} />
    </>
  );
}

export default YearlyExpenseTracker;
