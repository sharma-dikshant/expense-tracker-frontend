import { useEffect, useState } from "react";
import { getYearlyExpense } from "../services/apiExpenses";

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
    <div>
      <h1>Yearly Expense Tracker</h1>
      <input
        type="number"
        placeholder="Enter year"
        min={2000}
        max={new Date().getUTCFullYear()}
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button onClick={() => setShow(!show)}>
        {show ? "hide" : "show"} expenses
      </button>

      {show &&
        (expenseLog ? (
          <div>
            <p>here is your yearly expense tracker for {year}</p>
            {expenseLog.map((exp) => {
              return (
                <div key={exp._id}>
                  <span>
                    {getMonthName(exp._id)} :: {exp.monthyExpense}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div>no expense found for {year}</div>
        ))}
    </div>
  );
}

export default YearlyExpenseTracker;
