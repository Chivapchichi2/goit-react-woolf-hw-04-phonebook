import React, { useState } from 'react';
import styles from './ContactForm.module.css';

export const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', number: '' });

  const handleInputChange = e => {
    const { value, name } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const { name } = formData;
    const nameToLowerCase = name.toLowerCase();
    onSubmit({ ...formData, name: nameToLowerCase });
    setFormData({ name: '', number: '' });
  };

  const { name, number } = formData;

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <label className={styles.label}>
        Name:
        <input
          className={styles.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' ][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleInputChange}
          placeholder="Ivanov Ivan (ivanov ivan)"
        />
      </label>
      <label className={styles.label}>
        Number:
        <input
          className={styles.input}
          type="tel"
          name="number"
          pattern="(\(\d{3}\) \d{3}-\d{2}-\d{2}|\d{3} \d{3} \d{2} \d{2}|\d{5,12})"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleInputChange}
          placeholder="099 123 45 67 (099-123-45-67)"
        />
      </label>
      <button type="submit" className={styles.button}>
        Add Contact
      </button>
    </form>
  );
};
