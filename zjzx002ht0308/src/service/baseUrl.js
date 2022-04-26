export let baseURL = ''
export let trackURL = ''
switch (process.env.NODE_ENV) {
  case 'dev':
    baseURL = '/api'
    trackURL = ''
    break
  case 'test':
    baseURL = '/bxb-broker'
    trackURL = ''
    break
  case 'prod':
    baseURL = '/jc/bxb-broker'
    trackURL = '/jc'
    break
}
export default { baseURL, trackURL }
