import React from 'react';
import PropTypes from 'prop-types';
import style from './ContactList.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={style.list}>
    {contacts.map(({ id, name, number }) => (
      <li className={style.contact} key={id}>
        <p>{name}:</p>
        <p>{number}</p>
        <button
          className={style.btn}
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          <span>Delete</span> 
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf
    (PropTypes.exact({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    })),
  onDeleteContact: PropTypes.func.isRequired,
};

