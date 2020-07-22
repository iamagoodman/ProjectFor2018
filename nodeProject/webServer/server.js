const express = require('express')
const static = require('express-static')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const multer = require('multer')
const multerObj = multer({dest:'./static/upload'})
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const consolidate = require('consolidate')
const expressRoute = require('express-route')
const adminroute = require('./route/admin/index')
const webroute = require('./route/web')

var server = express();

server.listen(3389);
server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 获取请求
server.use(bodyParser.urlencoded())
server.use(multerObj.any())

// cookie session
var keys = [];
for(var i=0;i<10000;i++){
    keys.push('keys_'+Math.random())
}
server.use(cookieParser());
server.use(cookieSession({
    name:'sess',
    keys:keys,
    maxAge:60*3600*1000
}))

// 模板
server.engine('html',consolidate.ejs);
server.set('views','template');
server.set('view engine','html');

// route
server.use('/web',webroute());

server.use('/admin',adminroute());


// 默认 static
server.use(static('./static'))