// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://User:Password@projectcluster.rhnl8pu.mongodb.net/Journal")
.then(()=>{
    console.log("MongoDB Connected");
})
.catch(()=>{
    console.log('Connection Failed');
})


const newSchema=new mongoose.Schema({
    username:{
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