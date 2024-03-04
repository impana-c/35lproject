const mongoose = require("mongoose")

const Schema = mongoose.Schema
const authorSchema = new Schema({
    name: {type: String, required: true},
    year: {type: Number}
}, {
    timestamps: true
})

const authorModel = mongoose.model("Author", authorSchema)

const bookSchema = new Schema({
    name: {type: String, required: true},
    year: {type: Number},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        refL: "Author"
    },
    description: {type: String},
    pages: {type: Number},
    size: {type: String},
    price: {type: Number, require: true},
    discount: {type: Number, default: 0},
    imageUrl: {type: String, require: true},
    publicId: {type: String}
}, {
    timestamps: true
})

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
        ratings: {type: Array}
    }
)

//module.exports = mongoose.model("Book", bookSchema)
module.exports = mongoose.model("Shop", shopSchema, "coffee_shops")
