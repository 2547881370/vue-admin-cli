import { get } from '@/common/request'

// 获取token
// /getToken
export const getToken = (params = {}) => {
  return get('/getToken', params)
}
