export default {
  // 校验url
  validURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
  },
  // 校验邮箱
  validEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
  },
  isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  },
  // 登录时，用户名的校验
  validateUsername: (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入正确的用户名'))
    } else {
      callback()
    }
  },
  // 登录时，密码的验证
  validatePwd: (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码长度不符合要求，请重新输入'))
    } else {
      callback()
    }
  }
}
