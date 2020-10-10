var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var db=require("./Backend/DB/DBconnect");
var userlib=require("./Backend/Lib/userlib");
var RegisterUserLib = require('./Backend/Lib/RegisterUserLib');
var bcrypt = require('bcrypt'); 
var passport = require("./Backend/Passport/passport-config");
var flash = require('express-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose  = require('mongoose');
var bodyParser = require('body-parser');
require('dotenv').config();

db.connect(true);

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash()); 
app.use(bodyParser.json())
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : true,
    saveUninitialized : true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 
    },
    //cookie: { secure: false },
    store : new MongoStore({mongooseConnection : mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());

/*app.use((req,res,next)=>{                 //Debugging wheather session and user is being set in the browser
    console.log("SESSION : "+JSON.stringify(req.session));
    console.log("USER : "+JSON.stringify(req.user));
    next();
});*/

app.use(express.static(__dirname+'/FrontEnd'));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/index.html");
});

app.get('/resume', function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/Resume.html");
});

app.get('/clock', function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/clock.html");
});

app.get('/tambola', function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/tambola.html");
});

app.get('/homepage', function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/Homepage.html");
});

app.get('/login',checkNotAuthenticated, function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/Login.html");
});

app.get('/dashboard',checkAuthenticated, function(req, res){
    return res.sendFile(__dirname+"/FrontEnd/HTML/Dashboard.html");
});

app.get('/register',checkNotAuthenticated, function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/Register.html");
});

app.get('/logout', function (req, res){
    req.logOut();
    res.redirect('/login');
});

app.post('/registeruser',async function(req,res){
    try{
        var hashedPassword = await bcrypt.hash(req.body.password , 10);
        req.body.password = hashedPassword;
        RegisterUserLib.createUsers(req.body);
        res.redirect('/login');
    }catch{
        res.redirect('/register');
    }
});

app.post('/login', 
    passport.authenticate('local', { 
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }),
);

/*app.get('/getregisteruser',function(req,res){
    RegisterUserLib.getAllUsers(function(err,result){
        if(err)
            res.json(err);
        else
            res.json(result);
    })
});

app.get('/database', function(req, res){
    userlib.getallusers(function(err,result){
        if(err)
            res.json(err);
        else
            res.json(result);
    });
});*/

app.post('/create', function(req,res){
    userlib.create(function(err){
        if(err)
            res.json(err);
        else
            req.body;
    });
});

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated())
        return res.redirect('/dashboard');
    next();
}

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}

var port= process.env.PORT  || 5000;

app.listen(port, function(){
    console.log("Site Running on http://localhost:"+port);
});