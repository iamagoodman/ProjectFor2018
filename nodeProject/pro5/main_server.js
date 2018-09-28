const http=require('http');
const fs=require('fs');
const querystring=require('querystring');
const urlLib=require('url');

var server = http.createServer(function(req,res){
	// get 
	var obj = urlLib.parse(req.url);
	const URL = obj.pathname;
	const GET = obj.query;
	// post
	var str='';
	req.on('data',function(data){
		str+=data;
	})
	req.on('end',function(){
		const POST = querystring.parse(str)
		console.log(URL,GET,POST);
		var filename = './www'+URL;
		fs.readFile(filename,function(err,data){
			if(err){
				console.log('读取文件出错')
			}else{
				res.write(data)
			}
			res.end();
		})
	})
});

server.listen(8080)
