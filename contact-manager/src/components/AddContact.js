import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Data gotten after submission must be passed down into the contacts list
// by passing data from child to paren
const AddContact = ({ addContactHandler }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
  });
  const history = useHistory();
  // console.log(props);

  // addContactHandler(state);
  // const [addContact, setAddContact] = useState({ name: "", email: "" });
  // console.log(addContact);
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }
  const add = (e) => {
    e.preventDefault();
    if (state.name === "" && state.email === "") {
      alert("AAll this fields are mandatory");
      return;
    }
    addContactHandler(state);
    setState({ name: "", email: "" });
    console.log(state);
    history.push("/");
  };
  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form action="" className="ui form" onSubmit={add}>
        <div className="field">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            id=""
            value={state.name}
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="email"
            value={state.email}
            id=""
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
};

export default AddContact;
