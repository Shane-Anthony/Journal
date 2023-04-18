import React, { useState } from "react";
import { Link, useNavigate} from 'react-router-dom';
import axios from "axios";


const SignupForm = () => {
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
        await axios.post("http://localhost:8000/signup",{
          email,password
        })
        .then(res=>{
          if (res.data="exist"){
            alert("User already exists")
            
            
          }
          else if(res.data="not exist"){
            alert("User does not exist")
            history("/home", {state:{id:username}})
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
      <h1>Sign Up</h1>
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
        <input type="submit" value="Sign Up" />
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignupForm;
