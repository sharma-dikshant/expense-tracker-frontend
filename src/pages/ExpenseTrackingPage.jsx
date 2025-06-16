import { useState } from "react";
import styles from "./expenseTrackingPage.module.css";
import { Link, useLoaderData } from "react-router";
import BasicAnalytics from "./../components/BasicAnalytics";
import { Daypicker } from "../calender/Daypicker";

function ExpenseTrackingPage() {
  //? State to manage new item input, items list and selecting item
  const [selectedItem, setSelectedItem] = useState("");
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const loadedData = useLoaderData();
  const user = loadedData?.data?.user || undefined;
  if (!user) {
    alert("Please login to continue!");
    return <Link to="/auth">Login</Link>;
  }
  function addNewItem() {
    if (newItem.trim() === "") {
      return;
    }
    if (items.some((item) => item.name === newItem)) {
      alert("Item already exists");
      return;
    }
    localStorage.setItem(
      "items",
      JSON.stringify([...items, { name: newItem }])
    );
    setItems((prevItems) => [...prevItems, { name: newItem }]);
    setNewItem("");
  }

  function removeItem(e) {
    const itemName = e.target.parentNode.firstChild.textContent;
    if (itemName === selectedItem) {
      setSelectedItem("");
    }
    const updatedItems = items.filter((item) => item.name !== itemName);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setItems(updatedItems);
  }
  return (
    <>
      <h3>Expense Tracker</h3>
      <div>
        <div>
          <p>Add new Item</p>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button onClick={addNewItem}>add new item</button>
          {items.length > 0 ? (
            <div>Please Select an item</div>
          ) : (
            <div>Add item to continue</div>
          )}
          <ul className={styles.itemsList}>
            {items.map((items, i) => {
              return (
                <li
                  className={`${styles.item} ${
                    items.name === selectedItem ? styles.selected : ""
                  }`}
                  key={i}
                  onClick={() => {
                    if (items.name === selectedItem) {
                      setSelectedItem("");
                    } else {
                      setSelectedItem(items.name);
                    }
                  }}
                >
                  {items.name}
                  <button onClick={removeItem} className={styles.deleteBtn}>
                    x
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <Daypicker selectedItem={selectedItem} />
      </div>
      <BasicAnalytics />
    </>
  );
}

export default ExpenseTrackingPage;
