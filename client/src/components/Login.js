import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginForm =()=> {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const history=useNavigate();

  async function submit(e){
    e.preventDefault();

    try{

      await axios.post("http://localhost:8000/",{
        email,password
      })
      .then(res=>{
        if(res.data=="exist"){
          history("/home",{state:{id:email}})
        }
        else if(res.data=="notexist"){
          alert("User have not sign up")
        }
      })
      .catch(e=>{
        alert("wrong details")
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
        <input type="submit" onClick={submit} />
        <p>
          Don't have an account? <Link to="/SignUp">Sign Up</Link>
        </p>
      </form>

            

            

    </div>
  )
}

export default LoginForm;