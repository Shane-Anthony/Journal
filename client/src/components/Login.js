import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const history = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Form validation
    if (!username || !email || !password) {
      setError("Please fill in all the fields.");
      return;
    }

    // Validate email format using regular expression
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!email.match(emailPattern)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password strength
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password.match(passwordPattern)) {
      setError("Password must be at least 8 characters long, contain at least one letter and one number.");
      return;
    }

  
      // Perform sign-up logic here, e.g. send form data to backend API
      try {
        await axios.post("http://localhost:8000/",{
          email,password
        })
        .then(res=>{
          if (res.data="exist"){
            history("/home", {state:{id:username}})
            
          }
          else if(res.data="not exist"){
            alert("User does not exist")
            
          }
        })
        .catch(e=>{
          alert("wrong details")
          console.log(e);
  
        })
        
      } catch (e) {
        // Handle network error
        console.log(e);
      }
    };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <input type="submit" value="Log in" />
        <p>
          Don't have an account? <Link to="/SignUp">Sign Up</Link>
        </p>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;
