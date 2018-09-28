const mysql = require('mysql');
// 连接数据库
var db = mysql.createConnection({host:'localhost',user:'root',password:'',database:'nodetest'})
//console.log(db);
// 查询 (干啥,回调函数)
db.query('SELECT * FROM `user`;',function(err,data){
	if(err)
		console.log(err);
	else
		console.log(JSON.stringify(data));
})
