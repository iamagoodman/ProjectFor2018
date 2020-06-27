const ejs = require('ejs');
const fs = require('fs');
ejs.renderFile('views/1.ejs',{name:'Frank'},function(err, data){
	if(err)
		console.log(err)
	else
		fs.writeFile('views/1.pdf',data,function (err) {
			if(err){
				console.log(err)
			}
		})
		// console.log(data)
})
