const jade = require('jade');
const fs = require('fs');
var str = jade.renderFile('./view/index.jade',{pretty:true});
fs.writeFile('./build/test.html',str,function(err){
	if(err)
		console.log('编译失败');
	else
		console.log('成功');
})
