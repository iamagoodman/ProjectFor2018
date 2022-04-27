import { reactive, toRefs } from 'vue';
import { useCountDown } from '@vant/use';
import { api } from '@/service';
import { formatMobile } from 'utils';
import useLocationQuery from './useLocationQuery';
import useService from './useService';

export default function ({ time = 60 * 1000 } = {}) {
    const state = reactive({
        sendCode: false,
        showCode: false
    });
    const countDown = useCountDown({
        time,
        onFinish: () => {
            state.sendCode = false;
            state.showCode = false;
        }
    });
    const { 
        // productNo, 
        link 
    } = useLocationQuery();
    const { request } = useService({ api: api.captcha, data: {} });

    const onStart = () => {
        countDown.start();
        state.sendCode = true;
    };
    const onReset = () => {
        countDown.reset();
        state.sendCode = false;
    };
    const getCaptcha = (phoneNo) => {
        request({
            phoneNo: formatMobile(phoneNo),
            uniqueId: window.productNo,
            link,
            type: 'CAPTCHA_PRODUCT'
        })
            .then((res) => {
                countDown.reset();
                if (res.reasonCode === '10200') {
                    onStart();
                } else {
                    onReset();
                }
            })
            .catch(() => {
                onReset();
            });
    };

    return {
        ...toRefs(state),
        countDown,
        getCaptcha
    };
}
