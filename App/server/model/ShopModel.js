const mongoose = require("mongoose")
const Review = require("./ReviewModel");
const Schema = mongoose.Schema
const shopSchema = new mongoose.Schema(
    {
        name : {type: String, required: true},
        location: {
            address: {type: String, required: true},
            coordinates: {type: Array, required: true} 
        },
        averageRating: {type: Number},
        numRatings: {type: Number},
        cost: {type: Number},
        bathrooms: {type: String},
        wifi: {type: String},
        noise: {type: String},
        studyability: {type:String},
        ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
        imgurl: {type: String}
    }
)

module.exports = mongoose.model("Shop", shopSchema, "coffee_shops")
