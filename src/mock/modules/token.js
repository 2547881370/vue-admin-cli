export default {
  getToken: {
    url: '/getToken',
    method: 'get',
    state: true,
    template: () => {
      return {
        state: true,
        msg: '',
        data: 'D56E7C322D994B3FB7EC0B9CFD38526B',
        code: 200
      }
    }
  }
}
