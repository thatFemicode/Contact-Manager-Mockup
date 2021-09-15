import logo from "./logo.svg";
// import './App.css';
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import ContactDetail from "./components/ContactDetail";
import EditContact from "./components/EditContact";
import api from "./api/contact";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  // const contacts = [
  //   {
  //     id: "1",
  //     name: "Dipesh",
  //     email: "dipesh@gmail.com",
  //   },
  //   {
  //     id: "2",
  //     name: "Nikesh",
  //     email: "katesh@gmail.com",
  //   },
  // ];
  // Finding a way to persist data to local storage we will be using the useffect hook meaning
  // Once the contacts change
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const addContactHandler = async (contact) => {
    // gET THE DATA THERE AND SET THE NEW ONE WITH IT
    const request = {
      id: uuidv4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };
  // Function to update contact
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };
  // Function to retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };
  const searchHandler = (search) => {
    setSearchTerm(search);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        // console.log(Object.values(contact)[1]);
        return Object.values(contact)[1]
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };
  useEffect(() => {
    // const retrieved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrieved) setContacts(retrieved);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  // Use Effect to get the ITEM AFTER REFRESH AND THEN DISPLAY IT

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyWord={searchHandler}
              />
            )}
          />
          <Route
            exact
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route path="/contact/:id" component={ContactDetail} />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
        </Switch>

        {/* <AddContact addContactHandler={addContactHandler} /> */}
        {/* <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>
    </div>
  );
}

export default App;
