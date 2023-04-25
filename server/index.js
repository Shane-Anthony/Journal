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



app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const{username,password}=req.body

    try{
        const check=await collection.findOne({
            username:username , 
            password: crypto.createHash("sha256").update(password).digest("hex")
        });

        if(check){
            res.json("exist")
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
            res.json("does not exist")

            await collection.insertMany([data])
            
        }

    }
    catch(e){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

app.listen(8000,()=>{
    console.log("Port is running on 8000");
})
