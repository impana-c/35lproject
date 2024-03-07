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


const ReviewSchema = new mongoose.Schema({
  coffeeShopName: String,
  rating: Number,
  review: String,
});


const Review = mongoose.model('Review', ReviewSchema);


app.post('/reviews', async (req, res) => {
  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();
    res.status(201).send(savedReview);
  } catch (err) {
    res.status(400).send(err);
  }
});

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
