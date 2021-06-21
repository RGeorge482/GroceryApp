import React, { useState, useCallback } from "react";
import ItemForm from "./ItemForm";
import Search from "./Search";
import ItemList from "./ItemList";

const Items = () => {
  const [userItems, setUserItems] = useState([]);

  const filteredItemsHandler = useCallback(filteredItems => {
    setUserItems(filteredItems)
  },[])

  const addItemHandler = (item) => {
    fetch("https://grocery-list-fc2d3-default-rtdb.firebaseio.com/items.json", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      return response.json()
    }).then(responseData => {
      setUserItems((prevItems) => [
        ...prevItems,
        { id: responseData.name, ...item },
      ]);
    })  
  };

  const removeItemHandler = (itemId) => {
    fetch(`https://grocery-list-fc2d3-default-rtdb.firebaseio.com/items/${itemId}.json`, {
      method: "DELETE",
    }).then(response => {
      setUserItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    })
  };

  return (
    <div>
      <header>
        <h1>Grocery List</h1>
      </header>
      <ItemForm onAddItem={addItemHandler} />

      <section>
        <Search onLoadItems={filteredItemsHandler} />
        <ItemList items={userItems} onRemoveItem={removeItemHandler} />
      </section>
    </div>
  );
};

export default Items;
