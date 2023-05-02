import React, {useState} from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import JournalEntryPopup from './JournalEntryPopup';

const Home = ({user, setUser}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddEntryClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (user !== null) {
    return (
      <div>
        <h1>Welcome, {user.id}!</h1>
        <button onClick={() => setUser(null)}>Log out</button>
        
        
        <button onClick={handleAddEntryClick}>Add Entry</button>
      {showPopup && <JournalEntryPopup onClose={handleClosePopup} />}
        
      </div>
    );
  }


 // render something else if user is not logged in
  return (
    <div>
      <h1>You need to <Link to="/">Log in</Link> first</h1> 
    </div>
  );
};

export default Home;