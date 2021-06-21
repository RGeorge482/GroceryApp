import React, {useState} from "react";
import Card from "../UI/Card";
import "./ItemForm.css";

const ItemForm = React.memo((props) => {
  const [enteredName, setEnteredName] = useState('') 
  const [enteredAmount, setEnteredAmount] = useState('')


  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredName.trim().length === 0 || enteredAmount.trim().length === 0) {
      return;
    }

    if (+enteredAmount < 1) {
      return;
    }

    props.onAddItem({title: enteredName, amount: enteredAmount})

    setEnteredName('')
    setEnteredAmount('')
  };

  return (
    <section className="item-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className='form-control'>
            <label htmlFor="title">Name</label>
            <input 
              type="text" 
              id="title" 
              value={enteredName} 
              onChange={event => {
                setEnteredName(event.target.value)
              }} />
          </div>
          <div className='form-control'>
            <label htmlFor="amount">Quantity</label>
            <input 
              type="number" 
              id="amount" 
              value={enteredAmount}
              onChange={
                event => {
                  setEnteredAmount(event.target.value)
                }
              } />
          </div>
          <div className='item_action'>
            <button type="submit">Add Product</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default ItemForm;
