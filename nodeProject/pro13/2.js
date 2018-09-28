const jade = require('jade');
 
console.log(jade.renderFile('./view/6.jade',{pretty:true,
	arr:['fasd','fdsa','sssss','hghgfhg']
}));