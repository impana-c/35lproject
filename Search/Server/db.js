const mongoose = require("mongoose")

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connect Mongo successfully")
    } catch (error) {
        console.log("Connect fail")
    }
}

module.exports = connectMongoDB