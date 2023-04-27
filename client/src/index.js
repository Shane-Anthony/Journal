import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SignUp from './components/SignUp.js';
import Login from './components/Login.js';
import Home from './components/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(null);

  const loginUser = (username) => {
    setUser({ id: username });
  };

  const signupUser = (username) => {
    setUser({ id: username });
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login user={user} loginUser={loginUser} />} />
        <Route path="/signup" element={<SignUp user={user} signupUser={signupUser}/>} />
        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root')); // Render the App component to the root element in the DOM

export default App;