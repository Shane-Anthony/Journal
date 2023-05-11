import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SignUp from './components/SignUp.js';
import Login from './components/Login.js';
import Home from './components/Home.js';
import Settings from './components/Settings.js';
import SharedEntries from './components/SharedEntries.js';
import AboutPage from './components/About.js';
import Contacts from './components/Contacts.js'
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
        <Route path="/create-entry" element={<Home user={user} setUser={setUser} />} />
        <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
        <Route path="/shared-entries" element={<SharedEntries user={user} setUser={setUser} />} />
        <Route path="/about" element={<AboutPage user={user} setUser={setUser} />} />
        <Route path='/contacts'element={<Contacts user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root')); // Render the App component to the root element in the DOM

export default App;