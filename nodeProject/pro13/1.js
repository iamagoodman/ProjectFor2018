const jade = require('jade');
 
//console.log(jade.renderFile('./view/1.jade',{pretty:true}));
//console.log(jade.renderFile('./view/2.jade',{pretty:true}));
//console.log(jade.renderFile('./view/3.jade',{pretty:true}));
//console.log(jade.renderFile('./view/4.jade',{pretty:true,name:'Frank'}));
console.log(jade.renderFile('./view/5.jade',{pretty:true,
	json:{
		width:'100px',
		height:'200px',
		background:'red'
	}
}));