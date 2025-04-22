import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./calender.css";
import CreateExpenseForm from "../expenses/CreateExpenseForm";
import UpdateExpenseForm from "../expenses/UpdateExpenseForm";
import { useGetExpenses } from "../expenses/useGetExpenses";

export function Daypicker() {
  const [selected, setSelected] = useState();
  const [monthDate, setMonthDate] = useState(new Date());
  const month = monthDate.getMonth() + 1;
  const year = monthDate.getFullYear();

  const { data: res, isLoading, error } = useGetExpenses(month, year);
  const expenses = res?.data.expenses;

  const expenseDates = (expenses ?? []).map((el) => new Date(el.date));

  const normalize = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const selectedIndex = selected
    ? expenseDates.findIndex(
        (date) => normalize(date).getTime() === normalize(selected).getTime()
      )
    : -1;

  if (isLoading) return <p>Loading expenses...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      month={monthDate}
      onMonthChange={(m) => {
        setMonthDate(m);
        setSelected(); // optional: clear selected date when switching months
      }}
      disabled={{ after: new Date() }}
      modifiers={{ expenses: expenseDates }}
      modifiersClassNames={{ expenses: "expense-highlight" }}
      footer={
        selected ? (
          selectedIndex === -1 ? (
            <CreateExpenseForm key={selected?.toISOString()} date={selected} />
          ) : (
            <UpdateExpenseForm
              key={selected?.toISOString()}
              date={selected}
              expense={expenses[selectedIndex]}
            />
          )
        ) : null
      }
    />
  );
}
