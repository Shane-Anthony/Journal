import React from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';

const Sidebar = ({ handleAddEntryClick, isHomePage }) => {
  return (
    <div className="sidebar">
        <h1>Jurnal</h1>
        <ul>
            <li><Link to="/home">My Entries</Link></li>
            <li><Link to="/shared-entries">Shared Entries</Link></li>
            <li>Contacts</li>
            <li><Link to="/settings">Settings</Link></li>
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