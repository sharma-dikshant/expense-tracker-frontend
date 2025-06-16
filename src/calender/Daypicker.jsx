import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styles from "./daypicker.module.css";
import CreateExpenseForm from "../expenses/CreateExpenseForm";
import UpdateExpenseForm from "../expenses/UpdateExpenseForm";
import { useGetExpenses } from "../expenses/useGetExpenses";
import { getSelectedExpenseIndex } from "../utils/expenseUtils";

export function Daypicker({ selectedItem }) {
  const [selected, setSelected] = useState();
  const [monthDate, setMonthDate] = useState(new Date());
  const month = monthDate.getMonth() + 1;
  const year = monthDate.getFullYear();

  const {
    data: res,
    isLoading,
    error,
  } = useGetExpenses({ month, year, name: selectedItem });
  const expenses = res?.data.expenses;

  const expenseDates = (expenses ?? []).map((el) => new Date(el.date));
  const selectedIndex = getSelectedExpenseIndex(expenses, selected);

  if (isLoading) return <p>Loading expenses...</p>;
  if (error) {
    console.log(error.message);
    throw Error("Something went wrong");
  }

  return (
    <>
      <DayPicker
        className={styles.rdp}
        mode="single"
        selected={selected}
        onSelect={setSelected}
        month={monthDate}
        onMonthChange={(m) => {
          setMonthDate(m);
          setSelected();
        }}
        disabled={{ after: new Date() }}
        modifiers={{ expenses: expenseDates }}
        modifiersClassNames={{ expenses: styles.expenseHighlight }} // ✅ Only overrides expense days
        footer={
          selected ? (
            selectedIndex === -1 ? (
              <CreateExpenseForm
                key={selected?.toISOString()}
                date={selected}
                month={month}
                year={year}
                selectedItem={selectedItem}
              />
            ) : (
              <UpdateExpenseForm
                key={selected?.toISOString()}
                date={selected}
                expense={expenses[selectedIndex]}
                month={month}
                year={year}
                selectedItem={selectedItem}
              />
            )
          ) : null
        }
      />
    </>
  );
}
