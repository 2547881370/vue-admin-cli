import { post, get } from '@/common/request'

// 登录
export const login = (data = {}) => {
  return get('/szkj-usersystem/sys-user/login', data)
}

// 退出登录
export function logout(data = {}) {
  return post('/login/loginOut', data)
}

// /user/addUser
// 新增用户
export const addUser = (data = {}) => {
  return post('/user/addUser', data)
}

// /user/changePwd
// 修改密码
export const changePwd = (data = {}) => {
  return post('/user/changePwd', data)
}

// /user/deleteUser/{userId}
// 删除用户
export const deleteUser = (userId = '') => {
  return get('/user/deleteUser/' + userId)
}

// 查询用户
export const queryUser = (data = {}) => {
  return post('/user/queryUser', data)
}

// /user/findUser/{userId}
// 查询单个用户详细
export const findUser = (userId = '') => {
  return get('/user/findUser/' + userId)
}

// /user/getUserByChildDept
// 根据部门获取子部门所属用户信息
export const getUserByChildDept = (data = {}) => {
  return post('/user/getUserByChildDept', data)
}

// /user/getUserByDept/{deptId}
// 根据部门获取所属用户信息
export const getUserByDept = (deptId = '') => {
  return get('/user/getUserByDept/' + deptId)
}

// /user/resetPwd/{userId}
// 重置密码
export const resetPwd = (userId = '') => {
  return get('/user/resetPwd/' + userId)
}

// /systematicRefresh/refresh
// 后端系统缓存数据刷新
export const refresh = (data = {}) => {
  return post('/systematicRefresh/refresh', data)
}
