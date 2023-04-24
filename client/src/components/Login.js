import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginForm =({loginUser})=> {

  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
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
          alert("Username or Password is incorrect")
        }
      })
      .catch(e=>{
        alert("Wrong Details")
        console.log(e);
      })

    }
    catch(e){
      console.log(e);

    }

  }


  return (
    <div className="login">

      <h1>Login</h1>

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
        <input type="submit" onClick={submit} />
        <p>
          Don't have an account? <Link to="/SignUp">Sign Up</Link>
        </p>
      </form>

    </div>
  )
}

export default LoginForm;