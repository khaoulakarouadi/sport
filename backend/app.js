// import express module
const express = require("express");

//import body-parser module
const bodyParser = require("body-parser");

//import bcrypt module
const bcrypt = require("bcrypt");

//import multer module
const multer = require("multer");
//import path module 
const path = require("path");




//import mongoose module
const mongoose = require("mongoose");
//import axios module
const axios = require("axios");
// import jsonwebtoken module
const jwt = require("jsonwebtoken");
// import epress-session module
const session = require("express-session");

//Connect Express Application with DB
mongoose.connect("mongodb://127.0.0.1:27017/sportDB")

//create express application
const app = express();

//Configuration to Send JSON responses
app.use(bodyParser.json());
//Get objects from Request
app.use(bodyParser.urlencoded({ extended: true }));

//Security Configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});


const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
//configuration multer
const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});
// configuration du path
app.use('/images', express.static(path.join('backend/images')));

//configuration jwt

const secretKey = "Croco2023Venus";
app.use(session({
    secret: secretKey,
}));

//Models Importation
const MatchModel = require("./models/match");
const PlayerModel = require("./models/player");
const TeamModel = require("./models/team");
const ImcModel = require("./models/imc");
const User = require("./models/user");
const { $ } = require("protractor");


// DB simulation 
let matchesTab = [
    { id: 1, scoreOne: 3, scoreTwo: 2, teamOne: "FCB", teamTwo: "juv" },
    { id: 2, scoreOne: 0, scoreTwo: 1, teamOne: "RM", teamTwo: "ATM" },
    { id: 3, scoreOne: 2, scoreTwo: 2, teamOne: "SEV", teamTwo: "juv" },
    { id: 5, scoreOne: 2, scoreTwo: 2, teamOne: "SEV", teamTwo: "juv" },
];

let teamsTab = [
    { id: 1, name: "ba9lewa", owner: "ali", stadium: "rades" },
    { id: 2, name: "EST", owner: "med", stadium: "mestir" },
    { id: 3, name: "CA", owner: "walid", stadium: "falouja" },

];

let playersTab = [
    { id: 1, name: "ahmed", age: 22, position: "midfilder" },
    { id: 2, name: "taha", age: 24, position: "goalkeeper" },
    { id: 3, name: "yassine", age: 26, position: "defender" },
    { id: 4, name: "abdo", age: 20, position: "attackant" },
];

let stadiumsTab = [
    { id: 1, name: "rades", capacity: 60000, country: "tun" },
    { id: 2, name: "bardo", capacity: 30000, country: "tunis" },
    { id: 3, name: "menzah", capacity: 25000, country: "tunisia" },
    { id: 4, name: "mestir", capacity: 10000, country: "tounes" },
];


function generateId(t) {

    if (t.length == 0) {
        return 0;
    }
    else {
        var max = t[0].id;
        for (let i = 1; i < t.length; i++) {
            if (t[i].id > max) {
                max = t[i].id;
            }

        }
        return max + 1;
    }
}



//Business Logic
// Business logic : Get All Matches 
app.get("/matches", (req, res) => {
    //traitement de la req
    console.log("Here into BL : Get AllMatches")
    MatchModel.find().then((data) => {   //find fel mongoose traja3 1 ou plus 3adi moch kif mt3 js traja3 obj wala elem wehed
        res.json({ matches: data });
    })

});


// Business logic : Get  Matche By ID
app.get("/matches/:id", (req, res) => {
    // console.log("here into BL : Get Match BY ID")
    let id = req.params.id; //idetecti le parametre :id fel path 
    // console.log("here id", id);

    MatchModel.findOne({ _id: id }).then((data) => {
        res.json({ match: data })
    })



    // let findedMatch = matchesTab.find((elt) => {     //elt ya3ni element
    //     return elt.id == id;
    // })


    // console.log("here finded match", findedMatch);
    //hedhi najmou nrodouha 
    // if (findedMatch) {
    //     res.json({ matches: findedMatch });
    // } else {
    //     res.json({ msg: "Not Found" })
    // }

    // findedMatch
    //     ?
    // res.json({ match: findedMatch }) 
    //     res.json({ msg: "not found" });
});


// Business logic : Delete Match by ID
app.delete("/matches/:id", (req, res) => {
    //traitement de la req
    let id = req.params.id;
    MatchModel.deleteOne({ _id: id }).then((data) => {
        console.log("here date after delete", data);
        (data.deletedCount == 1) ?  //deleteCount todhher fel console backend ne5dem aliha heya
            res.json({ msg: "deleted with success" }) :
            res.json({ msg: "NO delete" });
    })


    // isDeleted = false;
    // for (let i = 0; i < matchesTab.length; i++) {
    //     if (matchesTab[i].id == id) {
    //         matchesTab.splice(i, 1);
    //         isDeleted = true;
    //         break;
    //     }

    // }
    // isDeleted
    //     ?
    //     res.json({ msg: "Deleted With Success" }) :
    //     res.json({ msg: "Not Found" });

});

