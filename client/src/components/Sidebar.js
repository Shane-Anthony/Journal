import React from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <h1>Jurnal</h1>
        <ul>
            <li>My Entries</li>
            <li>Contacts</li>
            <li><Link to="/settings">Settings</Link></li>
        </ul>
    </div>
  );
};

export default Sidebar;