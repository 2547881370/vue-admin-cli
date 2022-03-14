import Vue from 'vue'
export const moduleEvent = new Vue()

/*
 * 判断传入的变量是否为空
 * @param {string || object || array} str
 */
export const isContent = str => {
  if (str != null && str != undefined) {
    if (typeof str == 'string') {
      return str != ''
    } else if (Array.isArray(str)) {
      return str.length > 0
    } else if (typeof str == 'number') {
      return str != '' && !isNaN(str)
    } else if (Object.prototype.toString.call(str) == '[object Object]') {
      return Object.keys(str).length > 0
    } else {
      return true
    }
  } else {
    return false
  }
}

/**
 * 判断传入的变量是否为空 - 严格模式
 * @param {string || object || array || number || NaN || Null || Undefined} str
 * @return {boolean}
 */
export const isStrictContent = value => {
  switch (Object.prototype.toString.call(value)) {
    case '[object Null]':
      return false
      break
    case '[object Undefined]':
      return false
      break
    case '[object Number]':
      if (isNaN(value)) {
        return false
      } else {
        return true
      }
      break
    case '[object String]':
      return value != ''
      break
    case '[object Array]':
      return value.length > 0
      break
    case '[object Object]':
      return Object.keys(value).length > 0
      break
    default:
      return false
      break
  }
}

/**
 * @summary 扁平化数据转tree【一】
 * @param {Array} list
 * @param {String} key 树节点的主键字段名称，如id
 * @param {String} pKey 树节点的父级外键字段名称，如pId
 * @param {String} topPKeyValue 顶级节点的父级外键的值，如'0',默认用空
 * @param {String} childName
 * @returns {*}
 */
export function formatTree(list, key, pKey, topPKeyValue = '0', childName = 'children') {
  // 深拷贝源数据
  let copyedObj = JSON.parse(JSON.stringify(list))
  return copyedObj.filter(parent => {
    let findChildren = copyedObj.filter(child => {
      // console.log(parent[key], child[pKey], key)
      return parent[key] === child[pKey]
    })
    // 返回顶层，依据实际情况判断这里的返回值
    if (findChildren.length > 0) parent[childName] = findChildren
    return parent[pKey] == topPKeyValue || parent[pKey] === '' || parent[pKey] == undefined || parent[pKey] == null
  })
}

/**
 * @summary 扁平化数据转tree【二】
 * @param {Array} list
 * @param {String} key 树节点的主键字段名称，如id
 * @param {String} pKey 树节点的父级外键字段名称，如pId
 * @param {String} topPKeyValue 顶级节点的父级外键的值，如'0',默认用空
 * @param {String} childName
 * @returns {*}
 */
export function formatTree2(list, key, pKey, topPKeyValue = '0', childName = 'children') {
  // 深拷贝源数据
  let copyedObj = JSON.parse(JSON.stringify(list))
  return copyedObj.filter(parent => {
    let findChildren = copyedObj.filter(child => {
      return parent[key] === child[pKey]
    })
    // 返回顶层，依据实际情况判断这里的返回值
    if (findChildren.length > 0) parent[childName] = findChildren
    return parent[key] == topPKeyValue || parent[pKey] === '' || parent[pKey] == undefined || parent[pKey] == null
  })
}

/**
 * tree扁平化成数组
 * @param tree
 * @param result
 * @param level
 * @returns {*[]}
 */
export function treeToList(tree, result = [], level = 0) {
  tree.forEach(node => {
    result.push(node)
    node.level = level + 1
    node.children && treeToList(node.children, result, level + 1)
  })
  return result
}

/**
 * 实现多维数组对象的扁平化
 * @param {Array} [obj], 期望转换的数组对象
 * @param {String} key, 关键字
 */
export function flatArr([obj], key) {
  let temp = obj[key]
  let result = [obj]

  if (temp && temp.constructor === Array) {
    // 1.将子级 push 到父级（造成二维数组 [obj, [children]]）
    // 2.递归子级的扁平化（清理子级中的第三维）
    result.push(temp.map(item => flatArr([item], key)).flat())
  }
  // 清理输出内容中的二维
  return result.flat()
}

/**
 * @summary tree树形结构, 获取指定id的所有父级id
 * @param {Number} id
 * @param data
 * @returns {[]}
 */
export function getParentIds(id, data, idName = 'id') {
  // 深度遍历查找
  function dfs(data, id, parents) {
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      // 找到id则返回父级id
      if (item[idName] === id) return parents
      // children不存在或为空则不递归
      if (!item.children || !item.children.length) continue
      // 往下查找时将当前id入栈
      parents.push(item[idName])

      if (dfs(item.children, id, parents).length) return parents
      // 深度遍历查找未找到时当前id 出栈
      parents.pop()
    }
    // 未找到时返回空数组
    return []
  }

  return dfs(data, id, [])
}

