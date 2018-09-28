const http=require('http');
const fs=require('fs');
const querystring=require('querystring');
const urlLib=require('url');

var users={};

var server = http.createServer(function(req,res){
	// post
	var str='';
	req.on('data',function(data){
		str+=data;
	})
	req.on('end',function(){
		// get 
		var obj = urlLib.parse(req.url,true);
		const URL = obj.pathname;
		const GET = obj.query;
		const POST = querystring.parse(str)
		console.log(URL);
		console.log(GET);
		// 区分文件和接口
		if(URL=='/user'){ // 接口
			switch(GET.act){
				case 'reg':
				// 注册  检查用户名是否已经有了
				if(users[GET.user]){
					res.write('{"ok":false,"msg":"此用户已经存在"}')
				}else{
					users[GET.user]=GET.pass;
					res.write('{"ok":true,"msg":"注册成功"}');
					console.log(users);
				}
					break;
				case 'login':
				// 登录 检查users中是否有用户了
				if(!users[GET.user]){
					res.write('{"ok":false,"msg":"此用户不存在"}');
				}else if(users[GET.user]!=GET.pass){
					res.write('{"ok":false,"msg":"用户名或密码错误"}');
				}else{
					res.write('{"ok":true,"msg":"登录成功"}');
				}
					break;
				default:
					res.write('{"ok":false,"msg":"未知的act"}');
			}
			res.end();
		}else{ // 读取文件
			var filename = './www'+URL;
			fs.readFile(filename,function(err,data){
				if(err){
					console.log('读取文件出错')
				}else{
					res.write(data)
				}
				res.end();
			});
		}
		
	});
});

server.listen(8080)
