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
    const entriesWithColour = data.map(entry => ({
      ...entry,
      colour: entry.colour || 'black' // set default color to black if not provided by server
    }));
    setEntries(entriesWithColour);
  };
    
  const handleRefresh = () => {
    fetchEntries();
  };

  useEffect(() => {
    if (user !== null) {
      fetchEntries();
    }
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
    entry.title && entry.body &&
    (entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     entry.body.toLowerCase().includes(searchQuery.toLowerCase()))
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
    const username = prompt('Enter the username of the user you want to share this entry with:');
    if (!username) {
      return;
    }
    console.log(entryId)

    const response = await fetch(`http://localhost:8000/share-entry/${user.id}/${entryId}/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
  
    const data = await response.json();
    alert(data.message);
  };
  
  if (user !== null) {
    return (
      <div className="container">
        <Sidebar handleAddEntryClick={handleAddEntryClick} isHomePage={true} />
        <div className="main-content">
          <h1 className="title">{user.id}'s Jurnal Entries</h1>
          <button className="refreshButton" onClick={handleRefresh}>
            <i className="fas fa-sync-alt"></i>  
          </button> 
          <div>
            <label htmlFor="search"></label>
            <input
              type="text"
              id="search"
              placeholder='Search Entries '
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <br />
          <div>
            <button className={`sort-order-button ${sortOrder}`} onClick={handleSortClick}>Date: {sortOrder.toUpperCase()}</button>
                    
          </div>
          <br />



          {filteredEntries.map(entry => (
            <div key={entry._id} className="entryBox">
              <h2>{entry.title}</h2>
              <p style={{ color: `${entry.colour}` }}> {entry.body}</p>
              {entry.image && <img src={`http://localhost:8000/uploads/${entry.image}`} alt="Entry Image" style={{ maxWidth: '100%', height: 'auto' }} />}
              <div className="buttons-container">
                <div className="date">Entry Date: {new Date(entry.date).toLocaleDateString()}</div>
                <button className="share-btn" onClick={() => handleShareClick(entry._id)}>
                  Share
                </button>
                <button className="delete-btn" onClick={() => handleDeleteClick(entry._id)}>
                  <i className="fas fa-trash-alt"></i>  Delete
                </button>
              </div>
            </div>
          ))}





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
