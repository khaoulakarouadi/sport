//Import mongoose module
const mongoose = require("mongoose");

//Create match Schema
const matchSchema = mongoose.Schema({
    scoreOne: Number,
    scoreTwo: Number,
    teamOne: String,
    teamTwo: String,
});

//Affect Model Name To Schema
const match = mongoose.model("Match", matchSchema);

//Export match
module.exports = match;

