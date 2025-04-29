import { useState } from "react";
import { useCreateExpense } from "./useCreateExpense";
import { formatDate } from "../utils/dateUtils";

function CreateExpenseForm({ date, refreshMonthTotal, month, year, selectedItem }) {
  console.log(selectedItem)
  return (
    <div>
      {date ? (
        <Form
          date={date}
          refreshMonthTotal={refreshMonthTotal}
          month={month}
          year={year}
          selectedItem={selectedItem}
        />
      ) : (
        "No date selected"
      )}
    </div>
  );
}

function Form({ date, refreshMonthTotal, month, year, selectedItem }) {
  const l_expense = JSON.parse(localStorage.getItem("expense"));
  // const [item] = useState(l_expense ? l_expense.name : "milk"); // fixed, since it's disabled
  const [amount, setAmount] = useState(l_expense ? l_expense.unitPrice : 70);
  const [quantity, setQuantity] = useState(l_expense ? l_expense.quantity : 1);
  const { createExp, error, isPending } = useCreateExpense();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedItem || !amount || !quantity) {
      alert("Please fill all the fields");
      return;
    }

    const expense = {
      name: selectedItem,
      unitPrice: +amount,
      quantity: +quantity,
      date: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
    };

    try {
      localStorage.setItem("expense", JSON.stringify(expense));
      await createExp(expense);
      await refreshMonthTotal(month, year);
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  }

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <input type="text" value={formatDate(date)} disabled />
      <label>Item</label>
      <input type="text" value={selectedItem} disabled />
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
      <button disabled={isPending} className={isPending ? "disabled" : ""}>
        {isPending ? "Adding" : "Add"}
      </button>
    </form>
  );
}

export default CreateExpenseForm;
