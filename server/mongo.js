// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



// Define schema for users
const userSchema = new mongoose.Schema({
    username:{
      type:String,
      required:true,
      unique:true
    },
    password:{
      type:String,
      required:true
    },
    journalEntries: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JournalEntry'
    }]
  });

// Define schema for journal entries
const journalSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });

const user = mongoose.model('User', userSchema);
const journalEntry = mongoose.model('JournalEntry', journalSchema);

module.exports = { user, journalEntry };