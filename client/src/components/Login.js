import "./Styles.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';



const LoginForm =({loginUser})=> {

  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null); // Initialize user state to null

  const navigate=useNavigate();

  async function submit(e){
    e.preventDefault();

    try{

      const response = await axios.post("http://localhost:8000/",{
        username,password
      })
      
      .then(res=>{
        if(res.data=="exist"){
          loginUser(username);
          setUser({ id: username }); // Set user state to the logged-in user
          navigate("/home");
        }
        else if(res.data=="does not exist"){
          setErrorMessage("Username or Password is incorrect")
        }
      })
      .catch(e=>{
        setErrorMessage('There was a problem logging in. Please try again later.');
        console.error(e);
      })
      console.log('Response:', response.data);
    }
    catch(e){
      console.log(e);

    }

  }


  return (
    <div className="login">

      <h1>Jurnal</h1>
      <div className="center-box">
        <form action="POST">
          <h2>Login</h2>
          <label htmlFor="username"><FontAwesomeIcon icon={faUser} className="user-icon" /></label>
          
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
          <label htmlFor="password"><FontAwesomeIcon icon={faLock} className="user-icon" /></label>
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
          <br />
          {errorMessage && <div className="error">{errorMessage}</div>}
          <input type="submit" onClick={submit} />
          <p>
            Don't have an account? <Link to="/SignUp">Sign Up</Link>
          </p>
        </form>  
      </div>
      

    </div>
  )
}

export default LoginForm;