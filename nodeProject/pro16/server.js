const express = require('express');
const static = require('express-static');
const fs = require('fs');
const pathLib = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
var objMulter=multer({dest: './www/upload/'});
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
server.set('views','./views');
server.engine('html',consolidate.ejs);
server.get('/index',function(req,res){
	res.render('1.ejs',{name:'Frank'});
});
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