// Business logic : Add match
app.post("/matches", (req, res) => {
    console.log("Here Is Add Match", req.body);
    //Firstly récupération de l'object 
    // let match = req.body; --> bech tetbadel maa mongoose
    let matchObj = new MatchModel(req.body); // 3ibara 9otlou ya req body bech n5alik moutataba9 avec l MatchModel mte3i (aka schema)
    matchObj.save((err, doc) => {
        console.log("here err", err);
        console.log("here doc", doc);
        err
            ?
            res.json({ msg: "error" }) :
            res.json({ msg: "added with success" });
    }); // .save() méthode prédéfinie teb3a mongoose tsajel el tableau t3rf wahadha auto eli heya tetsajel fel collection matches

    // affectation d'un ID à l'object
    // match.id = generateId(matchesTab); --> mongoose ya3melha auto
    //Push object
    // matchesTab.push(match); --> mongoose ya3melha auto
    //send response
    // res.json({ msg: "Added With Success" })
});

// Business logic : Edit match
app.put("/matches", (req, res) => {
    //1 - récupération de l'obecjt
    console.log("Here Is BL : Edit Match")
    let newMatch = req.body;
    MatchModel.updateOne({ _id: newMatch._id }, newMatch).then((data) => {
        console.log("here data after edit", data);
        (data.nModified == 1) ?         //nModified is displayed fel terminal backend ne5dem aliha hia
            res.json({ msg: "Edited With Success" }) :
            res.json({ msg: "Not Edited" });
    })



    // let newMatch = req.body;
    // for (let i = 0; i < matchesTab.length; i++) {
    //     if (matchesTab[i].id == newMatch.id) {
    //         matchesTab[i] = newMatch;
    //         break;
    //     }
    // }
    // res.json({ msg: "Edited With Success" })
})



//Business Logic : Search Matches BY ScoreOne or ScoreTwo (solution n°1)
app.post("/matches/search", (req, res) => {
    console.log("here into BL : Search");
    let obj = req.body;
    console.log("here obj", obj);
    let findedMatches = matchesTab.filter((elt) => {
        return elt.scoreOne == obj.scoreOne || elt.scoreTwo == obj.scoreTwo;
    })
    res.json({ tab: findedMatches });
})
//Business Logic : Search Matches BY ScoreOne or ScoreTwo (solution n°2)
app.get("/matches/:sc1/:sc2", (req, res) => {
    console.log("here into BL: search matches by sc1 || sc2");
    let scoreOne = req.params.sc1;
    let scoreTwo = req.params.sc2;
    let findedMatches = matchesTab.filter((elt) => {
        return elt.scoreOne == scoreOne || elt.scoreTwo == scoreTwo;
    })
    res.json({ tab: findedMatches });
})



//add player
app.post("/players", (req, res) => {
    console.log("Here Is Add Player", req.body);
    //Firstly récupération de l'object 
    let newPlayer = new PlayerModel(req.body);
    newPlayer.save();
    res.json({ msg: "Added With Success" })
    // affectation d'un ID à l'object
    // player.id = generateId(playersTab);
    // //Push object
    // playersTab.push(player);
    //send response
});


//get player by ID
app.get("/players/:id", (req, res) => {
    let id = req.params.id;
    let findedPlayer = playersTab.find((elt) => {
        return elt.id == id;
    })
    findedPlayer ?
        res.json({ player: findedPlayer }) :
        res.json({ msg: "Player Not Found" });
});




//get all Players
app.get("/players", (req, res) => {
    //traitement de la req
    console.log("Here into BL : Get all players")
    res.json({ players: playersTab });

});




//delete player by ID
app.delete("/players/:id", (req, res) => {
    //traitement de la req
    let id = req.params.id;
    isDeleted = false;
    for (let i = 0; i < playersTab.length; i++) {
        if (playersTab[i].id == id) {
            playersTab.splice(i, 1);
            isDeleted = true;
            break;
        }

    }
    isDeleted
        ?
        res.json({ msg: "Deleted With Success" }) :
        res.json({ msg: "Not Found" });

});
//update player
app.put("/players", (req, res) => {

})


