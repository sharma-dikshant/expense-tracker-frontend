import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./calender.css";
import CreateExpenseForm from "../expenses/CreateExpenseForm";

export function Daypicker({ expense }) {
  const [selected, setSelected] = useState();

  const expenseDates = expense.map((el) => new Date(el.date));

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      modifiers={{ expenses: expenseDates }}
      modifiersClassNames={{ expenses: "expense-highlight" }}
      footer={<CreateExpenseForm date={selected} />}
    />
  );
}
