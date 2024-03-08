const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const Shop = require("./ShopModel");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    visited: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }]
})

const UserModel = mongoose.model("User", UserSchema, "user_signin")
module.exports = UserModel;