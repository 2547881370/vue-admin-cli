import { post } from '@/common/request'

// 获取所有字典枚举类型
// /config/queryCode
export const getAllCode = () => {
  return post('/config/queryCode', { page: -1, status: 1 })
}
