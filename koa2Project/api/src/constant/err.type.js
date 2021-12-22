module.exports = {
    userFormateError: {
        status: 200,
        body: {
            code: '10001',
            message: '用户名或密码为空',
            result: ''
        }
    },
    userExited: {
        status: 200,
        body: {
            code: '10002',
            message: '用户已存在',
            result: ''
        }
    },
    userRegisterError: {
        status: 200,
        body: {
            code: '10003',
            message: '注册出错',
            result: ''
        }
    },
    userNotExist: {
        status: 200,
        body: {
            code: '10004',
            message: '用户不存在',
            result: ''
        }
    },
    userNOrPError: {
        status: 200,
        body: {
            code: '10005',
            message: '用户或密码错误',
            result: ''
        }
    },
    userLoginError: {
        status: 200,
        body: {
            code: '10006',
            message: '用户名登录失败',
            result: ''
        }
    },
    notKnowError: {
        status: 200,
        body: {
            code: '10007',
            message: '未知错误',
            result: ''
        }
    },
    tokenExpiredError: {
        status: 200,
        body: {
            code: '10101',
            message: 'token已过期',
            result: ''
        }
    },
    invalidToken: {
        status: 200,
        body: {
            code: '10102',
            message: '无效token',
            result: ''
        }
    }
}