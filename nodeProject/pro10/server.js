// const express = require('express');
//
// const expressStatic = require('express-static');
//
// const bodyParser = require('body-parser');
//
// var server = express();
//
// server.listen(8080);
//
// server.use(bodyParser.urlencoded({
// 	extened:true,   // 扩展
// 	limit:2*1024*1024      // 限制
// }));
//
// // get post
// //server.use('/',function(req,res){
// //	console.log(req.query);
// //});
//
// server.use('/',function(req,res){
// 	console.log(req.body);
// });
//




var express = require('express');
var expressStatic = require('express-static')
var bodyParser = require('body-parser')
var mybodyparser = require('./libs/my-body-parser')
var server = express();
server.listen(8080);
// server.use(bodyParser.urlencoded({extened:true,limit:200*1024}))
server.use(mybodyparser);

server.use('/',function (req,res) {
    console.log('b')
    console.log(req.body);
})
server.use(expressStatic('./www'))

