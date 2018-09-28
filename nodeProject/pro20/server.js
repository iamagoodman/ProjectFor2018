const express = require('express');
const static = require('express-static');
const fs = require('fs');
const pathLib = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
const mysql = require('mysql');
var objMulter=multer({dest: './www/upload/'});
// 连接池
var db = mysql.createPool({host:'localhost',user:'root',password:'',database:'blog'})

var server = express();
server.listen(8080);
server.use(objMulter.any());
var arr=[];
for (var i=0;i<1000;i++) {
	arr.push('keys_'+Math.random())
}
server.use(cookieSession({name:'user',keys:arr,maxAge:20*3600*100}));
server.use(bodyParser.urlencoded({extened:false}));

server.set('view engine','html');
server.set('views','./template');
server.engine('html',consolidate.ejs);
server.get('/',function(req,res,next){
	console.log(req.url);
	// 查询banner里的东西
	db.query("SELECT * FROM banner_table",(err,data)=>{
		if(err){
			res.status(500).send('database error').end();
		}else{
			res.banners = data;
			next();
		}
	});
	
});
server.get('/',(req,res,next)=>{
	db.query("SELECT ID,title,summary FROM article_table",(err,data)=>{
		if(err){
			res.status(500).send('database err').end()
		}else{
			res.news = data
			next()
		}
	})
}) 
server.get('/',(req,res)=>{
	res.render('index.ejs',{banners:res.banners,news:res.news})
})
server.get('/article',(req,res)=>{
	if(req.query.id){
		db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`,(err,data)=>{
			if(err){
				res.status(500).send('数据库坏了').end()
			}else{
				if(data.length==0){
					res.status(404).send('找不到').end()
				}else{
					var article_data = data[0]
					article_data.stime = new Date().setTime(article_data.post*1000)
					console.log(article_data)
					res.render('conText.ejs',{article_data:article_data})
				}
			}
		})
	}else{
		res.status(404).send('文章找不到').end()
	}
})

server.post('/', function (req, res){
  //新文件名
  //'./www/upload/dfb33662df86c75cf4ea8197f9d419f9' + '.png'
  console.log(req.files)
  var newName=req.files[0].path+pathLib.parse(req.files[0].originalname).ext;

  fs.rename(req.files[0].path, newName, function (err){
    if(err)
      res.send('上传失败');
    else
      res.send('成功');
  });

  //1.获取原始文件扩展名
  //2.重命名临时文件
});
server.use(static('./www'));
