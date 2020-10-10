var localStrategy = require('passport-local').Strategy; 
var bcrypt = require('bcrypt'); 
var RegisterUserLib = require('../Lib/RegisterUserLib');
var model = require('../Model/RegisterUserModel');
var passport = require('passport');

passport.serializeUser((user, done)=> {
    done(null, user._id);
});

passport.deserializeUser((id , done)=>{
        var query = {_id : id};
        RegisterUserLib.getItemById(query, model, (err, dbUser)=>{
            if(err)
                return done(err,dbUser);
            return done(null,dbUser);
        });
});

var customFields = {usernameField : 'username', passwordField : 'password'}

var verifyCallback = (username, password, done)=> {
    var query={username : username}
    RegisterUserLib.getSingleItemByQuery(query, model, (err, user)=>{
        if(err)
            return done(err);
        if(!user)
            return done(null, false, {message: 'No user with that username'});
            bcrypt.compare(password, user.password, (err, result)=>{
                if(err) 
                    done(err);
                if(result) 
                    return done(null, user);
                return done(null, false, {message: 'Password is incorrect'});
            });
        });
    }

var Strategy = new localStrategy(customFields,verifyCallback)

passport.use(Strategy);

module.exports = passport;