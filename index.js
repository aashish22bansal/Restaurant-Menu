var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongodb = require('mongodb');
var { debugPort } = require("process");
var app = express();
var async = require("async");
const { checkServerIdentity } = require("tls");

mongoose = require("mongoose");
//mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb://localhost:27017/ajith", { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log('DB Connected!')).catch(err => { console.log("DB Connection Error: ${err.message}"); });

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
var pass=false;

app.post("/login", function(req, res) {
    credentials = {
        username: req.body.username,
        password: req.body.password
    };
    console.log("Printing the credentials[Console Output 1]: ",credentials);

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("ajith");
        var query = {
            uname: req.body.username,
            psw: req.body.password
        }
        /*
        async.series([
            function One(callback){
                callback(null, 'RESULT OF FUNCTION ONE');
                console.log("Printing PASS[CONSOLE OUTPUT 2]: ", pass);
                if (Boolean(pass)) {
                    //pass = false;
                    console.log("\nInside condition for rendering!\n");
                    res.render("success");
                } else {
                    //pass = false;
                    console.log("\nInside the else part\n");
                    res.render("failure");
                }
            },
            function Two(callback) {
                callback(null, 'RESULT OF FUNCTION TWO');
                dbo.collection('users').find(query).toArray(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log("Printing RES[CONSOLE OUTPUT 3]: ",res);
                    if (res) {
                        console.log("Inside FUNCTION TWO IF CONDITION. SETTING PASS AS 'TRUE'");
                        pass = true;
                    } else {
                        console.log("Inside FUNCTION TWO ELSE CONDITION. SETTING PASS AS 'FALSE'");
                        pass = false;
                    }
                });
                console.log("Printing PASS[CONSOLE OUTPUT 4]: ",pass);
                db.close();
                console.log("Printing PASS[CONSOLE OUTPUT 5]: ",pass);
                callback();
            }
        ], function(err, result){
            if(err){
                throw err;
            }
            console.log("Printing RESULT[CONSOLE OUTPUT 6]: ",result);
        });
        */
        async.waterfall([
            function One(callback){
                some_func({}, function(err,res){
                    if(err){
                        callback(err, null);
                        return;
                    }
                    console.log("Printing PASS[CONSOLE OUTPUT 2]: ", pass);
                    if (Boolean(pass)) {
                        //pass = false;
                        console.log("\nInside condition for rendering!\n");
                        res.render("success");
                    } else {
                        //pass = false;
                        console.log("\nInside the else part\n");
                        res.render("failure");
                    }
                    //var something = res.items[0].avatar_url;
                    callback(null, pass); /*(null, something)*/
                });
            },
            function Two(pass, callback){
                var something2_0 = pass;
                dbo.collection('users').find(query).toArray(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log("Printing RES[CONSOLE OUTPUT 3]: ",res);
                    if (res) {
                        console.log("Inside FUNCTION TWO IF CONDITION. SETTING PASS AS 'TRUE'");
                        pass = true;
                    } else {
                        console.log("Inside FUNCTION TWO ELSE CONDITION. SETTING PASS AS 'FALSE'");
                        pass = false;
                    }
                });
                console.log("Printing PASS[CONSOLE OUTPUT 4]: ",pass);
                db.close();
                console.log("Printing PASS[CONSOLE OUTPUT 5]: ",pass);
                callback(null, something2_0);
            }
        ], function(err,result){
            if(err){
                throw err;
            }
            console.log("Printing RESULT[CONSOLE OUTPUT 6]: ",result);
        })
            console.log("Printing PASS[CONSOLE OUTPUT 7]: ",pass);
    });
    
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