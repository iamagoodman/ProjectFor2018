const http = require('http');
// 创建http服务
var server = http.createServer(function(req,res){
	console.log(req.url);
	var data;
	switch(req.url){
		case '/1.html':
			data='1111';
			break;
		case '/2.html':
			data='2222';
			break;
		default:
			data='404';
			break
	}
	res.write(data);
	res.end();

});
console.log('fasdfsdafasd');
// 监听
server.listen(990);
