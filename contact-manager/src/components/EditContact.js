import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Data gotten after submission must be passed down into the contacts list
// by passing data from child to paren
const EditContact = ({ ...props }) => {
  const { location, updateContactHandler } = props;
  console.log(props);
  const { id, name, email } = location.state.contact;
  const [state, setState] = useState({
    id,
    name,
    email,
  });
  const history = useHistory();
  // console.log(props);

  // EditContactHandler(state);
  // const [EditContact, setEditContact] = useState({ name: "", email: "" });
  // console.log(EditContact);
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }
  const update = (e) => {
    e.preventDefault();
    if (state.name === "" && state.email === "") {
      alert("AAll this fields are mandatory");
      return;
    }
    updateContactHandler(state);
    setState({ name: "", email: "" });
    console.log(state);
    history.push("/");
  };
  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form action="" className="ui form" onSubmit={update}>
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
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
