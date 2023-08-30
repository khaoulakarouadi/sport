//Import mongoose module
const mongoose = require("mongoose");

//Create match Schema
const playerSchema = mongoose.Schema({
    name: String,
    age: Number,
    position: String,

});

//Affect Model Name To Schema
const player = mongoose.model("Player", playerSchema);

//Export match
module.exports = player;

