module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'semi': [2, 'always'],
    'no-undef': 1,//不能有未定义的变量
    'no-unneeded-ternary': 2,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
    'no-unreachable': 2,//不能有无法执行的代码
    'no-unused-expressions': 2,//禁止无用的表达式
    'no-var': 0,//禁用var，用let和const代替
    'eqeqeq': 2,//必须使用全等
    'indent': ["error", 2, { "SwitchCase": 1 }],//缩进风格
    'quotes': [2, 'single'],//引号类型 `` "" ''
    'no-multiple-empty-lines': [1, { 'max': 2 }],//空行最多不能超过2行
    'curly': [2, 'all'],//必须使用 if(){} 中的{}
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    "@typescript-eslint/no-this-alias": ["off"],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
