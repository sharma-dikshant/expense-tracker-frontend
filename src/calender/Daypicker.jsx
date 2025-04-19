import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./calender.css";
import CreateExpenseForm from "../expenses/CreateExpenseForm";
import UpdateExpenseForm from "../expenses/UpdateExpenseForm";

export function Daypicker({ expenses }) {
  const [selected, setSelected] = useState();

  const expenseDates = expenses.map((el) => new Date(el.date));

  const selectedIndex = expenseDates.findIndex(
    (date) => date.toDateString() === selected?.toDateString()
  );

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
