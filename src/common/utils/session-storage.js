/**
 * 存储内容到sessionStorage中，__sk_cms__
 * 为了数据安全隔离，单独建了一个变量 “__sk_cms__”
 * @Author   Author
 * @DateTime 2020-11-24T19:48:27+0800
 * @param    {[type]}                 key   [description]
 * @param    {[type]}                 value [description]
 * @return   {[type]}                       [description]
 */

export default {
  saveToSession(key, value) {
    let sk_cms = window.sessionStorage.__sk_cms__
    if (!sk_cms) {
      sk_cms = {}
    } else {
      sk_cms = JSON.parse(sk_cms)
    }
    sk_cms[key] = value
    window.sessionStorage.__sk_cms__ = JSON.stringify(sk_cms)
  },
  loadFromSession(key, def) {
    let sk_cms = window.sessionStorage.__sk_cms__
    if (!sk_cms) {
      return def
    }
    sk_cms = JSON.parse(sk_cms)
    if (!sk_cms) {
      return def
    }
    let result = sk_cms[key]
    return result || def
  }
}
