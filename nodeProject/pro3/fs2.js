const fs = require('fs');
// 文件模块   


// writerFile (文件名，内容，回调)
fs.writeFile('bbb.txt','这是数据这是数据',function(err){
	console.log(err)
})