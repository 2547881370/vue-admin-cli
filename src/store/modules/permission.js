import { asyncRoutes, constantRoutes, endBasicRoutes } from '@/router'

const state = {
  // 按钮权限
  btns: [],
  routes: constantRoutes,
  addRoutes: []
}

/**
 * @summary 扁平化数据转tree
 * @param {Array} list
 * @param {String} key 树节点的主键字段名称，如id
 * @param {String} pKey 树节点的父级外键字段名称，如pId
 * @param {String} topPKeyValue 顶级节点的父级外键的值，如'',默认用空
 * @returns {*}
 */
function formatTree(list, key, pKey, topPKeyValue) {
  return list.filter(parent => {
    let findChildren = list.filter(child => {
      // console.log(parent[key], child[pKey], key)
      return parent[key] === child[pKey]
    })
    // 返回顶层，依据实际情况判断这里的返回值
    if (findChildren.length > 0) parent.children = findChildren
    return parent[pKey] == topPKeyValue || parent[pKey] == '' || parent[pKey] == undefined || parent[pKey] == null
  })
}

/**
 * 前端动态路由是否在后端返回的路由权限中
 * @param asyncRoutes - 前端动态路由表
 * @param path -前端静态配置的路由表具体路由对象
 */
function getPermissionOfAsyncRoutes(asyncRoutes, id) {
  for (let index = 0; index < asyncRoutes.length; index++) {
    const element = asyncRoutes[index]
    if (element.id == id) {
      return element
    }
    if (element.originChild) {
      element.children = element.originChild
    }
    if (element.children) {
      element.originChild = element.children
      let target = getPermissionOfAsyncRoutes(element.children, id)
      if (target) {
        return target
      }
    }
  }
  return null
}

/**
 * Filter asynchronous routing tables by recursion
 * @param asyncRoutes 前端配置的动态路由表
 * @param routes 接口返回的有权限的路由
 * 两者做一个匹配
 */
export function filterAsyncRoutes(asyncRoutes, routes) {
  for (let index = 0; index < routes.length; index++) {
    let route = routes[index]
    let aRoute = getPermissionOfAsyncRoutes(asyncRoutes, route.menuId)
    if (aRoute) {
      aRoute.order = route.orderNum
      aRoute.parentId = route.parentId
      aRoute.path = route.path
      if (aRoute.meta && route.menuName) {
        aRoute.meta.title = route.menuName
      }
      routes[index] = aRoute
    } else {
      routes.splice(index, 1)
      index--
    }
  }
  routes.forEach(route => {
    route.children = null
  })

  // 菜单排序
  routes.sort((a, b) => {
    return a.order - b.order
  })

  // 有数据
  let res = formatTree(routes, 'id', 'parentId', '99')

  return res
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_BUTTONS: (state, btns) => {
    state.btns = btns
  }
}

const actions = {
  /**
   * @param {routes} 接口返回的路由
   */
  generateRoutes({ commit }, routes) {
    // 菜单路由（type为1或者2的是路由/页面菜单权限）
    let menuRoles = routes.filter(item => {
      return item.menuType == '1' || item.menuType == '2'
    })

    // 按钮权限表（type为3的代表可以显示的按钮权限）
    let btnPermissions = routes.filter(item => {
      return item.menuType == '3'
    })

    let btns = []
    if (btnPermissions && btnPermissions.length > 0) {
      btnPermissions.forEach(item => {
        btns.push(item.icon || null)
      })
    }
    commit('SET_BUTTONS', btns)

    return new Promise(resolve => {
      let accessedRoutes = filterAsyncRoutes(asyncRoutes, menuRoles)
      accessedRoutes.push(...endBasicRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
