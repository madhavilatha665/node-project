var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
mongoose.connect("mongodb://localhost/WEBPAGE");
var User = require("./server/route/users");

var app = express();

app.use(cors()); 

app.use(bodyParser.json());
app.post('/api/register', User.registerUser);

app.post('/api/login', User.loginUser);
// app.get('/api/getAllUsernames/',User.getAllUsernames);

app.post('/api/forgotPassword',User.forgotPassword);

app.listen(3011, function(){
    console.log("Server started on 3011");
});
