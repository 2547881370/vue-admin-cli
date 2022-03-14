import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/common/auth.js'
import store from '@/store'

let baseURL = undefined
// 正式环境不需要使用mock
if (process.env.NODE_ENV === 'development') {
  baseURL = 'api/'
} else {
  baseURL = process.env.VUE_APP_URL
}

// baseURL = process.env.VUE_APP_URL + '/szkj-gateway/'

let token = getToken() || ''

const instance = axios.create({
  baseURL,
  // 超时时间 120 秒
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器 添加token， 判断登录之类操作
instance.interceptors.request.use(
  config => {
    /* 意外情况token为空 */
    token = getToken() || ''
    if (token) {
      //  让每个请求携带token-- ['token']为自定义key 请根据实际情况自行修改
      config.headers['accessToken'] = token
      config.headers['Cache-Control'] = 'no-cache'
    }

    // 在这里做认证，可以从store里面获取token
    // config.headers['Authorization'] = `Bearer ${store.getters.getAccessToken}`

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

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器，对返回数据进行预处理
instance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code != '200') {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(res.msg)
    }
    return response
  },
  error => {
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      // Message.closeAll()
      Message({
        message: '异常：请求超时',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject('异常：请求超时')
    }
    if (error.message.indexOf('Network Error') !== -1) {
      Message({
        message: '异常：网络异常',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject('异常：网络异常')
    }
    if (error && !error.response) {
      return Promise.reject(error)
    }
    const {
      response: { status, statusText, data = {} }
    } = error
    switch (status) {
      case 404:
        // 请求丢失
        console.log('【404】访问异常，请联系系统管理员')
        return Promise.reject('访问异常，请联系系统管理员')
        break
      case 500:
        console.log('【500】服务器异常，请联系系统管理员')
        return Promise.reject('服务器异常，请联系系统管理员')
        break
      default:
        return Promise.reject(data.message || statusText)
        break
    }
  }
)
/**
 * 对 请求进行封装 只有 status 与 code 都是200 才会进入 then , 否则均进入 catch
 * 如果http状态码 200,但是返回体中的code为507,则表示当前请求被锁定, 应该抛出异常
 * @param {*} options
 */
const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    instance(options)
      .then(({ data, msg, status, statusText }) => {
        if (status === 200) {
          if (data && data.code === '507') {
            reject(new Error(data.msg))
          } else if (data.code === '301') {
            Message.closeAll()
            Message({
              message: data.msg,
              type: 'error'
            })
            reject(new Error(data.msg))
          } else {
            resolve(data)
          }
        } else {
          reject(new Error(msg) || statusText)
        }
      })
      .catch(result => {
        if (result && !result.response) {
          reject(result)
          return
        }
        const {
          response: { status, statusText, data = {} }
        } = result
        switch (status) {
          // 未登录
          case 401:
            sessionStorage.clear()
            reject('您还未登录')
            break
          case 403:
            reject('登录失效')
            break
          case 404:
            reject('访问异常，请联系系统管理员')
            // 请求丢失
            break
          default:
            reject(data.message || statusText)
            break
        }
      })
  })
}

const get = (url, params = {}) => {
  return request({
    url,
    method: 'get',
    params
  })
}

const put = (url, data = {}) => {
  return request({
    url,
    method: 'put',
    data
  })
}

const post = (url, data = {}) => {
  return request({
    url,
    method: 'post',
    data
  })
}

const downBypost = (url, data = {}) => {
  return request({
    url,
    method: 'post',
    data,
    responseType: 'blob' // 表明返回服务器返回的数据类型
  })
}

const downByGet = url => {
  return request({
    url,
    method: 'get',
    responseType: 'blob' // 表明返回服务器返回的数据类型
  })
}

const del = (url, data = {}) => {
  return request({
    url,
    method: 'delete',
    data
  })
}

// 将获取cancelToken的方法绑定到每个方法上面，方便调用的时候使用
;[request, get, post, put, del, instance].forEach(item => {
  item.getCancelToken = () => {
    return axios.CancelToken
  }
})

/**
 * request 对请求进行二次包装，处理了异常编码
 * get
 * set
 * axios 对axios进行包装之后的原生实例
 */
export { request, get, post, downBypost, put, del, downByGet, instance as axios, baseURL }
