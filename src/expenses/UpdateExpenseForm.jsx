import { useEffect, useState } from "react";
import { useUpdateExpense } from "./useUpdateExpense";

function UpdateExpenseForm({ date, expense, refreshMonthTotal, month, year }) {
  const [item, setItem] = useState(expense.name); // static
  const [amount, setAmount] = useState(expense.unitPrice);
  const [quantity, setQuantity] = useState(expense.quantity);
  // console.log(da)

  const { updateExpenseAsync, isError, isPending, isSuccess } =
    useUpdateExpense();

  useEffect(() => {
    setItem(expense.name);
    setAmount(expense.unitPrice);
    setQuantity(expense.quantity);
  }, [expense]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!item || !amount || !quantity) {
      alert("Please fill all the fields");
      return;
    }

    const updatedExpense = {
      name: item,
      unitPrice: +amount,
      quantity: +quantity,
    };
    try {
      await updateExpenseAsync({ id: expense._id, expense: updatedExpense });
      await refreshMonthTotal(month, year);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  }

  const formatedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
      <button>Update</button>
    </form>
  );
}

export default UpdateExpenseForm;
