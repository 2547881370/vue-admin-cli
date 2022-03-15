import SettingConfig from '@/config/setting.config.js'
import SessionStorage from '@/common/utils/session-storage.js'

export function getToken() {
  return SessionStorage.loadFromSession(SettingConfig.TokenKey, '')
}

export function setToken(token) {
  SessionStorage.saveToSession(SettingConfig.TokenKey, token)
}
