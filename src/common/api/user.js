import { post, get } from '../service/axios.config.js'

// 登录
export const login = (data = {}) => {
  return get('/szkj-usersystem/sys-user/login', data)
}

// 退出登录
export function logout(data = {}) {
  return post('/login/loginOut', data)
}
