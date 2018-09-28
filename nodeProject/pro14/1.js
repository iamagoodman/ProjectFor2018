const ejs = require('ejs');

ejs.renderFile('1.ejs',{name:'Frank'},function(err,data){
	if(err)
		console.log(err)
	else
		console.log(data)
})
