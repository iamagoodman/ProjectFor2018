import { getCurrentInstance, onMounted, onUnmounted, nextTick } from 'vue';

export function tryOnMounted(fn, sync = true) {
    if (getCurrentInstance()) {
        onMounted(fn);
    } else if (sync) {
        fn();
    } else {
        nextTick(fn);
    }
}

export function tryOnUnmounted(fn) {
    if (getCurrentInstance()) {
        onUnmounted(fn);
    }
}

export const noop = () => {};
