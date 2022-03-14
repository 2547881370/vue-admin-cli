/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * 表单校验函数
 */

// 登录时，用户名的校验
export const validateUsername = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}

// 登录时，密码的验证
export const validatePwd = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码长度不符合要求，请重新输入'))
  } else {
    callback()
  }
}

// 登录-手机号
export let validatePhone = (rule, value, callback) => {
  function checkTel(tel) {
    // let mobile = /^1[3|4|5|6|7|8|9]\d{9}$/,
    let mobile = /^((13[0-9])|(14[7])|(15[0-3,5-9])|(166)|(17[3,6,7,8])|(18[0-9])|(19[1,8,9]))\d{8}$/,
      phone = /^0\d{2,3}-?\d{7,8}$/
    return mobile.test(tel) || phone.test(tel)
  }

  if (!value) {
    return callback(new Error('请输入手机号'))
  } else {
    if (!checkTel(value)) {
      return callback(new Error('请输入有效的手机号'))
    } else {
      return callback()
    }
  }
}

// 身份证
export let checkIdCard = async (rule, value, callback) => {
  //  if (!Number(value)) {
  //    callback(new Error('请输入数字值'))
  //  }

  if (!value) {
    return callback(new Error('请输入身份证号码'))
  } else {
    let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    if (!idcardReg.test(value)) {
      callback(new Error('身份证不合法'))
    } else {
      //  let res = await checkUserIdCard(value)
      //  if (eval(res.data)) {
      //    return callback(new Error('用户身份证号码被占用，请重新输入'))
      //  }
      if (this.information.userSex) {
        let age = value.toString().substring(value.toString().length - 2)
        if (this.information.userSex == 1 && age % 2 == 1) {
          return callback()
        } else if (this.information.userSex == 2 && age % 2 == 0) {
          return callback()
        } else {
          return callback(new Error('身份验证异常，请检查重新输入'))
        }
      } else {
        return callback()
      }
    }
  }
}

// 校验身份证2
export let checkUserCard = async (rule, value, callback) => {
  //  if (!Number(value)) {
  //    callback(new Error('请输入数字值'))
  //  }
  if (!value) {
    return callback(new Error('请输入身份证号码'))
  } else {
    if (value.length != 18) {
      return callback(new Error('身份证号码不符合要求'))
    }
    // let idcardReg = /^[0-9]\d{17}([0-9]|X)$/gi
    let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    if (!idcardReg.test(value)) {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      return callback()
    }
  }
}

// 手机号
export let checkPoliceNumber = (rule, value, callback) => {
  function checkTel(tel) {
    let mobile = /^1[3|4|5|6|7|8|9]\d{9}$/,
      phone = /^0\d{2,3}-?\d{7,8}$/
    return mobile.test(tel) || phone.test(tel)
  }

  if (!value) {
    return callback(new Error('手机号不能为空'))
  } else {
    if (!checkTel(value)) {
      return callback(new Error('号码输入格式错误'))
    } else {
      let show = this.phoneNumberList.indexOf(value)
      if (show == -1) {
        this.phoneNumberList.unshift(value)
      }
      return callback()
    }
  }
}

// 邮箱
export let checkMailBox = async (rule, value, callback) => {
  if (!value) {
    return callback(new Error('邮箱不能为空'))
  } else {
    let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    if (!reg.test(value)) {
      return callback(new Error('邮箱格式不正确，请重新输入'))
    } else {
      // let res = await checkUserMailBox(value)
      let res = {
        data: 1
      }
      if (eval(res.data)) {
        return callback(new Error('邮箱被占用，请重新输入'))
      } else {
        return callback()
      }
    }
  }
}

// 户籍所在地
export let checkDomicilePlace = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('户籍所在地不能为空'))
  } else {
    return callback()
  }
}

// 现居地
export let checkCurrentResidence = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('现居地不能为空'))
  } else {
    return callback()
  }
}

export const validateAccount = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入用户账号'))
  } else {
    if (!/^\w+$/.test(value)) {
      return callback(new Error('用户账号只能包含数字或字母'))
    } else {
      return callback()
    }
  }
}

