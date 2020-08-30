var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var db=require("./Backend/DB/DBconnect");
var userlib=require("./Backend/Lib/userlib");
var RegisterUserLib = require('./Backend/Lib/RegisterUserLib');
var LoginUserLib = require('./Backend/Lib/LoginUserLib');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
db.connect();
app.use(express.static(__dirname+'/FrontEnd'));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/Homepage.html");
})

app.get('/login', function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/Login.html");
})

app.get('/dashboard', function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/Dashboard.html");
})

app.get('/register', function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/Register.html");
})

app.post('/registeruser',function(req,res){
    RegisterUserLib.createUsers(req.body);
    //res.send("user registered sucessfully");
    res.redirect('/login');
})

app.get('/getregisteruser',function(req,res){
    RegisterUserLib.getallusers(function(err,result){
        if(err)
            res.json(err);
        else
            res.json(result);
    })
})

app.post('/loginuser',function(req,res){
    LoginUserLib.createUsers(req.body);
    //res.send("user registered sucessfully");
    res.redirect('/dashboard');
})

app.get('/getloginuser',function(req,res){
    LoginUserLib.getallusers(function(err,result){
        if(err)
            res.json(err);
        else
            res.json(result);
    })
})

app.post('/create', function(req,res){
    userlib.create(function(err){
        if(err)
            res.json(err);
        else
            req.body;
    });
})

app.get('/database', function(req, res){
    userlib.getallusers(function(err,result){
        if(err)
            res.json(err);
        else
            res.json(result);
    });
})

/*app.get('/', function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/index.html");
})

app.get('/clock', function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/clock.html");
})

app.get('/tambola', function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/tambola.html");
})

app.get('/second', function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/second.html");
})*/
//db.disconnect();

var port= process.env.PORT  || 4550;

app.listen(port, function(){
    console.log("Site Running on http://localhost:"+port);
});