import { ref } from 'vue';
import { Toast } from 'vant';
import service from '@/service';

export default function (
    { api, data = {}, showToast = true, showSuccessToast = false, immediate = false } = {},
    { success = () => {}, failure = () => {} } = {}
) {
    const result = ref(undefined);
    const toast = (msg) => {
        if (showToast) {
            Toast(msg || '');
        }
    };
    const request = (rdata = data) => {
        return service(api, rdata)
            .then((res) => {
                if (res.data.reasonCode === '10200') {
                    result.value = res.data.data;
                    success(res.data);
                    showSuccessToast && toast(res.data.reasonDesc || '成功   ');
                    return Promise.resolve(res.data);
                } else {
                    failure(res.data);
                    toast(res.data.reasonDesc || '失败');
                    return Promise.resolve(res.data);
                }
            })
            .catch((err) => {
                toast(err.message || err.reasonDesc || '失败');
                failure(err);
                return Promise.reject(err);
            });
    };
    if (immediate) {
        request();
    }
    return {
        result,
        request
    };
}
