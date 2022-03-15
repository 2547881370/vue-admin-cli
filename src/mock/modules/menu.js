export default {
  // 获取用户菜单权限
  getMenuListByUser: {
    url: '/szkj-usersystem/szkj-sys-menu/getMenuListByUser',
    method: 'post',
    state: true,
    template: () => {
      return {
        state: true,
        msg: '',
        data: [
          {
            menuId: '1',
            menuName: '系统管理',
            parentId: '99',
            orderNum: 1,
            path: '/system',
            menuCode: '1',
            menuType: 1,
            visible: 0,
            menuStatus: 0,
            icon: 'moon',
            creator: null,
            createTime: null,
            updator: null,
            updateTime: null,
            isDeleted: 0,
            systemId: null,
            meta: {
              icon: 'moon',
              title: '系统管理'
            },
            children: [
              {
                menuId: '9',
                menuName: '用户管理',
                parentId: '1',
                orderNum: 3,
                path: '/user',
                menuCode: '9',
                menuType: 2,
                visible: 0,
                menuStatus: 0,
                icon: 'user-app',
                creator: null,
                createTime: null,
                updator: null,
                updateTime: null,
                isDeleted: 0,
                systemId: null,
                meta: {
                  icon: 'user-app',
                  title: '用户管理'
                },
                children: [
                  {
                    menuId: '10',
                    menuName: '用户删除',
                    parentId: '9',
                    orderNum: 2,
                    path: null,
                    menuCode: '10',
                    menuType: 3,
                    visible: 0,
                    menuStatus: 0,
                    icon: '',
                    creator: null,
                    createTime: null,
                    updator: null,
                    updateTime: null,
                    isDeleted: 0,
                    systemId: null,
                    meta: {
                      icon: '',
                      title: null
                    },
                    perms: 'user-delete'
                  }
                ]
              }
            ]
          }
        ],
        code: 200
      }
    }
  }
}
