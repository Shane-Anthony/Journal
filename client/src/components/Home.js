import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import JournalEntryPopup from './JournalEntryPopup';

const Home = ({ user, setUser }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [entries, setEntries] = useState([]);
  const history = useNavigate();

  const handleAddEntryClick = () => {
    setShowPopup(true);
    history('/create-entry');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch(`http://localhost:8000/home/${user.id}`);
      const data = await response.json();
      setEntries(data);
    };
  
    let intervalId = setInterval(() => {
      fetchEntries();
    }, 3000);
  
    if (user !== null) {
      fetchEntries();
    }
  
    return () => {
      clearInterval(intervalId);
    };
  }, [user]);

  if (user !== null) {
    return (
      <div>
        <h1>Welcome, {user.id}!</h1>
        <button onClick={() => setUser(null)}>Log out</button>

        {entries.map(entry => (
          <div key={entry._id}>
            <h2>{entry.title}</h2>
            <p>{entry.body}</p>
            <p>{new Date(entry.date).toLocaleDateString()}</p>
          </div>
        ))}

        <button onClick={handleAddEntryClick}>Add Entry</button>
        {showPopup && <JournalEntryPopup onClose={handleClosePopup} user={user} />}
      </div>
    );
  }

  return (
    <div>
      <h1>You need to <Link to="/">Log in</Link> first</h1> 
    </div>
  );
};

export default Home;
