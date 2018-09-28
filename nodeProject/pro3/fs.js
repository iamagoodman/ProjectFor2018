const fs = require('fs');
// 文件模块   
// readFile (文件名，回调函数) 异步操作 
fs.readFile('aaa.txt',function(err,data){
	if(err){
		console.log('对不起 读取文件失败')
		console.log(err)
	}else{
		console.log(data.toString())
	}
})

 