var express = require('express');

var app = express();

app.use(express.static(__dirname+'/FrontEnd'));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/FrontEnd/HTML/index.html");
})

var port= process.env.PORT  || 3000;

app.listen(port, function(){
    console.log("Site Running on http://localhost:"+port);
});