import { message } from 'antd';
import { isNotEmpty, isNumber, isExist, isMobile, compareThan } from './util';
const strategies = {
  isNotEmpty,
  isNumber,
  isExist,
  isMobile,
};

interface Rule {
  strategy: string;
  value?: any;
  message: string;
  isSkip?: boolean;
  compareThan?: any;
  compare?: string;
  compareValue?: number;
}

export default function validate(rules: Rule[]) {
  for (const rule of rules) {
    const strategy = strategies[rule.strategy];
    const value = rule.value;

    if (!rule.isSkip) {
      if (rule.compareValue !== undefined && rule.compareValue !== null) {
        const r = compareThan(value, rule.compareValue);
        const b = rule.compare === 'less' ? r <= 0 : r > 0;

        if (!b) {
          message.warning(rule.message);
          return false;
        }
      } else if (value && value.constructor === Array) {
        if (value.length === 0) {
          message.warning(rule.message);
          return false;
        }
        for (const v of value) {
          if (!strategy(v)) {
            message.warning(rule.message);
            return false;
            break;
          }
        }
      } else if (!strategy(value)) {
        message.warning(rule.message);
        return false;
        break;
      }
    }
  }
  return true;
}
