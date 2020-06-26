const express = require('express');
const expressStatic = require('express-static')
var server = express();
server.listen(8080)


var users = {
    'quntta':'123456',
    'zhangsan':'123456'
}
server.get('/login',function (req,res) {
    console.log(req.query);
    var user = req.query['user'];
    var pass = req.query['pass'];
    if(users[user]&&users[user]==pass){
        res.send({'message':'ok'})
    }
    if(!users[user]){
        res.send({'message':'用户不纯在'})
    }
    if(users[user]&&users[user]!=pass){
        res.send({'message':'密码不正确'})
    }
})

server.use(expressStatic('./www'));