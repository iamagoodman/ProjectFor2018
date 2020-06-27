const express = require('express');
const expressStatic = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const ejs = require('ejs');
const jade = require('jade');

var server = express();

server.listen(8080);

// 解析cookie
server.use(cookieParser('fdasjkljlfdsahuygdskjlfds'));

// 使用session
var arr = [];
for(var i=0;i<10000;i++){
    arr.push('keys_'+Math.random())
}
server.use(cookieSession({name:'sess',keys:arr,maxAge:2*3600*1000}));

// post数据
server.use(bodyParser.urlencoded({extended:false}));

// 文件上传
server.use(multer({dest:'./www/upload'}).any());
//用户请求
server.use('/',function (req,res,next) {
    console.log(req.query,req.body,req.files,req.cookies,req.session);
});

// static数据
server.use(expressStatic('./www'));