import { login, logout } from '@/api/user'
import { getToken, setToken } from '@/common/auth'
import { saveToSession, loadFromSession } from '@/common/session-storage'
import { resetRouter } from '@/router'
import { getMenuListByUser } from '@/api/menu'

/**
 * 路由tree结构扁平化,同时拼接path
 * @param tree
 * @param result
 * @param level
 * @param path
 * @param previousNode
 * @returns {*[]}
 */
export function routerTreeToList(tree, result = [], level = 0, path = [], previousNode = {}) {
  tree.forEach((node, index) => {
    result.push(node)
    node.level = level + 1
    if (node.menuType != 3) {
      if (node.level === 1) {
        path = [node.path]
      } else {
        if (index === 0) {
          previousNode = node
        }
        if (index !== 0 && previousNode.level === node.level) {
          path.pop()
        }
        path.push(node.path)
      }
      node.path = path.join('')
    }
    node.children && routerTreeToList(node.children, result, level + 1, path, previousNode)
  })
  return result
}

const state = {
  token: getToken(),
  userId: loadFromSession('userInfo')?.userId ?? ''
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
            const { data } = response
            if (data && data.length > 0) {
              const resultUser = data[0]
              commit('SET_TOKEN', userInfo.accessToken)
              commit('SET_UID', resultUser.userId)
              setToken(userInfo.accessToken)
              // 存用户信息
              saveToSession('userInfo', resultUser)
              // 存路由按钮权限
              try {
                let resultRouter = await dispatch('fetchMenuTreeByUser')
                saveToSession('userRoutes', resultRouter)
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
  logout({ commit, dispatch }, data = { type: null }) {
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
        let routerList = routerTreeToList(resultRouter.data)
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
