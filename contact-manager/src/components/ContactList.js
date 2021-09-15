import React from "react";
import ContactCard from "./ContactCard";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
const ContactList = ({ contacts, getContactId, term, searchKeyWord }) => {
  const deleteContactHandler = (id) => {
    getContactId(id);
  };
  console.log(contacts, searchKeyWord);
  const inputEl = useRef("");
  // const coc = [
  //   {
  //     id: "1",
  //     name: "love",
  //     email: "looe",
  //   },
  // ];
  const getSearchTerm = () => {
    searchKeyWord(inputEl.current.value);
  };
  const renderContactList = contacts.map((contact) => {
    // const { name, email } = contact;
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        clickHandler={deleteContactHandler}
      />
    );
  });
  return (
    <div className="main" style={{ marginTop: "4rem" }}>
      <div style={{}}>
        <h2>
          Contact List
          <Link to="/add">
            <button className="ui button blue right">Add Contact</button>
          </Link>
        </h2>
        <div className="ui search">
          <div className="ui icon input">
            <input
              ref={inputEl}
              type="text"
              name=""
              id=""
              placeholder="Search Contacts"
              className="prompt"
              value={term}
              onChange={getSearchTerm}
            />
            <i className="search icon"></i>
          </div>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts available"}
      </div>
    </div>
  );
};

export default ContactList;
