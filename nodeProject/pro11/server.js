const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
var server = express();

server.listen(8080);

// server.use(cookieParser('fdsafdsfdsafdsgfd'));

server.use(cookieParser());
server.use(cookieSession({
	keys : ['aaa','bbb','ccc'],
	maxAge:3600*1000
}))

server.use('/',function (req,res) {
	// req.secret = 'fdsafdsfdsafdsgfd';
	// res.cookie('user','quntta',{signed:true})
	// res.clearCookie('user');
	// console.log(req.signedCookies);
	// console.log(req.cookies);
	if(req.session['count']==null){
		req.session['count'] = 1;
	}else{
		req.session['count']++;
	}
	console.log(req.session);
	res.send('ok')
})

// server.use('/',function(req,res){
// 	console.log(req);
// 	res.clearCookie('user');
// 	res.send('nook');
// });