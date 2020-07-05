const express = require('express')
const mysql = require('mysql')
const path = require('path')
const fs = require('fs')
const db = mysql.createPool({host:'localhost',user:'root',password:'',database:'blog0629'})

module.exports = function () {
    var router = express.Router()

    router.get('/',function (req,res) {
        let act = req.query.act
        if(act=='del'){       // 删除
            var id = req.query.id
            db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${id}`,function (err,data) {
                if(data.length!=0){
                    fs.unlink('static/upload/'+data[0].src,function (err) {
                        if(err){
                            console.log(err);
                            res.send('file operation err')
                        }else{
                            db.query(`DELETE FROM custom_evaluation_table WHERE ID=${id}`,function (err,data) {
                                if(err){
                                    res.status(500).send('database err').end()
                                }else{
                                    res.redirect('/admin/custom_evaluation')
                                }
                            })
                        }
                    })
                }else{
                    res.send('fail').end()
                }
            })
        }else if(act=='mod'){
            var id = req.query.id
            db.query(`SELECT * FROM custom_evaluation_table`,function (err,data) {
                if(err){
                    res.status(500).send('database err').end()
                }else{
                    if(data.length==0){
                        console.log('27')
                        res.status(404).send('data not found').end()
                    }else{
                        var mod_data = data.filter((item)=>{return item.ID==id})
                        if(mod_data.length==0){
                            console.log(32)
                            res.status(404).send('data not found').end()
                        }else{
                            res.render('./admin/custom_evaluation.ejs',{evaluations:data,mod_data:mod_data[0]})
                        }
                    }
                }
            })
        }else{               // 查询
            db.query(`SELECT * FROM custom_evaluation_table`,function (err,data) {
                if(err){
                    res.status(500).send('database err').end()
                }else{
                    res.render('./admin/custom_evaluation.ejs',{evaluations:data})
                }
            })
        }
    })

    router.post('/',function (req,res) {  // post 请求 判断修改  还是 新增
        console.log('post')
        console.log(req.body)
        var id = req.body.mod_id
        var title = req.body.title
        var description = req.body.description
        var file = req.files[0]
        var oldname = file.path
        var newname = oldname+path.parse(file.originalname).ext
        var src = file.filename + path.parse(file.originalname).ext
        if(req.body.mod_id){
            db.query(`SELECT * FROM custom_evaluation_table WHERE ID=${id}`,function (err,data) {
                if(err){
                    console.error(err)
                    res.send('database err').end()
                }else{
                    console.log('先查询数据')
                    console.log(data)
                    if(data.length==0){
                        res.send('data not found').end()
                    }else{
                        fs.unlink('static/upload/'+data[0].src,function (err) {
                            if(err){
                                res.send('file opration err')
                            }else{
                                console.log('删除成功')
                                var src = file.filename + path.parse(file.originalname).ext
                                fs.rename(oldname,newname,function (err,data) {
                                    if(err){
                                        res.status(500).send('file opration err').end()
                                    }else{
                                        db.query(`UPDATE custom_evaluation_table SET title='${title}',
                                    description='${description}',src='${src}' WHERE ID=${id}`,function (err,data) {
                                            if(err){
                                                res.status(500).send('database err').end()
                                            }else{
                                                console.log('数据设置成功')
                                                res.redirect('/admin/custom_evaluation')
                                            }
                                        })
                                    }
                                })

                            }
                        })
                    }
                }
            })
        }else{
            fs.rename(oldname,newname,function (err,data) {
                if(err){
                    res.status(500).send('database err').end()
                }else{
                    console.log('success')
                    db.query(`INSERT INTO custom_evaluation_table (title,description,src) 
                        VALUES ('${title}','${description}','${src}')`,function (err,data) {
                        if(err){
                            res.status(500).send('database err').end()
                        }else{
                            // res.send('success').end();
                            res.redirect('/admin/custom_evaluation');
                        }
                    })
                }
            })
        }

    })

    return router
}