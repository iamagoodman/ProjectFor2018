const http = require('http');
//const querystring = require('querystring');
const urllib = require('url');
http.createServer(function(req,res){
	var GET,OBJ;
//	if(req.url.indexOf('?')!=-1){
//		GET=querystring.parse(req.url.split('?')[1]);		
//	}else{
//		GET=req.url;
//	}
	OBJ = urllib.parse(req.url,true)
	console.log(OBJ.query)
//	console.log(OBJ.parseName)
//	console.log(GET)
	res.write('aaa');
	res.end();
}).listen(8080)
