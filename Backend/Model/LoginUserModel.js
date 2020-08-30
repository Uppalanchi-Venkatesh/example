var mongoose=require('mongoose');
var loginUser=new mongoose.Schema(
    {
        "username": {String,required},
        "password": {String,required}
    }
)
module.exports=mongoose.model("login",loginUser);