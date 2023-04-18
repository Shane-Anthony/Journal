import React, { useState } from "react";
import { Link } from 'react-router-dom';


const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
        const response = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });
  
        if (response.ok) {
          // Handle successful sign-up
          console.log("Sign up successful!");
        } else {
          // Handle sign-up error
          const errorData = await response.json();
          setError(errorData.message || "Failed to sign up. Please try again later.");
        }
      } catch (error) {
        // Handle network error
        setError("Failed to connect to server. Please try again later.");
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
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignupForm;
