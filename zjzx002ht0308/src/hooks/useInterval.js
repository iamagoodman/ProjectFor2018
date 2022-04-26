import { ref } from 'vue';
import { isClient } from 'utils';
import { tryOnUnmounted } from './utils';

export default function (fn, delay, options = { immediate: true }) {
    const { immediate = true, immediateCallback = false } = options;
    let timer = null;
    const isActive = ref(false);
    function clean() {
        // 清除计时器
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function pause() {
        isActive.value = false;
        clean();
    }

    function resume() {
        if (delay <= 0) {
            return;
        }
        isActive.value = true;
        if (immediateCallback) {
            fn();
        }
        clean();
        timer = setInterval(fn, delay);
    }

    if (immediate && isClient) {
        // 立即执行
        resume();
    }

    tryOnUnmounted(pause);

    return {
        isActive,
        pause,
        resume
    };
}
