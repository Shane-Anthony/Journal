// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://User:Password@projectcluster.4jmjeu1.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("MongoDB Connected");
})
.catch(()=>{
    console.log('Connection Failed');
})


const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("Users",newSchema)

module.exports=collection;