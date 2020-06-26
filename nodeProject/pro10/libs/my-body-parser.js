const queryString = require('querystring');

module.exports = function (req,res,next) {
    var str = '';
    req.on('data',function (data) {
        str+=data;
    })
    req.on('end',function () {
        req.body = queryString.parse(str);
        next();
    })
}