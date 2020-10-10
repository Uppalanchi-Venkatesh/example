var mongoose=require('mongoose');
var registerUser=new mongoose.Schema(
    {
        "_id": Number,
        "username": String,
        "email": String,
        "password": String
    }
)
module.exports=mongoose.model("register",registerUser);