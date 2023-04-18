// Import required modules
const express = require('express');
const collection = require("./mongo")
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongodb');

// Set up Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(),(req,res)=>{

})

app.post("/",async(req,res)=>{
  const{username,email,password} = req.body
  try{
    const check= await collection.findOne({email:email})

    if(check){
      res.json("exist")
    }
    else{
      res.json("not exist")
    }
  }
  catch(e){
    res.json("not exist")
  }
})

app.post("/signup",async(req,res)=>{
  const{username,email,password} = req.body

  const data={
    username:username,
    email:email,
    password:password

  }

  try{
    const check= await collection.findOne({email:email})

    if(check){
      res.json("exist")
    }
    else{
      res.json("not exist")

      await collection.insertMany([data])
    }
  }
  catch(e){
    res.json("not exist")
  }
})

app.listen(8000, ()=>{
  console.log("Port is running on 8000")
})
