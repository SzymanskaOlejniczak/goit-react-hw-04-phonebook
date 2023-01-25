import { useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import style from './App.module.css';

export const App=()=> {
  const [contact, setContact] = useState(
  JSON.parse(window.localStorage.getItem('contacts'))??[
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]
      );
  const [filter, setFilter] = useState('');
  
  const addContact = ({ name, number }) => {
      const isContact = contact.find(
        contact => contact.name === name);

      if (isContact) {
        alert(`${name} is already in contact`);
        setContact(contact);
      } else {
        setContact ([{
        id: nanoid(),
        name,
        number,
      }, 
      ...contact,]
        );
      }
    };
  

  const deleteContact = contactId => {
    setContact(prevState => prevState.filter(contact => contact.id !== contactId));
    };
  

  const changeFilter = event => {
    setFilter(event.currentTarget.value );
  };

  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contact
      .map(
        contact =>
          contact.name.toLowerCase().includes(normalizedFilter) && contact
      )
      .filter(contact => contact !== false);
  };
 
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contact));
  }, [contact]);

  const filtredContacts = getFiltredContacts();
    return (
      <div className={style.form}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={filtredContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    );
  }



