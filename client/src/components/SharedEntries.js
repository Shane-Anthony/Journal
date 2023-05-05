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
      <h1>Shared Entries</h1>
      <button onClick={handleRefresh}>Refresh</button>
      <ul>
        {entries.map((entry) => (
          <div className='entryBox' key={entry._id}>
            <h3>{entry.title}</h3>
            <p>{entry.body}</p>
            <p>Shared with:</p>
            <ul>
              {entry.sharedWith.map((user) => (
                <li key={user._id}>{user.username}</li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SharedEntries;
