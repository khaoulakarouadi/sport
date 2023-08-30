//Import mongoose module
const mongoose = require("mongoose");

//Create match Schema
const imcSchema = mongoose.Schema({
    name: String,
    taille: Number,
    poids: Number,
});

//Affect Model Name To Schema
const imc = mongoose.model("Imc", imcSchema);

//Export match
module.exports = imc;

