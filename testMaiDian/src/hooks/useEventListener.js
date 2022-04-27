import { watch, unref } from 'vue';
import { isString, isClient } from 'utils';
import { noop, tryOnUnmounted } from './utils';

export default function useEventListener(...args) {
    let target, event, listener, options;
    if (isString(args[0])) {
        [event, listener, options] = args;
        target = isClient ? window : undefined;
    } else {
        [target, event, listener, options] = args;
    }

    let cleanup = noop;

    const stopWatch = watch(
        () => unref(target),
        (el) => {
            cleanup();
            if (!el) {
                return;
            }
            el.addEventListener(event, listener, options);

            cleanup = () => {
                el.removeEventListener(event, listener, options);
                cleanup = noop;
            };
        },
        { immediate: true, flush: 'post' }
    );

    const stop = () => {
        stopWatch();
        cleanup();
    };

    tryOnUnmounted(stop);

    return stop;
}
