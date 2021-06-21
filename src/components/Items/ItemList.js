import React from "react";
import "./ItemList.css";

const ItemList = (props) => {

  return (
    <section className='item-list'>
      <h2>Products List</h2>
      <ul>
        {props.items.map((it) => (
          <li key={it.id} >
            <span>{it.title}</span>
            <span>{it.amount}</span>

            <div className="todo">
              <button onClick={props.onRemoveItem.bind(this, it.id)} className="trash-btn">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ItemList;
