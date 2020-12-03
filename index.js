var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongodb = require('mongodb');
var { debugPort } = require("process");
var app = express();

mongoose = require("mongoose");
//mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb://localhost:27017/ajith", { useUnifiedTopology: true, useNewUrlParser: true, }).then(() => console.log('DB Connected!')).catch(err => { console.log("DB Connection Error: ${err.message}"); });

var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017'); // CREATTING CONNECTION

//mongoose.connect("mongodb://localhost:27017/ajith", {useNewUrlParser: true}); // CONNECTED TO DATABASE
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/ajith";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
//app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


function go_to_webpage(){
    
}

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/login", (req, res) => {
    //var { name, password } = req.body;
    var pass = false;
    credentials = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(credentials);
    var pass = false;
    MongoClient.connect(url, function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("ajith");
        var query = {
            uname: req.body.username,
            psw: req.body.password
        }
        dbo.collection('users').find(query).toArray(function(err, res) {
            if (err) {
                throw err;
            }
            console.log(res);
        });
        pass = true;
        console.log(pass);
        db.close();
        if (Boolean(pass)) {
            //res.render("success");
            console.log("\nInside condition for rendering!\n");
            res.render("success");
        } else {
            console.log("\nInside the else part\n");
            res.render("failure");
        }
    });
});

app.post("/signup", (req, res) => {
    response = {
        fname: req.body.fname,
        uname: req.body.uname,
        psw: req.body.psw
    };
    console.log(response);
    MongoClient.connect(url, function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("ajith");
        /*
        dbo.createCollection("users",function(err,res){
            if(err){
                throw err;
            }
            console.log("Users Collection created!");
            db.close();
        });
        */
        dbo.collection("users").insertOne(response, function(err, res) {
            if (err) {
                throw err;
            }
            
            console.log("User Data Inserted");
        });
        res.render("index");
        db.close();
    });
});

//new Promise(() => { throw new Error('exception!'); });

app.listen(4000, () => {
    console.log("server started on port 4000");
});