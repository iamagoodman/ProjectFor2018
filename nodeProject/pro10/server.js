const express = require('express');

const expressStatic = require('express-static');

const bodyParser = require('body-parser');

var server = express();

server.listen(8080);

server.use(bodyParser.urlencoded({
	extened:true,   // 扩展
	limit:2*1024*1024      // 限制
}));

// get post
//server.use('/',function(req,res){
//	console.log(req.query);
//});

server.use('/',function(req,res){
	console.log(req.body);
});

