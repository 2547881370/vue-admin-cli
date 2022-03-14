import Vue from 'vue'

import Cookies from 'js-cookie'

/**
 * 开发环境使用mock数据，如果开发环境要连接真实接口，注释掉下面三行即可
 */
if (process.env.NODE_ENV === 'development') {
  require('@/mock/index.js')
}

// a modern alternative to CSS resets
import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './directive/drag.js'
import './directive/btn-permission.js'

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'small'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
