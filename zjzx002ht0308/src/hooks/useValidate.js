import { ref, watch, isRef } from 'vue';
import debounce from 'lodash.debounce';
import { validate } from 'utils';

export default function (
    { defaultMessage = {}, delay = 500, reactiveData = {}, strategyMap } = {
        defaultMessage: {},
        delay: 500,
        reactiveData: {}
    }
) {
    const errorMessage = ref(defaultMessage || {});
    const judge = (value, includeBlank) => {
        return validate(value, includeBlank, strategyMap);
    };
    const onValidate = (value, includeBlank) => {
        const errs = judge(value, includeBlank);
        if (errs.length) {
            errs.forEach((err) => {
                errorMessage.value[err.key] = err.message;
            });
            return false;
        }
        return true;
    };

    const onValidateInput = debounce((key, value) => {
        onValidate({ [key]: value }, false);
    }, delay);

    const onValidateBlur = (key, value, flag = true) => {
        let newValue = value;
        if (typeof value === 'object') {
            newValue = value.target.value;
        }
        onValidate({ [key]: newValue }, flag);
    };

    const changeErrorMessage = (key, value) => {
        errorMessage.value[key] = value;
    };
    for (const key in reactiveData) {
        if (isRef(reactiveData[key])) {
            watch(reactiveData[key], () => {
                errorMessage.value[key] = '';
            });
        }
    }

    return {
        validate: onValidate,
        validateInput: onValidateInput,
        validateBlur: onValidateBlur,
        changeErrorMessage,
        errorMessage,
        judge
    };
}
