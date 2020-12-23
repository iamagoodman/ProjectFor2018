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
const loginroute = require('./route/login/index')
const policyroute = require('./route/policy/index')
const insureroute = require('./route/insure/index')
const partnerroute = require('./route/partner/index')
const payroute = require('./route/pay/index')
const toolsroute = require('./route/tools/index')

var server = express();

server.listen(8090);
server.all('*', function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    if (req.url.indexOf('favicon.ico')!=-1) return;
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("allowCredentials",true);
    next();
});
// 获取请求
server.use(bodyParser.json({limit:'100mb'}))
server.use(bodyParser.urlencoded({ limit:'100mb', extended: true }))
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

server.use('/login',loginroute());

server.use('/policy',policyroute());

server.use('/insure',insureroute());

server.use('/partner',partnerroute());

server.use('/pay',payroute());

server.use('/tools', toolsroute());



// 默认 static
server.use(static('./static'))
