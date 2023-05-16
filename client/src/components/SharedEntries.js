import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const SharedEntries = ({ user, setUser }) => {
  const [entries, setEntries] = useState([]);

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

  return (
    <div className='main-content'>
      <Sidebar />
      <h1 className='title'>Shared Entries</h1>
      <button className="refreshButton" onClick={handleRefresh}>
          <i className="fas fa-sync-alt"></i>  
        </button>
      <br />
      <br />
      <ul>
      {entries.map((entry) => (
        <div className='entryBox' key={entry._id}>
          <h3>{entry.title}</h3>
          <p>{entry.body}</p>
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
