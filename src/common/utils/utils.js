import i18n from '@/i18n'
export default {
  /**
   * 脱敏身份证
   */
  secretUserCard(str) {
    if (str) {
      str = str.replace(/(\w{8})\w*(\w{2})/, '$1********$2')
      return str
    }
  },

  /**
   * @summary 扁平化数据转tree
   * @param {Array} list
   * @param {String} key 树节点的主键字段名称，如id
   * @param {String} pKey 树节点的父级外键字段名称，如pId
   * @param {String} topPKeyValue 顶级节点的父级外键的值，如'',默认用空
   * @returns {*}
   */
  formatTree(list, key, pKey, topPKeyValue) {
    return list.filter(parent => {
      let findChildren = list.filter(child => {
        // console.log(parent[key], child[pKey], key)
        return parent[key] === child[pKey]
      })
      // 返回顶层，依据实际情况判断这里的返回值
      if (findChildren.length > 0) parent.children = findChildren
      return parent[pKey] == topPKeyValue || parent[pKey] == '' || parent[pKey] == undefined || parent[pKey] == null
    })
  },

  /**
   * 路由tree结构扁平化,同时拼接path
   * @param tree
   * @param result
   * @param level
   * @param path
   * @param previousNode
   * @returns {*[]}
   */
  routerTreeToList(tree, result = [], level = 0, path = [], previousNode = {}) {
    tree.forEach((node, index) => {
      result.push(node)
      node.level = level + 1
      if (node.menuType != 3) {
        if (node.level === 1) {
          path = [node.path]
        } else {
          if (index === 0) {
            previousNode = node
          }
          if (index !== 0 && previousNode.level === node.level) {
            path.pop()
          }
          path.push(node.path)
        }
        node.path = path.join('')
      }
      node.children && this.routerTreeToList(node.children, result, level + 1, path, previousNode)
    })
    return result
  },

  // 国际化
  translate(key, param = {}) {
    if (i18n.te(key)) {
      return i18n.t(key, param)
    }
    return key
  }
}
