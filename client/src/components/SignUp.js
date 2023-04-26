import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios";

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
      })
      .then(res=>{
        if(res.data=="exist"){
          setErrorMessage("User already exists")
        }
        else if(res.data.status==201){
          signupUser(username)
          setUser({id: username}); // set user state to the username
          history("/home")
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

    <h1>Signup</h1>
    

    <form action="POST">
      <label htmlFor="username">Username:</label>
        <input
          type="username"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        />
        <br />
        {errorMessage && <div className="error">{errorMessage}</div>}        
        <input type="submit" onClick={submit} />
        <p>
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </form>

          

            

    </div>
  )
}

export default SignUpForm;