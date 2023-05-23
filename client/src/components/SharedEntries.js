import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const SharedEntries = ({ user, setUser }) => {
  const [entries, setEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);

  const handleRefresh = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/shared-entries/${user.id}`);
      setEntries(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRefresh();
  }, [user]);

  useEffect(() => {
    const filteredEntries = entries.filter((entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEntries(filteredEntries);
  }, [entries, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='main-content'>
      <Sidebar />
      <h1 className='title'>Shared Entries</h1>
      <button className="refreshButton" onClick={handleRefresh}>
        <i className="fas fa-sync-alt"></i>  
      </button>
      <div>
        <label htmlFor="search"></label>
        <input
          type="text"
          id="search"
          placeholder="Search Entries"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        </div>
      <br />
      <br />
      <ul>
      {filteredEntries.sort((a, b) => new Date(b.date) - new Date(a.date)).map((entry) => (
        <div className='entryBox' key={entry._id}>
          <h2>{entry.title}</h2>
          <p style={{ color: `${entry.colour}` }}> {entry.body}</p>
          {entry.image && <img src={`http://localhost:8000/uploads/${entry.image}`} alt="Entry Image" style={{ maxWidth: '100%', height: 'auto' }} />}
          <p>Shared by: {entry.sharedBy}</p>
          <div className= 'buttons-container'>
            
            Entry Date: {new Date(entry.date).toLocaleDateString()}
            
          </div>
        </div>
      ))}

      </ul>
    </div>
  );
};

export default SharedEntries;
