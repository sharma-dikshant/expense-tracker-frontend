import { useState } from "react";
import { useCreateExpense } from "./useCreateExpense";

function CreateExpenseForm({ date }) {
  console.log(date);
  return <div>{date ? <Form date={date} /> : "No date selected"}</div>;
}

function Form({ date }) {
  const [item] = useState("milk"); // fixed, since it's disabled
  const [amount, setAmount] = useState(70);
  const [quantity, setQuantity] = useState(1);
  const { createExp, error, isPending } = useCreateExpense();
  const formatedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!item || !amount || !quantity) {
      alert("Please fill all the fields");
      return;
    }

    const expense = {
      name: item,
      unitPrice: +amount,
      quantity: +quantity,
      user: "user1",
      date: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
    };

    createExp(expense);
  }

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <input type="text" value={formatedDate} disabled />
      <label>Item</label>
      <input type="text" value={item} disabled />
      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <label>Quantity</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

export default CreateExpenseForm;
