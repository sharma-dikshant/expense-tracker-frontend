import { useState } from "react";
import { logoutUser } from "../services/apiExpenses";

function Header({ setSelectedItem }) {
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState(
    JSON.parse(localStorage.getItem("ExpenseItemList")) || []
  );
  const [newItem, setNewItem] = useState("");

  async function handleLogout() {
    await logoutUser();
  }

  const handleAddNewItem = () => {
    if (newItem.length < 3) {
      console.log("too short name for item");
    } else if (itemList.includes(newItem)) {
      console.log("item already exist");
    } else {
      const newItemList = [newItem.toLowerCase(), ...itemList];
      setItemList(newItemList);
      localStorage.setItem("ExpenseItemList", JSON.stringify(newItemList));
    }
    setNewItem("");
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button style={{ width: "80px" }} onClick={handleLogout}>
        Logout
      </button>
      <span style={{ display: "flex" }}>
        <label htmlFor="">Select Item: </label>
        <select
          onChange={(e) => {
            setItem(e.target.value);
            if (
              e.target.value !== "default" &&
              e.target.value !== "addNewItem"
            ) {
              localStorage.setItem("selectedExpenseItem", e.target.value);
              setSelectedItem(e.target.value);
            }
          }}
          defaultValue={
            localStorage.getItem("selectedExpenseItem")
              ? localStorage.getItem("selectedExpenseItem")
              : "default"
          }
        >
          <option disabled value={"default"}>
            --items--
          </option>
          {itemList.map((i, _i) => (
            <option value={i} key={_i}>
              {i}
            </option>
          ))}
          <option value="addNewItem">Add New Item +</option>
        </select>
      </span>
      {item === "addNewItem" && (
        <span style={{ display: "flex" }}>
          <input
            type="text"
            placeholder="enter item name: "
            minLength={3}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button onClick={handleAddNewItem}>add</button>
        </span>
      )}
    </div>
  );
}

export default Header;
