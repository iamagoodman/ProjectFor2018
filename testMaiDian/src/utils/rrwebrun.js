export function jiami(data) {
    return window.btoa(pako.gzip(encodeURIComponent(JSON.stringify(data)), {to: "string"}));
}
export function rrwebRun() {
    window.memoryArray = [];
    if (sessionStorage.cacheMemory === 'Y' && sessionStorage.memoryArray) {
        window.memoryArray = JSON.parse(sessionStorage.memoryArray) || [];
    }
    window.recordfn = rrweb.record({
    emit(event) {
        // 用任意方式存储event
        window.memoryArray.push(event);
        sessionStorage.memoryArray = JSON.stringify(window.memoryArray);
    },
    // packFn: jiami
    });
}