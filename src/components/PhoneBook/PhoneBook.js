import React, { Component } from 'react';

import { Div, Title, ContactsTitle } from './PhoneBookStyles.js';

import { ContactForm } from 'components/ContactForm/ContactForm.js';

import { ContactList } from 'components/ContactList/ContactList.js';

import { Filter } from 'components/Filter/Filter.js';

class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  changedItems;

  items = JSON.parse(localStorage.getItem('phonebook'));

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('phonebook', JSON.stringify(this.items));
    } else {
      this.setState({
        contacts: JSON.parse(localStorage.getItem('phonebook')),
      });
    }
  }

  handleChangeList = index => {
    this.setState({
      contacts: this.items.splice(index, 1),
    });
  };

  handleChange = id => {
    this.setState({
      filter: document.getElementById(id).value,
    });
  };

  handleSubmit = (evt, id, tl) => {
    evt.preventDefault();
    let skip = 0;
    this.items.forEach(item => {
      if (item.name === document.getElementById(id).value) {
        alert(`${document.getElementById(id).value} is already in contacts`);
        skip = 1;
      }
    });
    if (skip === 0) {
      const element = {
        id: 'id-' + (this.items.length + 1),
        name: document.getElementById(id).value,
        number: document.getElementById(tl).value,
      };

      this.setState({
        contacts: this.items.splice(this.items.length, 0, element),
        number: document.getElementById(tl).value,
      });
    }

    evt.target.reset();
  };

  render() {
    this.changedItems = [...this.items];

    if (this.state.filter !== '') {
      this.changedItems = this.items.filter(item =>
        item.name.includes(this.state.filter)
      );
    }

    return (
      <Div>
        <Title>Phonebook</Title>
        <ContactForm stateSubmit={this.handleSubmit} />
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter changeState={this.handleChange} />
        <ContactList
          persons={this.changedItems}
          changeList={this.handleChangeList}
        />
      </Div>
    );
  }
}

export { PhoneBook };
