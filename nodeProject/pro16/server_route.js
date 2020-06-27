const express = require('express');

var server = express();

// 目录1 user
var routerUser = express.Router();

routerUser.get('/1.html',function (req,res) {
    res.send('user1');
})
routerUser.get('/2.html',function (req,res) {
    res.send('user2');
})
server.use('/user',routerUser);
// 目录2 article
server.listen(8080);