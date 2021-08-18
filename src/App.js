import React, { Component } from 'react';

import Container from './components/Container';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    if (localStorage.contacts) {
      const parsedContacts = JSON.parse(localStorage.contacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;
    if (nextContacts !== prevContacts) {
      localStorage.contacts = JSON.stringify(nextContacts);
    }
  }

  addContact = contact => {
    if (this.findDuplicateContact(contact)) {
      alert(`${contact.name} is already in contacts`);
      return false;
    }
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
    return true;
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(el => el.id !== contactId),
    }));
  };

  onInputChange = e => {
    const { value, name } = e.currentTarget;
    this.setState({ [name]: value });
  };

  filterContact = () => {
    const normalizeStr = this.state.filter.toLowerCase();
    return this.state.contacts.filter(cont =>
      cont.name.toLowerCase().includes(normalizeStr),
    );
  };

  findDuplicateContact(contact) {
    const { contacts } = this.state;
    const contactToAdd = contact.name.toLowerCase();
    return contacts.find(el => el.name.toLowerCase() === contactToAdd);
  }

  render() {
    const { filter } = this.state;
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.onInputChange} />
        <ContactList
          filtredContacts={this.filterContact()}
          remove={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
