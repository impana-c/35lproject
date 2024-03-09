const mongoose = require('mongoose')
const ReviewSchema = new mongoose.Schema({
  // shop: {
  //   type: Schema.Types.ObjectId,
  //  // ref: 'Shop', // Reference to the Shop model
  //   required: true
  // },//
    username: String,
    coffeeShopName: String,
    rating: Number,
    review: String,
  });
  
  
  const Review = mongoose.model('Review', ReviewSchema);

module.exports = mongoose.model('Review', ReviewSchema);