import router from './router'
import store from './store'
import { loadFromSession } from '@/common/session-storage'
import { Message } from 'element-ui'
import { getToken } from '@/common/auth' // get token from cookie
import getPageTitle from '@/common/get-page-title'

const whiteList = ['/login', '/auth-redirect', '/singleLogion'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  let hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      if (loadFromSession('userRoutes', []).length < 1) {
        // 路由权限表不存在
        // 退出登录
        await store.dispatch('user/resetToken')
        next(`/login?redirect=${to.path}`)
        return
      }
      // if is logged in, redirect to the home page
      next({ path: '/', replace: true })
    } else {
      // 如果动态路由存在，则直接next
      if (store.getters.add_routes.length > 0) {
        next()
      } else {
        // 否则，再次尝试动态生成路由
        if (loadFromSession('userRoutes', []).length < 1) {
          // 路由权限表不存在
          // 退出登录
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          return
        }
        try {
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', loadFromSession('userRoutes') || [])
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          // 退出登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    console.log(3)
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next('/login')
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
  // 路由完成后的钩子函数
})
