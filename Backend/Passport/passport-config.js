var localStrategy = require('passport-local').Strategy; 
var bcrypt = require('bcrypt'); 
var RegisterUserLib = require('../Lib/RegisterUserLib');
var model = require('../Model/RegisterUserModel');
var passport = require('passport');

passport.serializeUser((user , done)=>{
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
/*passport.deserializeUser((id , done)=>{
        //var query = {id : id};
        RegisterUserLib.getItemById({id},model,function (err, dbUser){
            console.log("USER2 : "+JSON.stringify(dbUser));
            if(err)
                return done(err,dbUser);
            return done(null,dbUser);
        });
});

passport.serializeUser(function(user, done) {
    console.log("USER1 : "+JSON.stringify(user));
    done(null, user);
});*/

passport.use(new localStrategy({usernameField : 'username'},
    (username1, password1, done)=> {
    var query={username : username1}
    RegisterUserLib.getSingleItemByQuery(query, model, (err, user)=>{
        if(err)
            return done(err);
        if(!user)
            return done(null, false, {message: 'No user with that username'});
            bcrypt.compare(password1, user.password,function(err, result){
                if(err) done(err);
                if(result) return done(null, user);
                return done(null, false, {message: 'Password is incorrect'});
            });
        });
    }
));

module.exports = passport;