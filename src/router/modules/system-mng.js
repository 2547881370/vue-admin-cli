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
    }
  ]
}

export default sysmngRouter
