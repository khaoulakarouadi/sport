//Import mongoose module
const mongoose = require("mongoose");

//Create match Schema
const teamSchema = mongoose.Schema({
    name: String,
    owner: String,
    stadium: String,

});

//Affect Model Name To Schema
const team = mongoose.model("Team", teamSchema);

//Export match
module.exports = team;

