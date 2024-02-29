const PORT = 3001;
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./UserModel")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/database");

app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

app.get('/profile', async (req, res) => {
    try {
      const { email } = req.query;
      const user = await UserModel.findOne({ email: email });
      res.json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

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

app.post('/signup',(req,res)=>{
    const {name,email,password,password2} = req.body;
    // Check if name, email, and password fields are not empty
    if (!name || !email || !password || !password2) {
        res.json("Name, email, and password are required");
    } else if (password != password2) {
        res.json("Passwords do not match.");
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

app.post('/updateprofile',(req,res)=>{
    const {name,email,passwordOld,passwordNew,userEmail} = req.body;
    //console.log(req.body)
    if (name==="" && email==="" && passwordOld==="" && passwordNew===""){
        console.log("No changes need to be made.")
        res.json("No changes need to be made.")
    } else {
        UserModel.findOne({email:userEmail})
        .then(user=>{
            if (user){ // Once a user is found
                if (passwordOld === "" && passwordNew === "" ){ 
                    UserModel.findOneAndUpdate(
                        { email: userEmail },
                        { 
                            $set: { 
                                ...(name && { name }),  
                                ...(email && { email }),
                            }
                        },
                        { new: true }
                    )
                    .then(updatedUser => {
                        res.json(updatedUser);
                        console.log("Update successful.")
                    })
                    .catch(err => res.json(err))
                } else if (passwordOld === "" && user.password != "" && passwordNew != "" ){ 
                    res.json("Enter old password first.")
                } else if (user.password != passwordOld){ 
                    res.json("Passwords do not match.")
                } else if (user.password === passwordNew){ 
                    res.json("New password = current password.")
                } else {
                    UserModel.findOneAndUpdate(
                        { email: userEmail },
                        { 
                            $set: { 
                                ...(name && { name }),  
                                ...(email && { email }),
                                ...(passwordNew && { password: passwordNew }),
                            }
                        },
                        { new: true }
                    )
                    .then(updatedUser => {
                        res.json(updatedUser);
                        console.log("Update successful.")
                    })
                    .catch(err => res.json(err))
                }
            } 
        })
        .catch(err => res.json(err))
    }
})

app.listen(PORT, () => {
    console.log("server is running")
})
