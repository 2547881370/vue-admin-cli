export default {
  login: {
    url: '/szkj-usersystem/sys-user/login',

    method: 'get',

    state: true,

    template: () => {
      return {
        msg: '操作成功',
        code: '200',
        data: [
          {
            pageSize: 10,
            pageNumber: 1,
            startTime: null,
            endTime: null,
            total: null,
            userId: '1',
            userCode: '1',
            displayName: '管理员',
            loginName: 'admin',
            loginPassword:
              'PXj5YiBSW1ThEBaBdXWi8Ov7XaB649/UiVtt6UtnccABxZxavJOz7WteMZyDtcJ5kv5uxA0k5ePm2DU6NT08+gDa3Izi1lS9oq4hwD1OwoGWQ6ZY3Z+KDuOEddZPms8tPRbMxjzC7Y85rzYKURHgI5HAjPDLGPKP+Gd0lOoejcE=',
            type: '1',
            isOnline: 1,
            creator: '管理员',
            createTime: '2022-01-01T09:30:00',
            updator: '1',
            updateTime: '2022-03-09T11:05:44.211',
            status: 1,
            sort: 1,
            isDeleted: 0,
            userDetail: null
          }
        ]
        // data: {
        //   UserInArea: {
        //     userId: 1220210520000000,
        //     account: 'admin',
        //     userName: 'admin',
        //     userType: '2',
        //     userPhone: '',
        //     areaId: 1120210520000000,
        //     areaName: '封丘县',
        //     areaX: 113.634366,
        //     areaY: 34.70608,
        //     token:
        //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZG1pbiIsImFyZWFJZCI6IjExMjAyMTA1MjAwMDAwMDAiLCJhcmVhTmFtZSI6IuWwgeS4mOWOvyIsImxvZ2luVHlwZSI6InBjIiwidXNlck5hbWUiOiJhZG1pbiIsImV4cCI6MTYzMDAzNDk0NywidXNlcklkIjoiMTIyMDIxMDUyMDAwMDAwMCJ9.07BKD-kH_40ZAGS31fzuMC3RXQOBg6W9nepn95ZGReY',
        //     changePwd: false,
        //     pid: null
        //   },
        //   // type 1菜单 2路由 3按钮
        //   // purviewId 主键id
        //   // supId 父级id
        //   // order 排序
        //   purview: [
        //     // {
        //     //   purviewId: 'qyai-1',
        //     //   supId: 'qyai',
        //     //   type: '1',
        //     //   name: '健康守护',
        //     //   address: '/health',
        //     //   order: 1,
        //     //   remark: null,
        //     //   typeName: '菜单'
        //     // },
        //     // {
        //     //   purviewId: 'qyai-3',
        //     //   supId: 'qyai',
        //     //   type: '1',
        //     //   name: '统计分析',
        //     //   address: '/analysis',
        //     //   order: 3,
        //     //   remark: null,
        //     //   typeName: '菜单'
        //     // },
        //     {
        //       purviewId: 'qyai-4',
        //       supId: 'qyai',
        //       type: '1',
        //       name: '系统管理',
        //       address: '/sysmng',
        //       order: 4,
        //       remark: null,
        //       typeName: '菜单'
        //     },
        //     // {
        //     //   purviewId: 'qyai-1-1',
        //     //   supId: 'qyai-1',
        //     //   type: '2',
        //     //   name: '实时监控',
        //     //   address: '/primary/monitor',
        //     //   order: 1,
        //     //   remark: null,
        //     //   typeName: '页面'
        //     // },
        //     // {
        //     //   purviewId: 'qyai-3-1',
        //     //   supId: 'qyai-3',
        //     //   type: '2',
        //     //   name: '统计分析',
        //     //   address: '/analysis/warning',
        //     //   order: 1,
        //     //   remark: null,
        //     //   typeName: '页面'
        //     // },
        //     {
        //       purviewId: 'qyai-4-1',
        //       supId: 'qyai-4',
        //       type: '2',
        //       name: '用户管理',
        //       address: '/sysmng/user',
        //       order: 1,
        //       remark: null,
        //       typeName: '页面'
        //     },
        //     {
        //       purviewId: 'qyai-4-4',
        //       supId: 'qyai-4',
        //       type: '2',
        //       name: '菜单管理',
        //       address: '/sysmng/menu',
        //       order: 1,
        //       remark: null,
        //       typeName: '页面'
        //     },
        //     // {
        //     //   purviewId: 'qyai-1-2',
        //     //   supId: 'qyai-1',
        //     //   type: '2',
        //     //   name: '告警管理',
        //     //   address: '/primary/warning-mng',
        //     //   order: 2,
        //     //   remark: null,
        //     //   typeName: '页面'
        //     // },
        //     // {
        //     //   purviewId: 'qyai-4-2',
        //     //   supId: 'qyai-4',
        //     //   type: '2',
        //     //   name: '辖区管理',
        //     //   address: '/sysmng/class',
        //     //   order: 2,
        //     //   remark: null,
        //     //   typeName: '页面'
        //     // },
        //     // {
        //     //   purviewId: 'qyai-1-3',
        //     //   supId: 'qyai-1',
        //     //   type: '2',
        //     //   name: '人员信息',
        //     //   address: '/primary/hcs-user',
        //     //   order: 3,
        //     //   remark: null,
        //     //   typeName: '页面'
        //     // },
        //     {
        //       purviewId: 'qyai-4-3',
        //       supId: 'qyai-4',
        //       type: '2',
        //       name: '角色管理',
        //       address: '/sysmng/role',
        //       order: 3,
        //       remark: null,
        //       typeName: '页面'
        //     },
        //     // {
        //     //   purviewId: 'qyai-1-4',
        //     //   supId: 'qyai-1',
        //     //   type: '2',
        //     //   name: '电子围栏',
        //     //   address: '/primary/area',
        //     //   order: 4,
        //     //   remark: null,
        //     //   typeName: '页面'
        //     // },
        //     {
        //       purviewId: 'qyai-4-5',
        //       supId: 'qyai-4',
        //       type: '2',
        //       name: '系统代码',
        //       address: '/sysmng/code',
        //       order: 5,
        //       remark: null,
        //       typeName: '页面'
        //     },
        //     {
        //       purviewId: 'qyai-4-6',
        //       supId: 'qyai-4',
        //       type: '2',
        //       name: '系统参数',
        //       address: '/sysmng/param',
        //       order: 6,
        //       remark: null,
        //       typeName: '页面'
        //     },
        //     // {
        //     //   purviewId: 'qyai-4-7',
        //     //   supId: 'qyai-4',
        //     //   type: '2',
        //     //   name: '日志管理',
        //     //   address: '/sysmng/logger',
        //     //   order: 7,
        //     //   remark: null,
        //     //   typeName: '页面'
        //     // },
        //     // {
        //     //   purviewId: 'qyai-4-8',
        //     //   supId: 'qyai-4',
        //     //   type: '2',
        //     //   name: '家属用户管理',
        //     //   address: '/sysmng/users',
        //     //   order: 8,
        //     //   remark: null,
        //     //   typeName: '页面'
        //     // },
        //     {
        //       purviewId: 'qyai-1-3-1',
        //       supId: 'qyai-1-3',
        //       type: '3',
        //       name: '添加',
        //       address: 'hcs-user-add-1',
        //       order: 1,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-3-1-1',
        //       supId: 'qyai-3-1',
        //       type: '3',
        //       name: '导出',
        //       address: 'analysis-export-1',
        //       order: 1,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-1-1',
        //       supId: 'qyai-4-1',
        //       type: '3',
        //       name: '查询',
        //       address: 'sysmng-user-query-1',
        //       order: 1,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-2-1',
        //       supId: 'qyai-4-2',
        //       type: '3',
        //       name: '添加',
        //       address: 'sysmng-class-add-1',
        //       order: 1,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-3-1',
        //       supId: 'qyai-4-3',
        //       type: '3',
        //       name: '添加',
        //       address: 'sysmng-role-add-1',
        //       order: 1,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-5-1',
        //       supId: 'qyai-4-5',
        //       type: '3',
        //       name: '添加',
        //       address: 'sysmng-code-add-1',
        //       order: 1,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-6-1',
        //       supId: 'qyai-4-6',
        //       type: '3',
        //       name: '编辑',
        //       address: 'sysmng-param-add-1',
        //       order: 1,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-8-1',
        //       supId: 'qyai-4-8',
        //       type: '3',
        //       name: '详情',
        //       address: 'sysmng-family-detail-1',
        //       order: 1,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-1-3-2',
        //       supId: 'qyai-1-3',
        //       type: '3',
        //       name: '查看',
        //       address: 'hcs-user-view-1',
        //       order: 2,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-1-2',
        //       supId: 'qyai-4-1',
        //       type: '3',
        //       name: '添加',
        //       address: 'sysmng-user-add-1',
        //       order: 2,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-2-2',
        //       supId: 'qyai-4-2',
        //       type: '3',
        //       name: '编辑',
        //       address: 'sysmng-class-edit-1',
        //       order: 2,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-3-2',
        //       supId: 'qyai-4-3',
        //       type: '3',
        //       name: '编辑',
        //       address: 'sysmng-role-edit-1',
        //       order: 2,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-1-3-3',
        //       supId: 'qyai-1-3',
        //       type: '3',
        //       name: '编辑',
        //       address: 'hcs-user-edit-1',
        //       order: 3,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-1-3',
        //       supId: 'qyai-4-1',
        //       type: '3',
        //       name: '查看',
        //       address: 'sysmng-user-view-1',
        //       order: 3,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-2-3',
        //       supId: 'qyai-4-2',
        //       type: '3',
        //       name: '删除',
        //       address: 'sysmng-class-delete-1',
        //       order: 3,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-3-3',
        //       supId: 'qyai-4-3',
        //       type: '3',
        //       name: '删除',
        //       address: 'sysmng-role-delete-1',
        //       order: 3,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-1-3-4',
        //       supId: 'qyai-1-3',
        //       type: '3',
        //       name: '删除',
        //       address: 'hcs-user-delete-1',
        //       order: 4,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-1-4',
        //       supId: 'qyai-4-1',
        //       type: '3',
        //       name: '修改',
        //       address: 'sysmng-user-edit-1',
        //       order: 4,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-1-3-5',
        //       supId: 'qyai-1-3',
        //       type: '3',
        //       name: '健康档案',
        //       address: 'hcs-user-health-1',
        //       order: 5,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-1-5',
        //       supId: 'qyai-4-1',
        //       type: '3',
        //       name: '重置密码',
        //       address: 'sysmng-user-resetpwd-1',
        //       order: 5,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-1-3-6',
        //       supId: 'qyai-1-3',
        //       type: '3',
        //       name: '人员导入',
        //       address: 'hcs-user-importperson-1',
        //       order: 6,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-1-6',
        //       supId: 'qyai-4-1',
        //       type: '3',
        //       name: '注销',
        //       address: 'sysmng-user-delete-1',
        //       order: 6,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-1-3-7',
        //       supId: 'qyai-1-3',
        //       type: '3',
        //       name: '病例导入',
        //       address: 'hcs-user-importcase-1',
        //       order: 7,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-1-7',
        //       supId: 'qyai-4-1',
        //       type: '3',
        //       name: '启用',
        //       address: 'sysmng-user-unlock-1',
        //       order: 7,
        //       remark: null,
        //       typeName: '按钮'
        //     },
        //     {
        //       purviewId: 'qyai-4-1-8',
        //       supId: 'qyai-4-1',
        //       type: '3',
        //       name: '激活',
        //       address: 'sysmng-user-active-1',
        //       order: 8,
        //       remark: null,
        //       typeName: '按钮'
        //     }
        //   ]
        // }
      }
    }
  },

  loginOut: {
    url: '/login/loginOut',

    method: 'post',

    state: true,

    template: () => {
      return {
        msg: '退出成功！',

        code: '000000',

        data: {}
      }
    }
  }
}
