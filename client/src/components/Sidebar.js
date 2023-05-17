import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Styles.css';

const Sidebar = ({ handleAddEntryClick, isHomePage }) => {
  
  const history = useNavigate();

  const handleHomeClick = () => {
    history('/home');
  };

  const handleSharedClick = () => {
    history("/shared-entries");
  };

  const handleContactsClick = () => {
    history("/contacts");
  };

  const handleSettingsClick = () => {
    history("/settings");
  };

  return (
    <div className="sidebar">
        <h1>Jurnal</h1>
        <ul>
          <li onClick={handleHomeClick}>My Entries</li>
          <li onClick={handleSharedClick}>Shared Entries</li>
          <li onClick={handleContactsClick}>Contacts</li>
          <li onClick={handleSettingsClick}>Settings</li>
        </ul>
        
        <br />
        <br />
        <br />
        <br />

        <ul>
          {isHomePage && <li onClick={handleAddEntryClick}>Add Entry</li>}
        </ul>
        
    </div>
  );
};

export default Sidebar;