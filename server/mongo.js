// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



// Define schema for users
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    journalEntries: [
      {
        title: {
          type: String,
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
        image: {
          type: String, // store the image URL as a string
          required: false,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        sharedBy:{
          type: String,
          required: true
        },
        sharedWith: {
          type: [mongoose.Schema.Types.ObjectId],
          ref: 'User',
        },
      },
    ],
    contacts:[
      {
        name: {
          type: String,
          required: true,
        },
        contact:{
          type: String,
          required: true,
        }
      }
    ]
  });

const user = mongoose.model('User', userSchema);


module.exports = { user};