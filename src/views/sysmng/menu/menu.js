// 菜单弹框组件状态 新增,修改,在某个已有的菜单下新增
export const MenuComponentHandleStatus = {
  add: Symbol('add'),
  update: Symbol('update'),
  push: Symbol('push')
}

// 菜单状态
export const MenuStatus = {
  normal: 0,
  disable: 1
}
export const MenuStatusList = [
  {
    codeExplain: '正常',
    codeVal: MenuStatus.normal
  },
  {
    codeExplain: '停用',
    codeVal: MenuStatus.disable
  }
]

// 菜单类型
export const MenuTypeEnum = {
  // 目录
  M: 1,
  // 菜单
  C: 2,
  // 按钮
  F: 3
}
export const MenuTypeEnumCodeList = [
  {
    codeExplain: '目录',
    codeVal: MenuTypeEnum.M
  },
  {
    codeExplain: '菜单',
    codeVal: MenuTypeEnum.C
  },
  {
    codeExplain: '按钮',
    codeVal: MenuTypeEnum.F
  }
]

// 菜单显示状态
export const MenuShowHide = {
  hide: 1,
  show: 0
}
export const MenuShowHideEnumList = [
  {
    codeExplain: '显示',
    codeVal: MenuShowHide.show
  },
  {
    codeExplain: '隐藏',
    codeVal: MenuShowHide.hide
  }
]
