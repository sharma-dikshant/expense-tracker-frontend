import { useState } from "react";
import { useCreateExpense } from "./useCreateExpense";

function Form({ date }) {
  const [item, setItem] = useState("milk");
  const [amount, setAmount] = useState(70);
  const [quantity, setQuantity] = useState(1);
  const { createExp, isSuccess, error } = useCreateExpense();

  //TODO update the form data from fixed values to dynamic values
  function handleSubmit(e) {
    e.preventDefault();
    const expense = {
      name: item,
      unitPrice: +amount,
      quantity: +quantity,
      user: "user1",
    };
    createExp(expense);
    console.log(expense);
  }

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <input type="text" value={date.toUTCString()} disabled />
      <label htmlFor="">item</label>
      <input type="text" defaultValue={item} disabled />
      <label htmlFor="">amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <label htmlFor="">quantity</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function CreateExpenseForm({ date }) {
  return <div>{date ? <Form date={date} /> : "No date selected"}</div>;
}

export default CreateExpenseForm;
