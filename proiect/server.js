const express = require('express');

const app = express();


app.use(express.static(__dirname));

app.get('/contactus.html', function(req, res) {
    res.sendFile(__dirname + "/" + "contactus.html");
    
});

app.get('/user', function(req, res){
    response = {
        user_name : req.query.user_name,
        email: req.query.email,
        subject: req.query.subject,
        message: req.query.message
    };

    console.log(response);

    res.end(JSON.stringify(response));
});

var server = app.listen(5500, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("OK http://%s:%s", host, port);
});