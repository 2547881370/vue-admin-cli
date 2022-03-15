import axios from 'axios'
import { Message } from 'element-ui'
import config from '../../config/index'
import { ResponseStatusEnum } from '../enum/common.enum'
import { getToken } from '@/common/utils/auth.js'
import Utils from '@/common/utils/utils.js'

/* 配置接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8*/
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
/* 配置接口地址 接口地址在系统常量中配置*/
axios.defaults.baseURL = config.baseURL
/* 配置接口请求超时*/
axios.defaults.timeout = 120000

/* 声明一个数组用于存储每个ajax请求的取消函数和ajax标识*/
let pending = []

let cancelToken = axios.CancelToken
let removePending = ever => {
  for (let p in pending) {
    if (pending[p].u === ever.url + '&' + ever.method) {
      // 当当前请求在数组中存在时执行函数体
      pending[p].f() // 执行取消操作
      pending.splice(Number(p), 1) // 把这条记录从数组中移除
    }
  }
}

axios.interceptors.request.use(
  config => {
    let token = getToken() || ''
    config.headers['Authorization'] = 'Bearer ' + token

    // 如果get  请求有缓存，可以加这段代码
    if (config.method === 'get') {
      const now = `${Date.now()}`
      if (config.params) {
        config.params[now] = now
      } else {
        const hasParams = config.url.includes('?')
        config.url = config.url + (hasParams ? '&' : '?') + `${now}=${now}`
      }
    }

    removePending(config) // 在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken(c => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ u: config.url + '&' + config.method, f: c })
    })

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  res => {
    removePending(res.config)

    /* 对响应数据做处理*/
    // 如果http状态码不是200
    if (res.status !== ResponseStatusEnum.success) {
      conductRes(res.status, 'error', res.data, res)
    }
    // 否则http状态码为200，但服务器返回的状态码不是200
    if (res.status === ResponseStatusEnum.success && res.data.status !== ResponseStatusEnum.success) {
      conductRes(res.data.code, 'warning', res.data.msg, res)
    }
    return Promise.resolve(res)
  },
  error => {
    // 取消的请求不做提示
    if (error.__proto__.__CANCEL__) {
      return Promise.reject(error)
    }
    let messageText = ''
    let messageType = 'error'
    if (!error.response) {
      // 网络错误
      messageText = Utils.translate('tips.networkError')
    } else if (!error.response.data) {
      //
      messageText = Utils.translate('tips.noResponse')
    } else {
      messageText = error.response.data.message || error.response.data
    }
    message(messageText, messageType)
    return Promise.reject(error) // 返回接口返回的错误信息
  }
)

/**
 * 处理响应数据
 * @param status ResponseStatusEnum
 * @param messageType MessageType
 * @param messageText string
 * @param res AxiosResponse
 */
function conductRes(status, messageType, messageText, res) {
  switch (status) {
    case ResponseStatusEnum.notFound:
      messageText = Utils.translate('tips.network401')
      break
    // 无权限401
    case ResponseStatusEnum.noAuth:
      messageText = Utils.translate('tips.network401')
      break
    // 登录过期403
    case ResponseStatusEnum.authTimeout:
      messageText = Utils.translate('tips.network403')
      // Utils.clearLoginInfo();
      // 延迟跳转，便于用户阅读弹窗信息
      // setTimeout(() => {
      //     router.replace({ name: 'login', query: { redirect: router.currentRoute.name } })
      // }, 1500);
      break
    default:
      break
  }
  message(messageText, messageType)
}

/**
 * message提示
 */
let messageObj
function message(messageText, type) {
  if (messageText == '') {
    return false
  }
  if (messageObj) {
    messageObj.close()
    messageObj = null
  }
  messageObj = Message({ message: messageText, type: type, showClose: true })
}

const get = (url, params = {}) => {
  return axios.request({
    url,
    method: 'get',
    params
  })
}

const post = (url, data = {}) => {
  return axios.request({
    url,
    method: 'post',
    data
  })
}

export { get, post }
