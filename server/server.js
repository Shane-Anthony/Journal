// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

// Set up Express app
const app = express();
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect('mongodb+srv://User:Password@projectcluster.4jmjeu1.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Define User schema
const userSchema = new mongoose.Schema({
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
});

// Define User model
const User = mongoose.model('User', userSchema, 'Users');
// Example usage of User model
const newUser = new User({ username: 'john_doe', email: 'john@example.com', password: 'mypassword' });

// Handle sign-up request
app.post('/signup', async (req, res) => {
  try {
    // Extract form data from request body
    const { username, email, password } = req.body;

    // Server-side validation
    // ...

    // Create a new user
    const newUser = new User({ username, email, password });

    // Store user information in the database
    await newUser.save();

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