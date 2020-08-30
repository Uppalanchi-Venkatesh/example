var model=require("../Model/RegisterUserModel");
module.exports={
    create: function(userObj){
        var registerUser=new model(userObj);
        registerUser.save();
    },
    getallusers: function(callback){
        model.find({},function(err,result){
            callback(err,result);
        })
    }
}