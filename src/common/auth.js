import Cookies from 'js-cookie'
import { loadFromSession, saveToSession } from './session-storage'

const TokenKey = 'sk-token'

export function getToken() {
  // return Cookies.get(TokenKey)
  return loadFromSession(TokenKey, '')
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  saveToSession(TokenKey, token)
}

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }
