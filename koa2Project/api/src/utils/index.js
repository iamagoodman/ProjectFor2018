const createValidMessage = (errList) => {
  const currentErr = errList[0]
  return {
      status: 200,
      body: {
        code: '10008',
        message: `字段:${currentErr.field}, ${currentErr.message}`,
        result: ''
      }
  }
}

module.exports = {
  createValidMessage
}