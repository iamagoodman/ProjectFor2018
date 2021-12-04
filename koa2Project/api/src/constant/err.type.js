module.exports = {
    userFormateError: {
        status: 400,
        body: {
            code: '10001',
            message: '用户名或密码为空',
            result: ''
        }
    },
    userExited: {
        status: 409,
        body: {
            code: '10002',
            message: '用户已存在',
            result: ''
        }
    }
}