import { parseLocationSearch, getLocationSearch } from 'utils';

export default function () {
    const params = parseLocationSearch(getLocationSearch());
    return {
        ...params
    };
}
