var mongoose=require('mongoose');
var user=new mongoose.Schema(
    {
        "username": String,
        "age": Number
    }
)
module.exports=mongoose.model("venkat",user);
