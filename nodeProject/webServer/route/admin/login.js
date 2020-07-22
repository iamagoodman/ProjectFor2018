const express = require('express')
const mysql = require('mysql')
const common = require('../../libs/common');
const db = mysql.createPool({host:'182.92.194.83',user:'root',password:'admin123456',database:'blog0629'})

module.exports = function () {
    var router = express.Router();

    // 登陆
    router.get('/',function (req,res) {
        res.render('admin/login.ejs',{});
    })
    router.post('/',function (req,res) {
        var username = req.body.username;
        var password = req.body.password;
        console.log(db);
        db.query(`SELECT * FROM admin_table WHERE username='${username}'`,(err,data)=>{
            if(err){
                console.log(err)
                res.status(500).send('database error').end();
            }else{
                console.log(data)
                if(data.length==0){
                    res.status(400).send('no this admin').end();
                }else{
                    var str = common.md5(password);
                    if(str == data[0].password){
                        req.session['admin_id'] = data[0].ID;
                        res.redirect('/admin/');
                    }else{
                        res.status(400).send('this password is incorrect').end();
                    }
                }
            }
        })

    })

    return router
}