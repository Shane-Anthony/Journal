// Import required modules
const express = require("express")
const mongoose = require('mongoose');
const collection = require("./mongo")
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
    const userDoc = await user.findOneAndUpdate(
      { username },
      { $push: { journalEntries: { title, body } } },
      { new: true } // return the updated user object
    );

    res.status(201).json(user);
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