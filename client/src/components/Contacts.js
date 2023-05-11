import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const ContactForm = ({ user }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contacts for the current user
    const fetchContacts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/contacts/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to retrieve contacts.');
        }
        const contactsData = await response.json();
        console.log('Fetched contacts:', contactsData);
        setContacts(contactsData);
      } catch (error) {
        console.error('Error:', error);
        // Handle any errors that occurred during the request
      }
    };

    console.log('User ID:', user.id);
    fetchContacts();
  }, [user.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Name:', name);
    console.log('Contact:', contact);
    console.log('Current User:', user.id);

    try {
      // Create a contact object
      const newContact = {
        name: name,
        contact: contact,
        username: user.id,
      };

      // Send a POST request to add the contact
      const response = await fetch('http://localhost:8000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      if (!response.ok) {
        throw new Error('Failed to add contact.');
      }

      const updatedUser = await response.json();
      console.log('Contact added:', updatedUser);

      // Update the contacts state
      setContacts([...contacts, newContact]);

      // Clear the form inputs
      setName('');
      setContact('');
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors that occurred during the request
    }
  };

  return (
    <div>
      <Sidebar />
      <div className='main-content'>

        <h1 className='title'>{user.id}'s Contacts</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <br />
          <label>
            Username:
            <input
              type="text"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
            />
          </label>
          <br />
          <button type="submit">Add Contact</button>
        </form>

        
        {contacts.map((contact, index) => (
            <div className="entryBox" key={index}>
            <p>{contact.name}</p>
            <p>Username: {contact.contact}</p>
            </div>
        ))}

      </div>
    </div>
  );
};

export default ContactForm;
