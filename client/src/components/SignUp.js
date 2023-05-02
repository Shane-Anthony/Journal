import React, { useState } from "react"
import { useNavigate, Link, History } from "react-router-dom"
import axios from "axios";
import ("./Styles.css")


const SignUpForm=({signupUser}) =>{
    
  
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  
  const history=useNavigate();

  async function submit(e){
    e.preventDefault();

    // Check if password meets minimum requirements
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialRegex = /[\W_]/;

    if (password.length < 8 || !uppercaseRegex.test(password) || !lowercaseRegex.test(password) || !specialRegex.test(password)) {
      setErrorMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try{

      await axios.post("http://localhost:8000/signup",{
        username,password
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res=>{
        if(res.data=="exist"){
          setErrorMessage("User already exists")
        }
        else if(res.status==201){
          console.log("Response: ",res)
          signupUser(username)
          console.log("set user")
          setUser({id: username}); // set user state to the username
          console.log("navigate home")
          history("/home")
          console.log("after")
        }
      })
      .catch(e=>{
        alert("wrong details")
          console.log(e);
      })

    }
    catch(e){
      setErrorMessage('There was a problem signing up. Please try again later.');
      console.error(e);
    }

  }
  return (
    <div className="Signup">

    <h1 className="app-title">Jurnal</h1>
    <div className="center-box">
    <form action="POST">
      <h2>Signup</h2>
      <label htmlFor="username"></label>
        <input
          type="username"
          id="username"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label htmlFor="confirmPassword"></label>
        <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        />
        <br />
        <br />
        {errorMessage && <div className="error">{errorMessage}</div>}        
        <input type="submit" onClick={submit} />
        <p>
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </form>
  
    </div>      

    </div>
  )
}

export default SignUpForm;