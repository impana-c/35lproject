const express = require("express")
const cors = require("cors")

const connectMongoDB = require('./db.js')

const app = express()

require("dotenv").config()

app.use(cors())

connectMongoDB()

app.use(express.json())

const Shop = require("./model/book_model")

app.get('/api/v1/books', async (req,res) => {
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

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running PORT", PORT)
})