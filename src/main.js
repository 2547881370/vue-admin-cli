/**
 * 开发环境使用mock数据，如果开发环境要连接真实接口，注释掉下面三行即可
 */
if (process.env.NODE_ENV === 'development') {
  require('@/mock/index')
}

import Vue from 'vue'
import 'normalize.css/normalize.css'
import i18n from './i18n'
import './common/plugins'

import App from './App.vue'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './directive/drag'
import './directive/btn-permission'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
