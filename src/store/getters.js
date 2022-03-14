const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  // add_routes 是动态遍历出来的的路由
  add_routes: state => state.permission.addRoutes,
  // 按钮权限
  buttons: state => state.permission.btns,
  permission_routes: state => state.permission.routes
}
export default getters
