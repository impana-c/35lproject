const Review = require("./models/ReviewModel.js")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/database")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));





  app.post('/reviews', async (req, res) => {
    const { coffeeShopName, rating, review } = req.body; // Assuming these fields are sent in the request body
    Review.create(req.body)
  });

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
