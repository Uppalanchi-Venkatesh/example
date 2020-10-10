var model=require("../Model/Usermodel");
module.exports={
    create:function(userObj){
        var user=new model(userObj);
        user.save();
    },
    getAllUsers: function(cb){
        model.find({},function(err,result){
            cb(err,result);
        })
    }
}