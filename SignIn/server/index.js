const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./UserModel")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/database");

app.post('/login', (req,res)=>{
    const {email,password} = req.body;
    // Find corresponding user object associated with email
    UserModel.findOne({email:email})
    .then(user=>{
        if (user){ // Once a user is found
            if (user.password === password){ // Check that passwords align
                res.json("Correct user and password.")
            } else {
                res.json("Password is wrong.")
            }
        } else { // Otherwise user does not exist
            res.json("No user exists with that email.")
        }
    })
})

// app.post("/signup", (req, res) => {
//     UserModel.create(req.body)
//     .then(user => res.json(user))
//     .catch(err => res.json(err))
// })
app.post('/signup',(req,res)=>{
    const {name,email,password} = req.body;
    // Check if name, email, and password fields are not empty
    if (!name || !email || !password) {
        res.json("Name, email, and password are required");
    } else {
         // Check if an account already exists with the provided email
        UserModel.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                res.json("An account already exists with that email.")
            } else {
                // Make a new document based on data from body of request and schema defined earlier.
                UserModel.create(req.body)
                // If the document creation is successful, line sends a JSON back to client with new document.
                .then(user => res.json(user))
            }
    })
    .catch(err => res.json(err))
    }
})

app.listen(3001, () => {
    console.log("server is running")
})