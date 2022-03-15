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
