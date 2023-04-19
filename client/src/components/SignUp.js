import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

const SignUpForm=() =>{
    
  
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  
  const history=useNavigate();

  async function submit(e){
    e.preventDefault();

    try{

      await axios.post("http://localhost:8000/signup",{
        email,password
      })
      .then(res=>{
        if(res.data=="exist"){
          alert("User already exists")
        }
        else if(res.data=="notexist"){
          history("/home",{state:{id:email}})
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
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </form>

          

            

    </div>
  )
}

export default SignUpForm;