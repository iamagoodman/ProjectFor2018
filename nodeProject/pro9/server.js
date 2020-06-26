const express = require('express');

var server = express();

server.use('/a.html',function(req,res){
	console.log('come in')
	console.log(req);
	res.send('123');
	res.end();
});

// server.get('/',function () {
// 	console.log('get')
// });
server.post('/',function () {
	console.log('post')
})

server.listen(8080);
