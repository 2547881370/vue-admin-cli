const getters = {
  sidebar: state => state.app.sidebar,
  // add_routes 是动态遍历出来的的路由
  add_routes: state => state.permission.addRoutes,
  // 按钮权限
  buttons: state => state.permission.btns,
  permission_routes: state => state.permission.routes,
  getLanguage: state => state.app.language
}
export default getters
