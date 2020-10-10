var mongoose=require('mongoose');
var registerUser=new mongoose.Schema(
    {
        "username": String,
        "email": String,
        "password": String
    }
)
module.exports=mongoose.model("register",registerUser);