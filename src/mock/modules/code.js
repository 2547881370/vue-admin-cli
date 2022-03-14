export default {
  queryCode: {
    url: '/config/queryCode',
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
