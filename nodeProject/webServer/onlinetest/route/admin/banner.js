const express = require('express')
const mysql = require('mysql')

const db = mysql.createPool({host:'182.92.194.83',user:'root',password:'admin123456',database:'blog0629'})

module.exports = function(){
    var router = express.Router();
    router.get('/',function (req,res) {
        switch (req.query.act) {
            case "del":
                db.query(`DELETE FROM banner_table WHERE ID=${req.query.id}`,(err,data)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send('database err').end();
                    }else{
                        console.log('删除成功')
                        res.redirect('/admin/banner')
                    }
                })
                break;
            case "mod":console.log('mod')
                db.query(`SELECT * FROM banner_table WHERE ID=${req.query.id}`,(err,data)=>{
                    if(err){
                        res.status(500).send('database err').end()
                    }else if(data.length==0){
                        res.status(404).send('data not found').end()
                    }else{
                        db.query(`SELECT * FROM banner_table`,(err,banners)=>{
                            if(err){
                                res.status(500).send('database err').end();
                            }else if(banners.length==0){
                                res.status(404).send('data not found').end();
                            }else{
                                console.log(data);
                                res.render('./admin/banner.ejs',{banners,modify_data:data[0]})
                            }
                        })
                    }
                })
                break;
            default:
                db.query(`SELECT * FROM banner_table`,(err,data)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send('database err').end();
                    }else{
                        if(data.length==0){
                            res.render('./admin/banner.ejs',{banners:[]})
                        }else{
                            res.render('./admin/banner.ejs',{banners:data})
                        }
                    }
                })
        }
    })
    router.post('/',function (req,res) {
        var title = req.body.title;
        var description = req.body.description;
        var href = req.body.href;
        var mod_id = req.body.mod_id;
        if(!title||!description||!href){
            res.status(404).send('对不起你请求的数据不正确').end();
        }else{
            if(mod_id){  // 修改
                db.query(`UPDATE banner_table SET title='${title}',
                description='${description}',href='${href}' WHERE ID=${mod_id}`,
                    (err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('database err').end()
                        }else{
                            res.redirect('/admin/banner')
                        }
                    })
            }else{            // 新增
                db.query(`INSERT INTO banner_table (title,description,href) VALUE ('${title}','${description}','${href}')`,(err,data)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send('database err').end();
                    }else{
                        res.redirect('/admin/banner');
                    }
                })
            }

        }

    })
    return router
}