app.get("/matches/search", (req, res) => {

    let scoreOne = req.params.scoreOne;
    let scoreTwo = req.params.scoreTwo;
    let findedObj;
    for (let i = 0; i < matchesTab.length; i++) {
        if (matchesTab[i].scoreOne == scoreOne || matchesTab[i].scoreTwo == scoreTwo) {
            findedObj = matchesTab[i];
            break;
        }
    }

});


app.post("/Myplayers/searchPlayer", (req, res) => {
    console.log("hereBl:search Player", req.body);
    let p = req.body;
    let findedPlayers = playersTab.filter((obj) => {
        return obj.name == p.name || obj.age == p.age;
    });
    res.json({ players: findedPlayers });
})


//Get All Stadiums
app.get("/stadium", (req, res) => {
    console.log("here is BI for Get All Stadiums")
    res.json({ stadiums: stadiumsTab });
})
//add Stadium
app.post("/stadium", (req, res) => {
    let stadium = req.body;
    stadium.id = generateId(stadiumsTab);
    stadiumsTab.push(stadium);
    res.json({ msg: "stadium added with success" });
})



//Get All Teams
app.get("/team", (req, res) => {
    TeamModel.find().then((data) => {
        res.json({ teams: data });
    })

})

//display a team by its ID
app.get("/team/:id", (req, res) => {
    let id = req.params.id;
    TeamModel.findOne({ _id: id }).then((data) => {
        res.json({ team: data });
    })


    // let findedTeam = teamsTab.find((elt) => {
    //     return elt.id == id;
    // });
    // findedTeam ?
    //     res.json({ team: findedTeam }) :
    //     res.json({ msg: "Team Not Found" });
})


//Add a Team
app.post("/team", (req, res) => {

    let newTeam = TeamModel(req.body);
    newTeam.save();
    // let team = req.body;
    // team.id = generateId(teamsTab);
    // teamsTab.push(team);
    res.json({ msg: "Team added with success" })
})

//delete team
app.delete("/team/:id", (req, res) => {
    //traitement de la req
    let id = req.params.id;
    // TeamModel => key teams = [{_id, },{_id, },{}....]
    TeamModel.deleteOne({ _id: id }).then(() => {
        res.json({ msg: "Deleted With Success" })
    })
});

//add IMC
app.post("/imc", (req, res) => {
    console.log("Here Is IMC", req.body);
    let newImc = new ImcModel(req.body);
    newImc.save((err, doc) => {
        console.log("here err", err);
        console.log("here doc", doc);
        err
            ?
            res.json({ msg: "error" }) :
            res.json({ msg: "added with success" });
    });
});

app.get("/imc", (req, res) => {
    //traitement de la req
    console.log("Here into BL : Get ALL IMC")
    ImcModel.find().then((data) => {
        res.json({ imc: data });
    })
});


//BL add signup form
app.post("/users/signup", multer({ storage: storage }).single('img'), (req, res) => {
    console.log("here into BL of SignUp", req.body);
    bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
        console.log("here is crypted password", cryptedPwd);
        req.body.pwd = cryptedPwd;
        req.body.avatar = "http//localhost:3000/images/" + req.file.filename;
        let user = new User(req.body);
        user.save((err, doc) => {
            if (err) {
                if (err.errors.email) {
                    res.json({ msg: "0" });
                }
            } else {
                res.json({ msg: "added with succes" });
            }
        });
    });
});

//BL add login 
app.post("/users/login", (req, res) => {
    let user;
    console.log("here into BL of login", req.body);
    User.findOne({ email: req.body.email }).then(
        (doc) => {
            console.log("Here doc after searching by Email", doc);
            if (!doc) {
                res.json({ msg: "Please check your email" })
            } else {
                user = doc;
                return bcrypt.compare(req.body.pwd, doc.pwd);
            }
        }).then((pwdResult) => {
            console.log("Here pwdResult", pwdResult);
            if (!pwdResult) {
                res.json({ msg: "please check your Password" })
            } else {
                let userToSend = {
                    id: user._id,
                    fName: user.firstName,
                    lName: user.lastName,
                    role: user.role,
                };
                // If the user is valid, generate a JWT token
                const token = jwt.sign(userToSend, secretKey, { expiresIn: '1h' });
                res.json({ result: token });
            }
        })
})
//searchweather 
app.post("/weather", (req, res) => {
    ("here weather body", req.body.City);
    const key = "32901df1630dbcfaa498796ce1d0e760";

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.City}&appid=${key}`;
    axios.get(weatherUrl).then((apiResponse) => {
        let data = apiResponse.data;
        let result = {
            temperature: data.main.temp,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            winSpeed: data.main.win.speed,
            icon: data.main.icon,
        };

        console.log("here result", result);
        res.json({ result: result });
    });

});



module.exports = app;