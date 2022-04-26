export function getLocationSearch() {
    let { search, hash } = location;
    const _index = hash.indexOf('?');
    if (!search && _index > -1) {
        search = hash.substring(_index);
    } else if (search && _index > -1) {
        search += '&' + hash.substring(_index + 1);
    }
    return search;
}

export function parseLocationSearch(search = '?') {
    const param = {};
    search.replace(/([^?&]+)=([^?&]+)/g, function (s, v, k) {
        param[v] = decodeURIComponent(k);
        return k + '=' + v;
    });
    return param;
}

export function isMobile(str = '') {
    return (str && /^1\d{10}$/.test(str)) || /^1\d{2}\s\d{4}\s\d{4}$/.test(str);
}

export function formatMobile(str = '') {
    return str.replace(/\s/g, '');
}

export function isIdNumber(str = '') {
    return (
        str &&
        /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}[0-9X]$/.test(str)
    );
}

export function isValidIdNumber(str = '') {
    if (isIdNumber(str)) {
        const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        const parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += Number(str[i]) * factor[i];
        }
        const remain = sum % 11;
        if (parity[remain] !== str[17]) {
            return false;
        }
        return true;
    }
    return false;
}

export function addZero(number) {
    if (number < 10) {
        return `0${number}`;
    } else {
        return `${number}`;
    }
}

