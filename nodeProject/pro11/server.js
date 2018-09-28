const express = require('express');
const cookieParser = require('cookie-parser');

var server = express();

server.listen(8080);

server.use(cookieParser);

server.use('/',function(req,res){
	console.log(req);
	res.clearCookie('user');
	res.send('nook');
});

