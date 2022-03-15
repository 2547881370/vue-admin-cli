import { login, logout } from '@/common/api/user.js'
import { getToken, setToken } from '@/common/utils/auth.js'
import SessionStorage from '@/common/utils/session-storage.js'
import { resetRouter } from '@/router'
import { getMenuListByUser } from '@/common/api/menu.js'
import Utils from '@/common/utils/utils'

const state = {
  token: getToken(),
  userId: SessionStorage.loadFromSession('userInfo')?.userId ?? ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_UID: (state, uid) => {
    state.userId = uid
  }
}

const actions = {
  // 用户登录
  login({ dispatch, commit }, userInfo) {
    // 如果是账号登录
    if (userInfo.userName && userInfo.userName?.length > 0) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(async response => {
            const {
              data: { data }
            } = response
            if (data && data.length > 0) {
              const resultUser = data[0]
              commit('SET_TOKEN', userInfo.accessToken)
              commit('SET_UID', resultUser.userId)
              setToken(userInfo.accessToken)
              // 存用户信息
              SessionStorage.saveToSession('userInfo', resultUser)
              // 存路由按钮权限
              try {
                let resultRouter = await dispatch('fetchMenuTreeByUser')
                SessionStorage.saveToSession('userRoutes', resultRouter)
              } catch (e) {
                reject(e)
              } finally {
                resolve()
              }
            } else {
              reject()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },

  // 退出登录
  logout({ commit }, data = { type: null }) {
    return new Promise(async (resolve, reject) => {
      logout(data)
        .then(async () => {
          /* 清除存储的内容 */
          commit('SET_TOKEN', '')
          /* 重置vuex-permission中的动态路由 */
          commit('permission/SET_ROUTES', [], { root: true })
          /* 重置monitoring中的用户关于实时监控面板的设置 */
          commit('resetSetting', null, { root: true })
          sessionStorage.clear()
          await resetRouter()
          resolve()
        })
        .catch(error => {
          return reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      // removeToken()
      sessionStorage.clear()
      resetRouter()
      return resolve()
    })
  },

  // 根据用户获取菜单下拉树列表
  fetchMenuTreeByUser() {
    return new Promise(async (resolve, reject) => {
      try {
        let resultRouter = await getMenuListByUser()
        let routerList = Utils.routerTreeToList(resultRouter.data.data)
        resolve(routerList)
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
