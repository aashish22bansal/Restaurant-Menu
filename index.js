var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongodb = require('mongodb');
var { debugPort } = require("process");
var app = express();
var async = require("async");

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

app.get("/", (req, res) => {
    res.render("index");
});
var pass;
app.post("/login", function(req, res) {
    credentials = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(credentials);

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("ajith");
        var query = {
            uname: req.body.username,
            psw: req.body.password
        }
        async.series([

                function(callback) {
                    dbo.collection('users').find(query).toArray(function(err, res) {
                        if (err) {
                            throw err;
                        }
                        console.log(res);
                        if (res) {
                            pass = true;
                        } else {
                            pass = false;
                        }
                    });
                    db.close();
                    callback();
                },

                /*function(callback) {
                    console.log(pass);
                    if (Boolean(pass)) {
                        console.log("\nInside condition for rendering!\n");
                        res.render("success");
                        pass = false;
                    } else {
                        console.log("\nInside the else part\n");
                        res.render("failure");
                        pass = false;
                    }
                    db.close();
                    callback();
                }*/
            ]
            /*, function(err, result) {
                        console.log(Boolean(result));
                        if (Boolean(result)) {
                            pass = false;
                            console.log("\nInside condition for rendering!\n");
                            res.render("success");
                        } else {
                            pass = false;
                            console.log("\nInside the else part\n");
                            res.render("failure");
                        }
                    }*/
        );

    });
    if (Boolean(pass)) {
        pass = false;
        console.log("\nInside condition for rendering!\n");
        res.render("success");
    } else {
        pass = false;
        console.log("\nInside the else part\n");
        res.render("failure");
    }
    //pass = false;
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

app.listen(4000, () => {
    console.log("server started on port 4000");
});