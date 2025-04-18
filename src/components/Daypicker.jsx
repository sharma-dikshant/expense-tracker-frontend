import { useState } from "react";
import { DayPicker } from "react-day-picker";

import "react-day-picker/style.css";

export function Daypicker({ expense }) {
  const [selected, setSelected] = useState();
  const dates = expense.map((el) => el.date);
  console.log(dates);

  return (
    <DayPicker
      animate
      mode="multiple"
        selected={dates}
      //   onSelect={setSelected}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
    />
  );
}
