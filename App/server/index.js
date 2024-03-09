const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./model/UserModel.js")
const Shop = require("./model/ShopModel.js")
const Session = require("./model/SessionModel.js")
const Review = require("./model/ReviewModel.js");

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/database");

app.get('/', (req, res) => {
    res.send('Hello from our server!')
})

app.get('/profile', async (req, res) => {
    try {
      const { token } = req.query;
      const session = await Session.findOne({ token: token });
      const user = await UserModel.findOne({ email: session.email });
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

app.post('/startsession', (req,res)=>{
    const {token,email} = req.body;
    Session.create(req.body)
})

app.post('/endsession', (req, res) => {
    const { token } = req.body;
    Session.deleteOne({ token: token })
        .then(result => {})
        .catch(error => {
            console.error('Error ending session:', error);
            res.status(500).json({ error: 'Internal server error.' });
        });
});


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

app.get('/all', async (req,res) => {
    try {
        const data = await Shop.find()
        res.json({
            data
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/api/v1/name', async (req,res) => {
    try {
        const {key, page, limit} = req.query
        //const skip = (page - 1) * limit
        const search = key ? {
            "$or": [
                {name: {$regex: key, $options: "i"}}
            ]
        } : {}
        const data = await Shop.find(search).limit(limit)
        res.json({
            data
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/ratings', async (req,res) => {
    try {
        const {num} = req.query
        const filter = {
            averageRating: { $gt: num }
        } 
        const data = await Shop.find(filter)
        res.json({
            data
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/numRatings', async (req,res) => {
    try {
        const {num} = req.query
        const filter = {
            numRatings: { $gt: num }
        } 
        const data = await Shop.find(filter)
        res.json({
            data
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/location', async (req,res) => {
    try {
        const {num} = req.query
        const filter = {
            numRatings: { $gt: num }
        } 
        const data = await Shop.find(filter)
        res.json({
            data
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/searchresult', async (req, res) => {
    try {
      const { name } = req.query;
      const shop = await Shop.findOne({ name: name });
      res.json({ shop });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/reviews', async (req, res) => {
    const { coffeeShopName, rating, review } = req.body; // Assuming these fields are sent in the request body
    Review.create(req.body)
  });

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log("Server is running PORT", PORT)
})