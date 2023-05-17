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
          <h1 className='title'>Settings</h1>
          <div className="sButton-container">
            <Link to="/about">
              <div className="settingsButtons">About Page</div>
            </Link>
            <div className="settingsButtons" onClick={handleAccountSettingsClick}>
              Account Settings
            </div>
            <div className="settingsButtons" onClick={() => setUser(null)}>
              Log out
            </div>
          </div>
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
