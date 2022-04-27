import { getInfoById, isName, isValidIdNumber, isMobile, isArray } from './utils'

export const basicStrategyMap = {
  mobile: [
    {
      message: '手机号不能为空',
      test: (value) => !!value,
    },
    {
      message: '手机号码格式不正确',
      test: (value) => isMobile(value),
    },
  ],
  captcha: [
    {
      message: '验证码不能为空',
      test: (value) => !!value,
    },
    {
      message: '验证码格式不正确',
      test: (value) => /^\d{4}$/.test(value),
    },
  ],
  name: [
    {
      message: '姓名不能为空',
      test: (value) => !!value,
    },
    {
      message: '姓名格式不正确',
      test: (value) => isName(value),
    },
  ],
  idNumber: [
    {
      message: '身份证号码不能为空',
      test: (value) => !!value,
    },
    {
      message: '身份证号码格式不正确',
      test: (value) => isValidIdNumber(value),
    },
  ],
}

export const strategyMap = {
  mobile: [...basicStrategyMap.mobile],
  captcha: [...basicStrategyMap.captcha],
  name: [...basicStrategyMap.name],
  idNumber: [
    ...basicStrategyMap.idNumber,
    {
      message: '投保年龄需为18-50周岁（含）',
      test: (value) => {
        const { age } = getInfoById(value, 0, 0)
        if (age < 18 || age > 50) {
          return false
        }
        return true
      },
    },
  ],
}

export function validateItem(value, rules, includeBlank = false) {
  let errorMessage = ''
  if (rules instanceof Array) {
    for (let i = 0; i < rules.length; i++) {
      const item = rules[i]
      errorMessage = test(value, item, includeBlank) || ''
      if (errorMessage) {
        break
      }
    }
  } else {
    errorMessage = test(value, rules, includeBlank) || ''
  }

  return errorMessage
}

export function test(value, rule = () => {}, includeBlank = false) {
  if (!includeBlank && !value) {
    return undefined
  }
  if (!rule.test(value)) {
    return rule.message
  }
}

export function validateMap(valueMap, includeBlank = false) {
  const errs = []
  Object.keys(valueMap).forEach((key) => {
    const strategy = strategyMap[key]
    const errorMessage = validateItem(valueMap[key], strategy, includeBlank)
    if (errorMessage) {
      errs.push({ key, message: errorMessage })
    }
  })
  return errs
}

export function validateArr(values, includeBlank = false) {
  const errs = []
  for (const v of values) {
    const strategy = [...basicStrategyMap[v.key], ...(v.rules || [])]
    const errorMessage = validateItem(v.value, strategy, includeBlank)
    if (errorMessage) {
      errs.push({ key, message: errorMessage })
    }
  }
  return errs
}

export function validate(value, includeBlank = false) {
  return isArray(value) ? validateArr(value, includeBlank) : validateMap(value, includeBlank)
}
