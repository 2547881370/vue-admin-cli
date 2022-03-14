import { loadFromSession } from '@/common/session-storage'
import Vue from 'vue'
import VueRouter from 'vue-router'

/* Layout */
import Layout from '@/layout'

Vue.use(VueRouter)

// 拿到匹配路由的第一个
function getFirstRouter() {
  let routeArr = loadFromSession('userRoutes', [])
  for (let index = 0; index < routeArr.length; index++) {
    const route = routeArr[index]
    for (let i = 0; i < routeArr.length; i++) {
      if (routeArr[i].parentId == route.menuId) {
        return routeArr[i].path
        break
      }
    }
  }
  // 没有拿到匹配的路由，不能跳转到主页面，给一个提示
  // Message.warning('当前用户没有权限访问页面')
  return '/login'
}

// 动态生成登录后的跳转页
function getHomePage() {
  // let routeArr = loadFromSession('userRoutes', [])
  // // console.log(routeArr)
  // for (let i = 0; i < routeArr.length; i++) {
  //   if (routeArr[i].address == '/primary/monitor') {
  //     return '/primary/monitor'
  //   }
  //   if (routeArr[i].address == '/health/monitor') {
  //     return '/health/monitor'
  //   }
  // }
  return getFirstRouter()
}

/**
 * constantRoutes
 * 所有角色都有的通用路由菜单
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    meta: { title: 'redirect' },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: { title: '登录' },
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: Layout,
    hidden: true,
    meta: { title: '主页面' },
    redirect: () => getHomePage()
    // children: [
    // {
    //   path: 'home',
    //   component: () => import('@/views/home/index'),
    //   name: 'Home',
    //   meta: { title: '主页面', icon: 's-promotion', affix: true }
    // }
    // ]
  }
]

/**
 * 总是需要在VueRouter最末尾的路由，添加到动态路由的后面
 */
export const endBasicRoutes = [
  // 无权限页面
  {
    path: '/no-permission',
    name: 'NoPermission',
    hidden: true,
    component: () => import('@/views/error-page/no-permission'),
    meta: {
      title: '访问无权限'
    }
  },
  // 404 页面路由
  {
    path: '*',
    name: 'NotFound',
    hidden: true,
    component: () => import('@/views/error-page/404'),
    meta: {
      title: '页面走丢了'
    }
  }
]

/**
 * 动态路由
 * 根据角色和后端返回的路由来匹配
 */
export const asyncRoutes = []

/**
 * 如果系统页面模块比较多，也可以分模块写
 */
/**
 * 自动扫描 modules 里面的路由模块，路由模块请根据业务自行拆分
 * modules 里面只能存放动态路由（需要根据权限来选择的路由）
 * 插入到 asyncRoutes 中
 * 基础路由全部写到constantRoutes中
 */
const files = require.context('./modules', false, /\.js$/)
files.keys().forEach(key => {
  const file = files(key).default
  // 根据导出的内容判断是否数组，如果数组需使用扩展运算符
  if (Array.isArray(file)) {
    asyncRoutes.push(...file)
  } else {
    asyncRoutes.push(file)
  }
})

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// 重置路由菜单
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export async function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
