import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'

import elEn from 'element-ui/lib/locale/lang/en'
import elZh from 'element-ui/lib/locale/lang/zh-CN'

import * as enUS from './en-US'
import * as zhCN from './zh-CN'

Vue.use(VueI18n)

const messages = {
  'en-US': {
    ...enUS.data,
    ...elEn
  },
  'zh-CN': {
    ...zhCN.data,
    ...elZh
  }
}

const i18n = new VueI18n({
  locale: store.getters.getLanguage,
  messages
})

export default i18n
