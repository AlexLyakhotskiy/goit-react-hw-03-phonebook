import React from 'react';
import PropTypes from 'prop-types';

import styles from './ContactList.module.css';

const ContactList = ({ filtredContacts, remove }) => (
  <ul className={styles.list}>
    {filtredContacts.map(({ id, name, number }) => (
      <li key={id} className={styles.item}>
        <p className={styles.text}>{name}:</p>
        <p className={styles.text}>{number}</p>
        <button
          onClick={() => remove(id)}
          className={styles.button}
          type="button"
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  filtredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  remove: PropTypes.func.isRequired,
};

export default ContactList;
