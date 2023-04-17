import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './components/SignUp.js';
import Login from './components/Login.js';
import Page1 from './components/Page1.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Page1 />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root')); // Render the App component to the root element in the DOM

export default App;
