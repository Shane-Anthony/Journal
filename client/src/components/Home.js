import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import JournalEntryPopup from './JournalEntryPopup';
import './Styles.css';

const Home = ({ user, setUser }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
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

  useEffect(() => {
    const filteredAndSortedEntries = entries
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      })
      .filter(entry =>
        entry.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    setFilteredEntries(filteredAndSortedEntries);
  }, [entries, searchQuery, sortOrder]);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSortClick = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('asc');
    }
  };

  if (user !== null) {
    return (
      <div>
        <h1>Welcome, {user.id}!</h1>
        <button onClick={() => setUser(null)}>Log out</button>

        <div>
          <label htmlFor="search">Search entries:</label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div>
          <p>Sort order: {sortOrder.toUpperCase()}</p>
          <button onClick={handleSortClick}>Toggle Sort Order</button>
        </div>

        {filteredEntries.map(entry => (
          <div key={entry._id} className="entryBox">
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
