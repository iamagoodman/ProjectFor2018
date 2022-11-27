const express = require('express');
const common = require('../../libs/common');
const bannerRouter = require('./banner');  // banner页面
const loginRouter = require('./login');    // 登陆页面
const custom_evaluationRouter = require('./custom_evaluation');  // 客户评价页面
var mysql = require('mysql');
var db = mysql.createPool({host:'182.92.194.83',user:'root',password:'admin123456',database:'blog0629'})
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
    router.use('/custom_evaluation',custom_evaluationRouter())
    router.get('/',function (req,res) {
        res.render('./admin/index.ejs',{});
    })
    return router
}
