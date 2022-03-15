import _ from 'lodash'
export default {
  /**
   * 新增
   * @param key string
   * @param obj obj
   */
  addItem(key, obj) {
    if (_.isString(obj)) {
      localStorage.setItem(key, obj)
    } else {
      localStorage.setItem(key, JSON.stringify(obj))
    }
  },

  /**
   * 修改
   * @param key string
   * @param obj Object
   */
  updateItem(key, obj) {
    const item = localStorage.getItem(key)
    if (!_.isNull(item)) {
      localStorage.setItem(key, JSON.stringify(obj))
    } else {
    }
  },

  /**
   * 删除
   */
  deleteItem(key) {
    const item = localStorage.getItem(key)
    if (!_.isNull(item)) {
      localStorage.removeItem(key)
    } else {
      // console.error(`the ${key} is not exists`);
    }
  },

  /**
   * 获取key
   */
  getItem(key) {
    return localStorage.getItem(key)
  },

  getObjectItem(key) {
    let valye = localStorage.getItem(key)
    if (_.isNull(valye)) {
      return {}
    } else {
      return JSON.parse(valye)
    }
  },

  /**
   * 清空全部
   */
  deleteAll() {
    localStorage.clear()
  }
}
