import { post } from '@/common/service/axios.config'

// 根据用户获取菜单下拉列表
// /szkj-usersystem/szkj-sys-menu/getMenuListByUser
export const getMenuListByUser = (data = {}) => {
  return post('/szkj-usersystem/szkj-sys-menu/getMenuListByUser', data)
}
