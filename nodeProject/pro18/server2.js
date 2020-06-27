const mysql = require('mysql');
// 连接数据库
var db = mysql.createConnection({host:'localhost',port:'3306',user:'root',password:'',database:'20200627'})
console.log(db);
// 查询 (干啥,回调函数)
// db.query('SELECT * FROM `user_table`;',function(err,data){
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(JSON.stringify(data));
// })
db.query('INSERT into `user_table` (`ID`,`username`,`password`) VALUES (0,"xiaohong","456123");',function(err,data){
	if(err)
		console.log(err);
	else
		console.log(JSON.stringify(data));
})

