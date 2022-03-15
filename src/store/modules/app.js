import Cookies from 'js-cookie'
import Config from '../../config/setting.config'
import { LanguageKey } from '../../common/enum/common.enum'
import LocalStorageUtil from '@/common/utils/local-storage.js'
import i18n from '@/i18n'

const state = {
  sidebar: {
    // 左侧菜单栏 关闭/展开 boolean
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true
  },
  // 语言
  language: Config.i18n
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  // 更新语言类型
  UPDATE_USER_INFO: (state, language) => {
    state.language = language
    i18n.locale = language
    LocalStorageUtil.addItem(LanguageKey, language)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
