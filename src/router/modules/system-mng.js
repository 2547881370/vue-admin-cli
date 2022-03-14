/* Layout */
import Layout from '@/layout'

const sysmngRouter = {
  id: '1',
  path: '/sysmng',
  name: 'sysmng',
  component: Layout,
  alwaysShow: true,
  meta: { title: '系统管理', icon: 'setting', noCache: true },
  children: [
    {
      id: '9',
      path: '/sysmng/user',
      name: 'user',
      component: () => import('@/views/demo'),
      meta: { title: '用户管理', icon: 'user', noCache: true }
    },
    {
      id: '5',
      path: '/sysmng/role',
      name: 'role',
      component: () => import('@/views/demo'),
      meta: { title: '角色管理', icon: 's-custom', noCache: true }
    },
    {
      id: '2',
      path: '/sysmng/menu',
      name: 'sysmngMenu',
      component: () => import('@/views/sysmng/menu/index'),
      meta: { title: '菜单管理', icon: 'menu', noCache: true }
    },
    {
      id: '7',
      path: '/sysmng/dept',
      name: 'dept',
      component: () => import('@/views/demo'),
      meta: { title: '部门管理', icon: 'menu', noCache: true }
    }
    // {
    //   id: 'qyai-4-5',
    //   path: '/sysmng/code',
    //   name: 'code',
    //   component: () => import('@/views/demo'),
    //   meta: { title: '系统代码', icon: 's-order', noCache: true }
    // },
    // {
    //   id: 'qyai-4-6',
    //   path: '/sysmng/param',
    //   name: 'param',
    //   component: () => import('@/views/demo'),
    //   meta: { title: '系统参数', icon: 's-platform', noCache: true }
    // }
  ]
}

export default sysmngRouter
