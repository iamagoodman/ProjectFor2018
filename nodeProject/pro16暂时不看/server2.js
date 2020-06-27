const express = require('express');

var server = express();
server.listen(8080);

// 目录
var routerUser = express.Router();

routerUser.get('/1.html',function(req,res){
	res.send('user1')
});

routerUser.get('/2.html',function(req,res){
	res.send('user2')
});

var articleRouter = express.Router();

articleRouter.get('/1.html',function(req,res){
	res.send('article1')
});

server.use('/article',articleRouter);
server.use('/user',routerUser);
