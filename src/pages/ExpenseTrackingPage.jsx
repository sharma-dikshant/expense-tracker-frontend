import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { Link, useLoaderData } from "react-router";
function ExpenseTrackingPage() {
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
          <ul>
            {items.map((items, i) => {
              return (
                <li key={i}>
                  {items.name}
                  <button onClick={removeItem}>x</button>
                </li>
              );
            })}
          </ul>
        </div>
        <DayPicker />
      </div>
      <div>
        <h1>Basic Analytics</h1>
        <div>
          <ul>
            <li>
              Total Expense For this month: <span>0</span>
            </li>
            <li>
              Total Expense For this year: <span>0</span>
            </li>
            <li>
              Note for this month: <p>Please limit expenses for this month</p>
              <button>Update Month Note</button>
            </li>
            <li>
              Note for this year: <p>Please limit expenses for this year</p>
              <button>Update Year Note</button>
            </li>
          </ul>
        </div>
        <Link to="/analytics">See Detailed Analytics</Link>
      </div>
    </>
  );
}

export default ExpenseTrackingPage;
