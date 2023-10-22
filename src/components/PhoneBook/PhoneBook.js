import React, { Component } from 'react';

import { Div, Title, ContactsTitle } from './PhoneBookStyles.js';

import { ContactForm } from 'components/ContactForm/ContactForm.js';

import { ContactList } from 'components/ContactList/ContactList.js';

import { Filter } from 'components/Filter/Filter.js';

import { nanoid } from 'nanoid';

class PhoneBook extends Component {
  state = {
    contacts: JSON.parse(localStorage.getItem('phonebook')),
    filter: '',
    name: '',
    number: '',
  };

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('phonebook', JSON.stringify(this.state.contacts));
  }

  handleChangeList = id => {
    let i = 0;
    this.setState(prev => {
      i += 1;
      if (i === 1) {
        const index = prev.contacts.findIndex(contact => contact.id === id);
        return prev.contacts.splice(index, 1);
      }
    });
  };

  handleChange = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    let i = 0;
    let personId = nanoid();
    if (
      this.state.contacts.find(contact => contact.name === evt.target[0].value)
    ) {
      alert(`${evt.target[0].value} is already in contacts`);
    } else {
      const element = {
        id: personId,
        name: evt.target[0].value,
        number: evt.target[1].value,
      };
      this.setState(prev => {
        i += 1;
        if (i === 1) {
          return prev.contacts.push(element);
        }
      });
    }

    evt.target.reset();
  };

  render() {
    return (
      <Div>
        <Title>Phonebook</Title>
        <ContactForm stateSubmit={this.handleSubmit} />
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter changeState={this.handleChange} />
        {!this.state.filter ? (
          <ContactList
            persons={this.state.contacts}
            changeList={this.handleChangeList}
          />
        ) : (
          <ContactList
            persons={this.state.contacts.filter(contact =>
              contact.name.includes(this.state.filter)
            )}
            changeList={this.handleChangeList}
          />
        )}
      </Div>
    );
  }
}

export { PhoneBook };
