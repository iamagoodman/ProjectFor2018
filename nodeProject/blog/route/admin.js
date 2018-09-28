var express = require('express')
const common = require('../libs/common.js')
const mysql = require('mysql')

var db = mysql.createPool({host:'localhost',user:'root',password:'',database:'blog'})
module.exports = function(){
	var router = express.Router()
//	router.get('/',function(req,res){
////		res.render('../template/1.ejs',{title:'我是标题',a:12,b:8})
//		res.send('我是admin').end()
//	})
	router.use((req,res,next)=>{
		console.log(req.url)
		if(!req.session['admin_id'] && req.url!='/login'){ // 没有登录
			res.redirect('/admin/login')
		}else{
			next()
		}
	})
	router.get('/login',function(req,res){
		res.render('admin/login.ejs',{})
	})
	router.post('/login',function(req,res){
		console.log(req.body)
		var username = req.body.username
		var password = common.md5(req.body.password+common.key)
		
		db.query(`SELECT * FROM admin_table WHERE username='${username}'`,(err,data)=>{
			if(err){
				console.log(err)
				res.status(500).send('database err').end()
			}else{
				if(data.length==0){
					res.status(400).send('no this admin').end()
				}else{
					if(password==data[0].password){
						req.session['admin_id']=data[0].ID
						res.redirect('/admin/')
					}else{
						res.status(400).send('you are wrong')
					}
						
				}
			}
		})
	
	})
	router.get('/',(req,res)=>{
		res.render('../template/admin/index.ejs')
	})
	router.get('/banner',(req,res)=>{
		res.render('../template/admin/banner.ejs')
	})
	router.post('/banner',(req,res)=>{
		console.log(req.body)
		var title = req.body.title
		var description = req.body.description
		var href = req.body.href
		console.log(title)
		if(!title || !description || !href){
			res.status(400).send('arg err').end()
		}else{
			db.query(`INSERT INTO banner_table (title,description,href) VALUE('${title}','${description}','${href}')`,(err,data)=>{
				if(err){
					console.log(err)
					res.status(500).send('database err').end()
				}else{
//					res.send('ok').end()
					res.redirect('/admin/banner')
				}
			})
		}
	})
	return router
}
