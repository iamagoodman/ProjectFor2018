const express = require('express');
const common = require('../../libs/common');
const bannerRouter = require('./banner');
const loginRouter = require('./login')
var mysql = require('mysql');
var db = mysql.createPool({host:'localhost',user:'root',password:'',database:'blog0629'})
module.exports = function () {
    const router = express.Router();
    // 检查登陆状态
    router.use((req,res,next)=>{ // 所有的请求都经过这里
        if(!req.session['admin_id'] && req.url!='/login'){ // 没有登陆
            res.redirect('/admin/login');
        }else{
            next();
        }
    })

    router.use('/login',loginRouter());
    router.use('/banner',bannerRouter());

    router.get('/',function (req,res) {
        res.render('./admin/index.ejs',{});
    })
    return router
}