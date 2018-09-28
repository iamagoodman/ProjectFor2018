const crypto = require('crypto')

module.exports = {
	key:'fsdfkjsKLJKDS东方大厦%#%@#FDsfds',
	md5: function(str){
		var obj = crypto.createHash('md5')
		obj.update(str)
		var str = obj.digest('hex')
		return str
	}
}
