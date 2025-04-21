import { useEffect, useState } from "react";
import { useUpdateExpense } from "./useUpdateExpense";

function UpdateExpenseForm({ date, expense }) {
  const [item, setItem] = useState(expense.name); // static
  const [amount, setAmount] = useState(expense.unitPrice);
  const [quantity, setQuantity] = useState(expense.quantity);

  const { updateExpenseAsync, isError, isPending } = useUpdateExpense();

  useEffect(() => {
    setItem(expense.name);
    setAmount(expense.unitPrice);
    setQuantity(expense.quantity);
  }, [expense]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!item || !amount || !quantity) {
      alert("Please fill all the fields");
      return;
    }

    const updatedExpense = {
      name: item,
      unitPrice: +amount,
      quantity: +quantity,
      user: "user1",
    };
    updateExpenseAsync({ id: expense._id, expense: updatedExpense });
  }

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <input type="text" value={date?.toUTCString()} disabled />
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
      <button>Update</button>
    </form>
  );
}

export default UpdateExpenseForm;
