import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./calender.css";
import CreateExpenseForm from "../expenses/CreateExpenseForm";
import UpdateExpenseForm from "../expenses/UpdateExpenseForm";
import { useGetExpenses } from "../expenses/useGetExpenses";

export function Daypicker() {
  const [selected, setSelected] = useState(new Date());
  const month = selected?.getMonth() + 1;
  const year = selected?.getFullYear();
  const { data: res, isLoading, error } = useGetExpenses(month, year);

  const expenses = res?.data.expenses;
  console.log(selected);

  const expenseDates = (expenses ?? []).map((el) => new Date(el.date));

  // console.log(expenseDates);
  const selectedIndex = expenseDates.findIndex(
    (date) => date.toDateString() === selected?.toDateString()
  );

  if (isLoading) return <p>Loading expenses...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      disabled={{ after: new Date() }}
      modifiers={{ expenses: expenseDates }}
      modifiersClassNames={{ expenses: "expense-highlight" }}
      footer={
        selected ? (
          selectedIndex === -1 ? (
            <CreateExpenseForm date={selected} />
          ) : (
            <UpdateExpenseForm
              date={selected}
              expense={expenses[selectedIndex]}
            />
          )
        ) : null
      }
    />
  );
}