export function getGenderByIdCard(id) {
    const re = /^\d{6}((?:19|20)\d{2})(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{2}(\d)[0-9X]$/;
    const matches = id ? id.match(re) : null;
    const gender = Number(matches[4]) % 2 ? '1' : '2'; // M/1 男  F/2 女
    return gender;
}

export function getBirthById(id) {
    const re = /^\d{6}((?:19|20)\d{2})(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{2}(\d)[0-9X]$/;
    const matches = id ? id.match(re) : null;
    if (matches) {
        const year = Number(matches[1]),
            month = Number(matches[2]),
            day = Number(matches[3]),
            gender = Number(matches[4]) % 2 ? 1 : 2; // M/1 男  F/2 女
        return {
            day,
            month,
            year,
            gender,
            birthday: `${year}-${addZero(month)}-${addZero(day)}`
        };
    }
    return {};
}

export function getYMDByDate(date) {
    const newDate = date instanceof Date ? date : new Date(date);
    const year = newDate.getFullYear(),
        month = newDate.getMonth() + 1,
        day = newDate.getDate();
    return [year, month, day];
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function getInfoById(idCard, t = 1, minDay = 28, date) {
    //  以保单生效日期为准
    const timestamp = date ? dayjs(date).valueOf() : Date.now() + DAY_MS * t;

    const [curYear, curMonth, curDay] = getYMDByDate(timestamp);
    const [maxYear, maxMonth, maxDay] = getYMDByDate(timestamp - DAY_MS * minDay);
    let age = -1;
    if (isValidIdNumber(idCard)) {
        const { year, month, day, birthday, gender } = getBirthById(idCard);
        age = curYear - year;
        if (`${maxYear}-${addZero(maxMonth)}-${addZero(maxDay)}` < birthday) {
            age = -1;
        } else if (month > curMonth || (month === curMonth && day > curDay)) {
            age -= 1;
        }
        return {
            age,
            birthday,
            gender
        };
    }

    return {
        age
    };
}

export function isName(str = '') {
    const nameReg = /^[\u4e00-\u9fa5]+[˙•.·．\u4e00-\u9fa5]*[\u4e00-\u9fa5]+$/;
    return str && nameReg.test(str);
}

export function replaceName(str = '') {
    return str.replace(/[˙•.·．]/g, '·');
}

const excludeKey = [
    'productNo',
    'channelNo',
    'channelSec',
    'activityNo',
    'link',
    'companyNo',
    'h5No',
    'channel',
    'tbbchannelNo',
    'tbbproductNo',
    'tbbchannelSec',
    'tbbactivityNo',
    'tbblink',
    'tbbcompanyNo',
    'tbbh5No',
    'tbbchannel',
    'fromUrl',
    'channelUrl',
    'extfromUrl',
    'extchannelUrl',
    'recallScene',
    'recallProvider',
    'extrecallScene',
    'extrecallProvider',
    'businessNo',
    'extbusinessNo'
];

export function filterLocationParams(data) {
    const params = Object.keys(data)
        .filter((key) => excludeKey.indexOf(key) === -1)
        .reduce((total, cur) => {
            total[cur] = data[cur];
            return total;
        }, {});
    return params;
}

export function getLocationParams(data) {
    let channelUrl = {};
    if (data.extchannelUrl || data.channelUrl) {
        channelUrl = parseLocationSearch(data.extchannelUrl || data.channelUrl);
    }
    const map = { ...data, ...channelUrl };
    const params = filterLocationParams(map);
    // const params = Object.keys(map)
    //     .filter((key) => excludeKey.indexOf(key) === -1)
    //     .reduce((total, cur) => {
    //         total[cur] = map[cur];
    //         return total;
    //     }, {});
    return params;
}

export function getJumpUrl(data) {
    let fromUrl = `sourceLink=${data.link}&name=${data.applicant.applicantName}&mobile=${
        data.applicant.mobile
    }&id=${data.applicant.id}&already=${data.already}&productNo=${
        data.productNo || data.common.productNo
    }&policyNo=${data.policyNo}&businessNo=${data.businessNo}`;
    let channelUrl = Object.keys(getLocationParams(data.locationParams))
        .map((key) => `${key}=${data.locationParams[key]}`)
        .join('&');
    let jumpUrl = `${location.origin}/${data.data}?fromUrl=${encodeURIComponent(
        fromUrl
    )}&channelUrl=${encodeURIComponent(channelUrl)}`;
    const { dkey, trackParam, bxm_id, bc_tag } = data.locationParams;
    if (dkey) {
        // 豆盟
        jumpUrl = `${jumpUrl}&dkey=${dkey}&extdkey=${dkey}`;
    }
    if (trackParam) {
        // 豆盟
        jumpUrl = `${jumpUrl}&trackParam=${trackParam}&exttrackParam=${trackParam}`;
    }

    if (bxm_id) {
        // 变现猫
        jumpUrl = `${jumpUrl}&bxm_id=${bxm_id}&extbxm_id=${bxm_id}`;
    }
    if (bc_tag) {
        // 百川
        jumpUrl = `${jumpUrl}&bc_tag=${bc_tag}&extbc_tag=${bc_tag}`;
    }
    return jumpUrl;
}

export function getChannelTranslate(data) {
    const channelTranslate = {};
    const {
        dkey,
        extdkey,
        status,
        extstatus,
        trackParam,
        exttrackParam,
        bxm_id,
        extbxm_id,
        bc_tag,
        extbc_tag
    } = data;
    if (dkey || extdkey) {
        // 豆盟
        channelTranslate.douM = {
            dkey: dkey || extdkey,
            status: status || extstatus,
            trackParam: trackParam || exttrackParam
        };
    }
    if (bxm_id || extbxm_id) {
        // 变现猫
        channelTranslate.bxm = {
            imei: '',
            idfa: '',
            bxmId: bxm_id || extbxm_id,
            type: 1
        };
    }
    if (bc_tag || extbc_tag) {
        // 百川
        channelTranslate.baichuan = {
            bc_tag: bc_tag || extbc_tag,
            type: 3
        };
    }
    channelTranslate.common = {
        ...getLocationParams(data)
    };
    return channelTranslate;
}

export function encryptionMobile(str = '') {
    return str.substr(0, 3) + '****' + str.substr(7, 4);
}

export function parseJson(strData) {
    try {
        const parseData = typeof strData === 'string' ? JSON.parse(strData) : strData;
        return parseData;
    } catch (err) {
        console.log(err);
    }
}

export const zxStorageKey = '__session_storage_key__';

export function getSessionStorage(storageKey) {
    if (!sessionStorage[storageKey]) {
        sessionStorage[storageKey] = '{}';
    }
    const storage = parseJson(sessionStorage[storageKey]) || {};
    function getItem(key) {
        return storage[key];
    }
    function setItem(key, value) {
        const res = { ...storage, [key]: value };
        // sessionStorage(storageKey, JSON.stringify(res));
        sessionStorage[storageKey] = JSON.stringify(res);
    }
    function getStorage() {
        return parseJson(sessionStorage[storageKey]) || {};
    }
    return {
        storage,
        getItem,
        setItem,
        getStorage
    };
}

export const customSessionStorage = getSessionStorage(zxStorageKey);

export function getScroll(target, top) {
    if (typeof window === 'undefined') {
        return 0;
    }
    const prop = top ? 'pageYOffset' : 'pageXOffset';
    const method = top ? 'scrollTop' : 'scrollLeft';
    const isWindow = target === window;
    let ret = isWindow ? target[prop] : target[method];
    if (isWindow && typeof ret !== 'number') {
        ret = document.documentElement[method];
    }
    return ret;
}

export function scrollTo(y, options = {}) {
    const { getContainer = () => window, duration = 450 } = options;
    const container = getContainer();
    const scrollTop = getScroll(container, true);
    const startTime = Date.now();
    const frameFunc = () => {
        const timestamp = Date.now();
        const time = timestamp - startTime;
        const nextScrollTop = easeInOutCubic(
            time > duration ? duration : time,
            scrollTop,
            y,
            duration
        );
        if (container === window) {
            window.scrollTo(window.pageXOffset, nextScrollTop);
        } else {
            container.scrollTop = nextScrollTop;
        }
        if (time < duration) {
            raf(frameFunc);
        }
    };
    raf(frameFunc);
}

export function easeInOutCubic(t, b, c, d) {
    const cc = c - b;
    t /= d / 2;
    if (t < 1) {
        return (cc / 2) * t * t * t + b;
    }
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
}

export const isClient = typeof window !== 'undefined';

export const isString = (val) => typeof val === 'string';

export const isArray = (val) => val && Object.prototype.toString.call(val) === '[object Array]';

export function getRand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export function formatterMobile(val = '') {
    if (val.length > 3 && val.length < 8) {
        return addBlank(val, 3);
    } else if (val.length > 8) {
        const newVal = addBlank(val, 3);
        return addBlank(newVal, 8);
    }
    return val;
}

function addBlank(val = '', addr) {
    const v = val[addr];
    if (v !== ' ') {
        const v1 = val.substr(0, addr),
            v2 = val.substr(addr);
        return v1 + ' ' + v2;
    }
    return val;
}

export function addComma(num = '') {
    return String(num).replace(/\B(?=(\d{3})+$)/g, ',');
}

export function getBasicPolicyData(data) {
    const channelTranslate = getChannelTranslate(data);
    return {
        channelTranslate,
        basic: {
            channel: data.tbbchannel || data.channel,
            link: data.tbblink || data.link,
            recallResource: recall.deflate(JSON.stringify(memoryList), { to: 'string' })
        },
        common: {
            companyNo: data.tbbcompanyNo || data.companyNo,
            channelNo: data.tbbchannelNo || data.channelNo,
            channelSec: data.tbbchannelSec || data.channelSec,
            productNo: data.tbbproductNo || data.productNo,
            activityNo: data.tbbactivityNo || data.activityNo
        }
    };
}

export function isNotEmpty(str) {
    return str !== undefined && str !== null && /\S+/.test(str);
}

export function filterEmpty(data) {
    const n = {};
    for (const d in data) {
        if (isNotEmpty(data[d])) {
            n[d] = data[d];
        }
    }
    return n;
}

export const getNextDate = (time) => {
    let date = new Date();
    if (time) {
        date = new Date(dayjs(time).valueOf());
    }

    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);
    const year = date.getFullYear(),
        month = addZero(date.getMonth() + 1),
        day = addZero(date.getDate());
    return {
        date,
        year,
        month,
        day
    };
};

// export const getNextDate = (d = dayjs(), flag = -1) => {
//     const date = dayjs(d.format('YYYY-MM-DD HH:mm:ss')).add(1, 'month').add(flag, 'd');

//     return {
//         date,
//         year: date.year(),
//         month: addZero(date.month()),
//         day: addZero(date.date())
//     };
// };

export const getPriceKey = (age, socialSecurityType, priceMap) => {
    const currentKey = Object.keys(priceMap).filter((key) => {
        const arr = key.split('~');
        return age >= arr[0] && age <= arr[1];
    });
    return currentKey[0];
};

export const getPrice = (age, socialSecurityType, priceMap) => {
    const currentKey = getPriceKey(age, socialSecurityType, priceMap);
    const index = socialSecurityType === 1 ? 0 : 1;
    return priceMap[currentKey] && priceMap[currentKey][index];
};

export const getPrices = (age, socialSecurityType, priceMap) => {
    const currentKey = getPriceKey(age, socialSecurityType, priceMap);
    const index = socialSecurityType === 1 ? 0 : 1;
    const currentPrice = priceMap[currentKey] || {};
    let sumYear = 0,
        sumMonth = 0,
        list = [];
    for (const code in currentPrice) {
        const item = currentPrice[code][index];
        sumYear = NP.plus(item.year, sumYear);
        sumMonth = NP.plus(item.month, sumMonth);

        list.push({
            code,
            year: item.year,
            month: item.month
        });
    }
    return {
        year: sumYear,
        month: sumMonth,
        list
    };
};

export const getSumPremium = (price, isYear) => {
    return isYear ? price.year : NP.times(price.month, 12);
};

export const getPaymentListYear = (planFee) => {
    const current = dayjs().format('YYYY-MM-DD');
    return [
        {
            payNo: 1,
            planFee,
            planStartDate: current + ' 00:00:00',
            planEndDate: current + ' 23:59:59'
        }
    ];
};

export const getPaymentListMonth = (planFee, waitTime = 30) => {
    const current = dayjs();

    const list = [
        {
            payNo: 1,
            planFee,
            planStartDate: current.format('YYYY-MM-DD 00:00:00'),
            planEndDate: current.format('YYYY-MM-DD 23:59:59')
        }
    ];
    let startDate = null,
        endDate = null;
    for (let i = 2; i <= 12; i++) {
        startDate = current.add(1, 'd').add(i - 1, 'M');
        endDate = startDate.add(waitTime, 'd');
        list.push({
            payNo: i,
            planFee,
            planStartDate: startDate.format('YYYY-MM-DD 00:00:00'),
            planEndDate: endDate.format('YYYY-MM-DD 23:59:59')
        });
    }
    return list;
};

export const getPaymentList = (price, isYear, waitTime = 30) => {
    return isYear ? getPaymentListYear(price.year) : getPaymentListMonth(price.month, waitTime);
};

export function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

export function isPc() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    var flag = true;
    for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

export function getTradeType() {
    if (isPc()) {
        return 'NATIVE';
    } else {
        if (isWeiXin()) {
            return 'JSAPI';
        } else {
            return 'MWEB';
        }
    }
}
