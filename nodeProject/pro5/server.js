const http = require('http');
const querystring = require('querystring');
http.createServer(function(req,res){
	// post -- req
	// data 事件   每有一段数据到达的时候触发一次
	var str = ''; // 接受数据
	var i = 0;
	req.on('data',function(data){
		console.log(`${i++}次数据`);
		str+=data;
	});
	// end 时间  数据全部到达 触发一次
	req.on('end',function(){
		var post = querystring.parse(str);
		console.log(post);
	});
}).listen(8080)
