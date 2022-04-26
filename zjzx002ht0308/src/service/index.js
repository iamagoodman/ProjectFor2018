import http from './http';
import api from './url';

function service(api, data) {
    return http[api.method || 'get'](api.url, api.renderData ? api.renderData(data) : data);
}

export default service;
export { api };
