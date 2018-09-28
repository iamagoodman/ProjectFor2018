const express = require('express');

const querystring = require('querystring');

var server = express();

server.listen(8080);

server.use(function(req,res,next){
	var str = '';
	
	req.on('data',function(data){
		str+=data;
	});
	
	req.on('end',function(){
		req.body = querystring.parse(str);
		next();
	});
	
});

server.use('/',function(req,res){
	console.log(req.body);
});

