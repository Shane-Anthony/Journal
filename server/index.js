// Import required modules
const express = require("express")
const mongoose = require('mongoose');
const cors = require("cors")
const crypto = require("crypto");
const { user } = require('./mongo');


mongoose.connect("mongodb+srv://User:Password@projectcluster.rhnl8pu.mongodb.net/Journal")
.then(()=>{
    console.log("MongoDB Connected");
})
.catch(()=>{
    console.log('Connection Failed');
})

// Set up Express app
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


// Handle GET requests to root URL
app.get("/",cors(),(req,res)=>{
    res.status(200).json({ message: "OK" });
})

// Handle POST requests to root URL for authentication
app.post("/",async(req,res)=>{
    const{username,password}=req.body

    try{
        const check=await user.findOne({
            username:username , 
            password: crypto.createHash("sha256").update(password).digest("hex")
        });

        if(check){
            res.status(200).json("exist");
        }
        else{
            res.json("does not exist")
        }

    }
    catch(e){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})


// Handle POST requests to "/signup" URL for creating new users
app.post("/signup",async(req,res)=>{
    const{username,password}=req.body

    const data={
        username:username,
        password: crypto.createHash("sha256").update(password).digest("hex")
    };

    try{
        const check=await user.findOne({username:username})

        if(check){
            res.json("exist")
        }
        else{
            await user.insertMany([data])
            res.status(201).send("User created successfully");
            console.log(res.statusCode)
            
        }

    }
    catch(e){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

app.post('/create-entry', async (req, res) => {
  try {
    const { title, body, username } = req.body;
    const sharedBy = await user.findOne({ username });

    if (!sharedBy) {
      // Return an error response if the username is not found
      return res.status(404).json({ message: 'User not found' });
    }

    const newEntry = {
      title,
      body,
      sharedBy: sharedBy.username // use the user's username directly
    };

    const userDoc = await user.findOneAndUpdate(
      { username },
      { $push: { journalEntries: newEntry } },
      { new: true } // return the updated user object
    )

    res.status(201).json(userDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/contacts', async (req, res) => {
  try {
    console.log('Received POST request at /contacts');
    console.log('Request body:', req.body);

    const { name, contact, username } = req.body;

    // Create a new contact object
    const newContact = {
      name: name,
      contact: contact,
    };

    // Find the user by their username and update the contacts array
    const updatedUser = await user.findOneAndUpdate(
      { username },
      { $push: { contacts: newContact } },
      { new: true } // Return the updated user object
    );
    console.log('Updated User:', updatedUser);
    res.status(201).json(updatedUser); // Send the updated user object as the response
  } catch (error) {
    res.status(500).json({ error: 'Failed to add contact.' }); // Handle any error that occurred
  }
});

app.get('/contacts/:userId', async (req, res) => {
  const userId = req.params.userId
  try {
    console.log('recieved get request')
    // Find the user by their username and retrieve their contacts
    const userDoc = await user.findOne({ username : userId});

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const contacts = user.contacts;
    res.status(200).json(userDoc.contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve contacts.' });
  }
});


app.post('/share-entry/:username/:entryId/:shareUsername', async (req, res) => {
  try {
    const { entryId} = req.params; // Retrieve entryId and userId from URL parameters
    const { username } = req.params;// Retrieve currentUser from URL parameters
    const { shareUsername} = req.params; 
    const userDoc = await user.findOne({username:username});
    console.log('currentUser:', userDoc);
    console.log('Sharing with:', shareUsername);

    // Check if the current user has access to the journal entry
    if (!userDoc.journalEntries || !userDoc.journalEntries.length) {
      return res.status(404).json({ message: 'Journal entries not found' });
    }
    const entryToShare = userDoc.journalEntries.find(entry => entry.id === entryId);
    console.log('entryToShare:', entryToShare);
    if (!entryToShare) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    // Check if the user to share with exists
    const userToShareWith = await user.findOne({username: shareUsername});
    //console.log('userToShareWith:', userToShareWith);
    if (!userToShareWith) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user to share with is the current user
    if (userToShareWith.id === userDoc.id) {
      return res.status(400).json({ message: 'Cannot share with yourself' });
    }

    // Check if the entry is already shared with the user
    if (entryToShare.sharedWith.includes(userToShareWith.id)) {
      return res.status(400).json({ message: 'Entry is already shared with this user' });
    }

    // Add the user to share with to the entry's sharedWith array
    entryToShare.sharedWith.push(userToShareWith.id);
    await userDoc.save();

    res.status(200).json({ message: 'Entry shared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

  
// Handle GET requests to retrieve shared entries for a user
app.get('/shared-entries/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log(`Retrieving shared entries for user: ${userId}`);
    try {
        // Find the user in the database
        const userDoc = await user.findOne({ username: userId });
        if (!userDoc) {
            console.log(`User ${userId} not found`);
            return res.status(404).json({ message: 'User not found' });
        }

        // Find all entries that have been shared with this user
        const sharedEntries = [];

        // Loop through all users in the database
        const allUsers = await user.find({});
        for (let i = 0; i < allUsers.length; i++) {
            const currentUser = allUsers[i];
            if (currentUser.username === userId) {
                // Skip if this is the user we're retrieving shared entries for
                continue;
            }

            // Loop through all the journal entries of the current user
            const entries = currentUser.journalEntries;
            for (let j = 0; j < entries.length; j++) {
                const entry = entries[j];
                const sharedWith = entry.sharedWith.map(obj => obj.toString()); // Convert ObjectId to string for comparison
                console.log(`Entry ${entry._id} is shared with users: ${sharedWith}`);
                if (sharedWith.includes(userDoc._id.toString())) {
                    console.log(`Adding entry ${entry._id} to shared entries`);
                    
                    sharedEntries.push(entry);
                }
            }
        }

        console.log(`Shared entries for user ${userId}: ${sharedEntries}`);
        res.status(200).json(sharedEntries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


  
  
  
  

app.get('/home/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const userDoc = await user.findOne({ username: userId });
        res.status(200).json(userDoc.journalEntries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        }
});
  

app.delete('/delete-entry/:userId/:entryId', async (req, res) => {
    const { userId, entryId } = req.params;
    const username = userId;
    try {
      console.log(`Deleting entry ${entryId} for user ${username}`);
      const userDoc = await user.findOneAndUpdate(
        { username },
        { $pull: { journalEntries: { _id: entryId } } },
        { new: true }
      );
  
      console.log(`UserDoc: ${userDoc}`);
      if (!userDoc) {
        console.log(`User ${username} not found`);
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log(`Journal entry ${entryId} deleted successfully`);
      res.status(200).json({ message: 'Journal entry deleted successfully' });
      console.log(`Response status code: ${res.statusCode}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  
  
  




// Handle 404 errors
app.use(function(req, res, next) {
    res.status(404).json({ error: "Not found" });
});

// Handle authentication errors
app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: "Unauthorized" });
    }
});

// Handle server errors
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});


app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

module.exports = app;