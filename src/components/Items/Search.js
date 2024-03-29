import React, { useState, useEffect, useRef } from "react";
import "./Search.css";
import Card from "../UI/Card";

const Search = React.memo((props) => {
  const { onLoadItems } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch(
          "https://grocery-list-fc2d3-default-rtdb.firebaseio.com/items.json" +
            query
        )
          .then((response) => response.json())
          .then((responseData) => {
            const loadedItems = [];
            for (const key in responseData) {
              loadedItems.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            onLoadItems(loadedItems);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadItems, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Name</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
