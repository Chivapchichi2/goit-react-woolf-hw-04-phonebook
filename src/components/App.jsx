import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { eachFirstToUpperCase } from '../utils/utils';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notification } from './Notification/Notification';

export const App = () => {
  const CONTACTS_KEY = 'contacts';
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedContacts = localStorage.getItem(CONTACTS_KEY);
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    }
  }, [contacts, mounted]);

  const addContact = ({ name, number }) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(
        `${eachFirstToUpperCase(
          name
        )} is already in contacts. Change contact's name or delete old.`
      );
      return;
    }
    const id = nanoid();
    setContacts(prevContacts => [{ name, number, id }, ...prevContacts]);
    setFilter('');
  };

  const changeFilter = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const cleanFilter = filter.toLowerCase();
    return contacts
      .filter(contact => contact.name.toLowerCase().includes(cleanFilter))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const deleteContact = idContact => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== idContact)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        <Filter value={filter} onFilter={changeFilter} />
      ) : (
        <Notification message="No contacts added" />
      )}
      {contacts.length > 0 && filteredContacts.length === 0 && (
        <Notification message="No contact found" />
      )}
      {filteredContacts.length > 0 && (
        <ContactList contacts={filteredContacts} onDelete={deleteContact} />
      )}
    </>
  );
};
