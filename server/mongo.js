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
        date: {
          type: Date,
          default: Date.now,
        },
        sharedWith: {
          type: [mongoose.Schema.Types.ObjectId],
          ref: 'User',
        },
      },
    ],
  });

const user = mongoose.model('User', userSchema);


module.exports = { user};