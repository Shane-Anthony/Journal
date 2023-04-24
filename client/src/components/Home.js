import React, {useState} from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Home = ({user, setUser}) => {

  if (user !== null) {
    return (
      <div>
        <h1>Welcome, {user.id}!</h1>
        <button onClick={() => setUser(null)}>Log out</button>
      </div>
    );
  }


 // render something else if user is not logged in
  return (
    <div>
      <h1>You need to log in first</h1>
    </div>
  );
};

export default Home;