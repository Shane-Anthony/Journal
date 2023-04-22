import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

const SignUpForm=() =>{
    
  
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  
  const history=useNavigate();

  async function submit(e){
    e.preventDefault();

    try{

      await axios.post("http://localhost:8000/signup",{
        username,password
      })
      .then(res=>{
        if(res.data=="exist"){
          alert("User already exists")
        }
        else if(res.data=="does not exist"){
          history("/home",{state:{id:username}})
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
        <input type="submit" onClick={submit} />
        <p>
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </form>

          

            

    </div>
  )
}

export default SignUpForm;