import { get } from '../service/axios.config.js'

// 获取token
// /getToken
export const getToken = (params = {}) => {
  return get('/getToken', params)
}
