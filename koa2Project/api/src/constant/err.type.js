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
            code: '10100',
            message: 'token已过期',
            result: ''
        }
    },
    invalidToken: {
        status: 200,
        body: {
            code: '10100',
            message: '无效token',
            result: ''
        }
    },
    isNotAdmin: {
       status: 200,
       body: {
           code: '10008',
           message: '不是管理员',
           result: ''
       }
    },
    fileUploadError: {
        status: 200,
        body: {
            code: '10201',
            message: '商品图片上传失败',
            result: '',
        }
    },
    unSupportedFileType: {
        status: 200,
        body: {
            code: '10202',
            message: '不支持的文件格式',
            result: '',
        }
    },
    isNotLogin: {
        status: 200,
        body: {
            code: '10100',
            message: '用户未登录',
            result: ''
        }
    },
    paramsValid: {
        status: 200,
        body: {
            code: '10008',
            message: '字段校验不通过',
            result: ''
        }
    },
    mockError: {
        status: 200,
        body: {
            code: '10009',
            message: 'mock模块未知错误',
            result: ''
        }
    }
}