export function composeTree(list = [], idName = 'areaId', pidName = 'pid', childrenName = 'children') {
  const data = JSON.parse(JSON.stringify(list)) // 浅拷贝不改变源数据
  const result = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item[childrenName]
  })
  const map = {}
  data.forEach(item => {
    map[item[idName]] = item
  })
  data.forEach(item => {
    const parent = map[item[pidName]]
    if (parent) {
      ;(parent[childrenName] || (parent[childrenName] = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * @summary 遍历tree,查找指定id的数据对象
 * @param id
 * @param data
 * @param idName
 * @param childName
 * @return {Object}
 */
export function getTreeOneData(id, data, idName = 'id', childName = 'children') {
  let hasFound = false, // 表示是否有找到id值
    result = null
  let fn = function(data) {
    if (Array.isArray(data) && !hasFound) {
      // 判断是否是数组并且没有的情况下，
      data.forEach(item => {
        if (item[idName] === id) {
          // 数据循环每个子项，并且判断子项下边是否有id值
          result = item // 返回的结果等于每一项
          hasFound = true // 并且找到id值
        } else if (item[childName]) {
          fn(item[childName]) // 递归调用下边的子项
        }
      })
    }
  }
  fn(data) // 调用一下
  return result
}

/**
 * 获取tree有多少级
 */
export function treeCount(data, count = 0) {
  for (let index = 0; index < data.length; index++) {
    let b = data[index]
    count += 1
    if (b.children) {
      return treeCount(b.children, count)
    } else {
      return count
    }
  }
}

/**
 * @summary 获取指定节点下下的所有子节点
 * @param [Array] nodes
 * @param [Number] item
 * @param [Array] arr
 * @param [String] pKey 父级key名称
 * @param [String] idName id名称
 * @return [Array<Number>]
 * this.getChildNode(data , id, [])
 */
export function getChildNode(nodes, item, arr, pKey = 'pid', idName = 'id') {
  for (let el of nodes) {
    if (el[pKey] === item) {
      arr.push(el[idName])
      if (el.children) {
        childsNodeDeepWay(el.children, arr, idName)
      }
    } else if (el.children) {
      getChildNode(el.children, item, arr, pKey, idName)
    }
  }
  return arr
}

/**
 * 获取tree所有节点id
 * @param options
 * @param [options.list] Array
 * @param [options.ids] Array
 * @param [options.excludeId] string 排除的id
 * @param [options.keyId] string id的健
 */
export function getTreeIds({ list, ids = [], excludeId, keyId = 'id' }) {
  for (let index = 0; index < list.length; index++) {
    let b = list[index]
    if (b.children) {
      if (excludeId != b[keyId]) ids.push(b[keyId])
      getTreeIds({ list: b.children, ids, excludeId, keyId })
    } else {
      if (excludeId != b[keyId]) ids.push(b[keyId])
    }
  }
  return ids
}

function childsNodeDeepWay(nodes, arr, idName = 'id') {
  if (nodes)
    nodes.forEach(ele => {
      arr.push(ele[idName])
      if (ele.children) {
        childsNodeDeepWay(ele.children, arr, idName)
      }
    })
}

/**
 * 遍历tree树,每条数据额外新增字段
 * @param options.childName string
 * @param options.data List
 * @param options.newData Data 新增字段
 */
export function forEachTreeAddData({ data, newData = {}, childName = 'children' }) {
  for (let index = 0; index < data.length; index++) {
    let item = data[index]
    item = Object.assign(item, newData)
    item['childName'] &&
      forEachTreeAddData({
        data: item['childName'],
        childName,
        newData
      })
  }
}

/**
 * 2015-03-12 12:00
 * 转换
 * Thu Mar 19 2015 12:00:00 GMT+0800 (中国标准时间)
 * @summary 时间字符串转标准时间
 * @param {String} date
 * @return {Date}
 */
export function parserDate(date) {
  let t = Date.parse(date)
  if (!isNaN(t)) {
    return new Date(Date.parse(date.replace(/-/g, '/')))
  } else {
    return new Date()
  }
}

/**
 * Date对象或毫秒数
 * 转换
 * 2015-03-12 12:00:15
 * @summary Date对象或毫秒数转时间字符串
 * @param {String} date Date对象或毫秒数
 * @return {Date}
 */
export function parserDateStr(date) {
  if (!date) {
    return ''
  }
  if (Object.prototype.toString.call(date) != '[object Date]') {
    date = new Date(date)
  }
  return (
    date.getFullYear() +
    '-' +
    formatNumber(date.getMonth() + 1) +
    '-' +
    formatNumber(date.getDate()) +
    ' ' +
    formatNumber(date.getHours()) +
    ':' +
    formatNumber(date.getMinutes()) +
    ':' +
    formatNumber(date.getSeconds())
  )
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * @summary 计算多少天后的日期
 * @param {Number} AddDayCount
 * @return {string}
 * @constructor
 *
 * "前天："+GetDateStr(-2)
 *  昨天："+GetDateStr(-1)
 *  今天："+GetDateStr(0)
 *  明天："+GetDateStr(1)
 *  后天："+GetDateStr(2)
 *  大后天："+GetDateStr(3)
 */
export function getDateStr(AddDayCount) {
  let dd = new Date()
  dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
  let y = dd.getFullYear()
  let m = dd.getMonth() + 1 // 获取当前月份的日期
  let d = dd.getDate()
  return y + '-' + m + '-' + d
}

/**
 * 超过10万的用万为单位
 * @param num
 * @returns {string}
 */
export function makeFriendly(num) {
  if (num >= 100000) {
    num = Math.round(num / 1000) / 10 + '万'
  }
  return num
}

/*
 * 参数名称：
 * number：要格式化的数字
 * decimals：保留几位小数
 * dec_point：小数点符号
 * thousands_sep：千分位符号
 * */
export function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  let n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
    dec = typeof dec_point === 'undefined' ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      let k = Math.pow(10, prec)
      return '' + Math.ceil(n * k) / k
    }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  let re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

/**
 * 脱敏身份证
 */
export function secretUserCard(str) {
  if (str) {
    str = str.replace(/(\w{8})\w*(\w{2})/, '$1********$2')
    return str
  }
}
