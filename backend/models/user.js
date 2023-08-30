//Import mongoose module
const mongoose = require("mongoose");

//import mongoose unique validator module
const uniqueValidator = require("mongoose-unique-validator");

//Create match Schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    pwd: String,
    tel: Number,
    role:String,
    avatar:String,

});
userSchema.plugin(uniqueValidator);

//Affect Model Name To Schema
const user = mongoose.model("User", userSchema);

//Export match
module.exports = user;

