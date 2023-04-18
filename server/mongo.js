// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set up Express app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://User:Password@projectcluster.4jmjeu1.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
  console.log("mongodb connected");
})
.catch(()=>{
  console.log("failed");
})

const newSchema= new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
})
const collection = mongoose.model("User", newSchema)

module.exports=collection