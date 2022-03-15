/**
 * @description 导出通用配置
 */
import { I18nType, LanguageKey } from '../common/enum/common.enum'
import LocalStorageUtil from '@/common/utils/local-storage.js'

export default {
  // 语言类型zh-CN、en-US
  i18n: LocalStorageUtil.getItem(LanguageKey) || I18nType.CN,
  baseURL: process.env.NODE_ENV === 'development' ? '/dev-api' : '/prod-api',
  // 读取sessionStorage中的token所用到的key
  TokenKey: 'token'
}
