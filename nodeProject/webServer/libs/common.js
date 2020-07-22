const crypto = require('crypto');

module.exports = {
    MD5_SUFFIX:'JKJfddjkfdskl%$^54356(fdsfd@%$%^565445454)JKJLKKJdfsfds',
    md5:function (str) {
        var obj = crypto.createHash('md5');

        obj.update(str+this.MD5_SUFFIX);

        var str = obj.digest('hex');

        return str
    }
}