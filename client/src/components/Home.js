import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import JournalEntryPopup from './JournalEntryPopup';
import './Styles.css';
import Sidebar from './Sidebar';

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

  const fetchEntries = async () => {
    const response = await fetch(`http://localhost:8000/home/${user.id}`);
    const data = await response.json();
    setEntries(data);
  };
    
  useEffect(() => {
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
        entry.title.toLowerCase().includes(searchQuery.toLowerCase())||
        entry.body.toLowerCase().includes(searchQuery.toLowerCase())
      );
    setFilteredEntries(filteredAndSortedEntries);
  }, [entries, searchQuery, sortOrder]);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSortClick = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const handleDeleteClick = async id => {
    await fetch(`http://localhost:8000/delete-entry/${user.id}/${id}`, {
      method: 'DELETE',
    });
    const newEntries = entries.filter(entry => entry._id !== id);
    setEntries(newEntries);
  };
  
  const handleShareClick = async (entryId) => {
    const userId = prompt('Enter the ID of the user you want to share this entry with:');
    if (!userId) {
      return;
    }
    console.log(entryId)

    const response = await fetch(`http://localhost:8000/share-entry/${user.id}/${entryId}/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
  
    const data = await response.json();
    alert(data.message);
  };
  
  if (user !== null) {
    return (
      <div className="container">
        <Sidebar />
        <div className="main-content">
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
              <button onClick={() => handleDeleteClick(entry._id)}>Delete</button>
              <button onClick={() => handleShareClick(entry._id)}>Share</button>
            </div>
          ))}

          <button onClick={handleAddEntryClick}>Add Entry</button>
          {showPopup && <JournalEntryPopup onClose={handleClosePopup} user={user} />}
        </div>

      </div>
    );
  }
  else{
    history('/');
    return null;
  }
  
};

export default Home;
