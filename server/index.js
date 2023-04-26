// Import required modules
const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const crypto = require("crypto");

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
        const check=await collection.findOne({
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
        const check=await collection.findOne({username:username})

        if(check){
            res.json("exist")
        }
        else{
            await collection.insertMany([data])
            res.status(201).send("User created successfully");
            
        }

    }
    catch(e){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

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



module.exports = app;