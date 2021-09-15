import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";
const ContactCard = ({ contact, clickHandler }) => {
  const { name, email, id } = contact;
  return (
    <div className="item">
      <img src={user} alt="user" className="ui avatar image" />
      <div className="content">
        <Link to={{ pathname: `/contact/${id}`, state: { contact: contact } }}>
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px" }}
        onClick={() => clickHandler(id)}
      ></i>

      <Link to={{ pathname: `/edit`, state: { contact: contact } }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default ContactCard;
