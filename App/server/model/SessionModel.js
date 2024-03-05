const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({
    token: String,
    email: String
})

const SessionModel = mongoose.model("Session", SessionSchema, "sessions")
module.exports = SessionModel;