import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';


const Settings = ({user, setUser}) => {
  const history = useNavigate();
  const handleAboutClick = () => {
    // Handle About button click
    history('/about');
  };
    
  const handleAccountSettingsClick = () => {
    // Handle Account Settings button click
    history('/account-settings');
  };
    
      
  if (user !== null) {
    return (
      <div>
        <Sidebar />
        <div className='main-content'>
          <h1>Settings</h1>
          <button onClick={handleAboutClick}>About</button>
          <button onClick={handleAccountSettingsClick}>Account Settings</button>
          <button onClick={() => setUser(null)}>Log out</button>


        </div>
      </div>
    );
  }
  else{
    history('/');
    return null;
  }
  
};

export default Settings;
