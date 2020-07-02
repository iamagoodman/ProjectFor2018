const express = require('express');
const expressStatic = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const ejs = require('ejs');
const jade = require('jade');
const consolidate = require('consolidate')
const mysql = require('mysql')
var server = express();
const common=require('./libs/common');
var db = mysql.createPool({host:'localhost',user:'root',password:'',database:'blog'});
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

// 配置模板引擎 ：：： 哪种引擎 模板文件目录 输出什么东西
server.set('view engine','html');
server.set('views','./template');
server.engine('html',consolidate.ejs);

//用户请求
// server.get('/index',function (req,res) {
//     res.render('1.ejs',{name:'quntta'});
// })
// server.use('/',function (req,res,next) {
//     console.log(req.query,req.body,req.files,req.cookies,req.session);
// });

server.get('/',function (req,res,next) {
    db.query('SELECT * FROM banner_table',(err,data)=>{
        if(err){
            res.status(500).send('数据库错误').end();
        }else{
            res.bannerList = data;
            next();
        }
    })
})

server.get('/',(req,res,next)=>{
    db.query('SELECT ID,title,desc_ FROM article_table',(err,data)=>{
        if(err){
            res.status(500).send('数据库错误').end();
        }else{
            // console.log(data);
            res.articles = data;
            next();
        }
    })
})

server.get('/',(req,res)=>{
    // console.log(res)
    res.render('index.ejs',{bannerList:res.bannerList,articles:res.articles});
})

server.get('/article',(req,res)=>{
    console.log(req.query.id)
    if(req.query.act=='like'){
        db.query(`UPDATE article_table SET nlike=nlike+1 WHERE ID=${req.query.id}`,(err,data)=>{
            console.log(data);
        })
    }
    db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`,(err,data)=>{
        if(err){
            res.status(500).send('数据库错误').end();
        }else{
            var articleData = data[0];
            articleData.sDate=common.time2date(articleData.post_time);
            articleData.content=articleData.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
            console.log(articleData.sDate)
            res.render('conText.ejs',{data:articleData});
        }
    })
})

// static数据
server.use(expressStatic('./www'));