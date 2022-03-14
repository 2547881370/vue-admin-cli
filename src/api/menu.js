import { post, get } from '@/common/request'

// 根据用户获取菜单下拉列表
// /szkj-usersystem/szkj-sys-menu/getMenuListByUser
export const getMenuListByUser = (data = {}) => {
  return post('/szkj-usersystem/szkj-sys-menu/getMenuListByUser', data)
}

// 获取所有菜单
export const getMenuTreeApi = (data = {}) => {
  return post('/szkj-usersystem/szkj-sys-menu/getMenuTree', data)
}

// 新增/修改菜单下拉树列表
export const saveOrUpdateMenu = (data = {}) => {
  return post('/szkj-usersystem/szkj-sys-menu/saveOrUpdateMenu', data)
}

// 获取菜单详情
export const szkjSysMenuInfo = (params = {}) => {
  return get('/szkj-usersystem/szkj-sys-menu', params)
}

// 删除菜单
export const szkjSysMenuDelete = (menuId = '') => {
  return post(`/szkj-usersystem/szkj-sys-menu/delete?menuId=${menuId}`)
}
