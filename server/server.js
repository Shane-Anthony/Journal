// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Set up Express app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
const uri = 'mongodb+srv://User:Password@projectcluster.4jmjeu1.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
  console.log('Connected to MongoDB');

  // Define User schema
  const userSchema = {
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
  };

  // Create User collection
  const userCollection = client.db().collection('Users');

  // Handle sign-up request
  app.post('/signup', async (req, res) => {
    try {
      // Extract form data from request body
      const { username, email, password } = req.body;

      // Server-side validation
      // ...

      // Insert a new user
      await userCollection.insertOne({ username, email, password });

      // Send success response
      res.status(201).json({ message: 'Sign up successful!' });
    } catch (err) {
      // Handle errors
      console.error('Failed to sign up', err);
      res.status(500).json({ message: 'Failed to sign up. Please try again later.' });
    }
  });

  // Start server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
