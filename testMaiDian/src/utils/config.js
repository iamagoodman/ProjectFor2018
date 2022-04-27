const isDev = process.env.NODE_ENV === 'development';

export const prefixOrigin = isDev ? 'http://10.59.100.112:8088/' : location.origin;
