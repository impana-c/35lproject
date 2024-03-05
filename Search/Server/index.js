const express = require("express")
const cors = require("cors")

const connectMongoDB = require('./db.js')

const app = express()

require("dotenv").config()

app.use(cors())

connectMongoDB()

app.use(express.json())

const Shop = require("./model/shop_model.js")

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

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log("Server is running PORT", PORT)
})