const express = require('express');

var server = express();

server.listen(8080)

server.get('/a.html',function (req,res) {
    res.send('www/a.html');
    res.end();
})