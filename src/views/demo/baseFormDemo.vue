<template>
  <div class="base-form-container">
    <base-form inline :options="formOptions" @submit="onSubmit" @reset="onReset" v-model="queryForm"> </base-form>
  </div>
</template>

<script>
const MenuStatusList = [
  {
    codeExplain: '正常',
    codeVal: 1
  },
  {
    codeExplain: '停用',
    codeVal: 2
  }
]

const CascaderData = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'shejiyuanze',
        label: '设计原则',
        children: [
          {
            value: 'yizhi',
            label: '一致'
          },
          {
            value: 'fankui',
            label: '反馈'
          },
          {
            value: 'xiaolv',
            label: '效率'
          },
          {
            value: 'kekong',
            label: '可控'
          }
        ]
      },
      {
        value: 'daohang',
        label: '导航',
        children: [
          {
            value: 'cexiangdaohang',
            label: '侧向导航'
          },
          {
            value: 'dingbudaohang',
            label: '顶部导航'
          }
        ]
      }
    ]
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout 布局'
          },
          {
            value: 'color',
            label: 'Color 色彩'
          },
          {
            value: 'typography',
            label: 'Typography 字体'
          },
          {
            value: 'icon',
            label: 'Icon 图标'
          },
          {
            value: 'button',
            label: 'Button 按钮'
          }
        ]
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio 单选框'
          },
          {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          },
          {
            value: 'input',
            label: 'Input 输入框'
          },
          {
            value: 'input-number',
            label: 'InputNumber 计数器'
          },
          {
            value: 'select',
            label: 'Select 选择器'
          },
          {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          },
          {
            value: 'switch',
            label: 'Switch 开关'
          },
          {
            value: 'slider',
            label: 'Slider 滑块'
          },
          {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          },
          {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          },
          {
            value: 'upload',
            label: 'Upload 上传'
          },
          {
            value: 'rate',
            label: 'Rate 评分'
          },
          {
            value: 'form',
            label: 'Form 表单'
          }
        ]
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table 表格'
          },
          {
            value: 'tag',
            label: 'Tag 标签'
          },
          {
            value: 'progress',
            label: 'Progress 进度条'
          },
          {
            value: 'tree',
            label: 'Tree 树形控件'
          },
          {
            value: 'pagination',
            label: 'Pagination 分页'
          },
          {
            value: 'badge',
            label: 'Badge 标记'
          }
        ]
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert 警告'
          },
          {
            value: 'loading',
            label: 'Loading 加载'
          },
          {
            value: 'message',
            label: 'Message 消息提示'
          },
          {
            value: 'message-box',
            label: 'MessageBox 弹框'
          },
          {
            value: 'notification',
            label: 'Notification 通知'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'NavMenu 导航菜单'
          },
          {
            value: 'tabs',
            label: 'Tabs 标签页'
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          },
          {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          },
          {
            value: 'steps',
            label: 'Steps 步骤条'
          }
        ]
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog 对话框'
          },
          {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          },
          {
            value: 'popover',
            label: 'Popover 弹出框'
          },
          {
            value: 'card',
            label: 'Card 卡片'
          },
          {
            value: 'carousel',
            label: 'Carousel 走马灯'
          },
          {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }
        ]
      }
    ]
  },
  {
    value: 'ziyuan',
    label: '资源',
    children: [
      {
        value: 'axure',
        label: 'Axure Components'
      },
      {
        value: 'sketch',
        label: 'Sketch Templates'
      },
      {
        value: 'jiaohu',
        label: '组件交互文档'
      }
    ]
  }
]

let CheckboxData = [
  {
    value: '1',
    label: '组件',
    state: false
  },
  {
    value: '2',
    label: '组件1',
    state: false
  },
  {
    value: '3',
    label: '组件2',
    state: false
  }
]
import BaseForm from '@/components/base-form/base-form.vue'
import { FormTypeEnum } from '@/components/base-form/enums/base-form-enum'
export default {
  name: 'baseFormDemo',
  components: {
    BaseForm
  },
  data() {
    return {
      queryForm: {},
      formOptions: [
        {
          // 控件类型
          type: FormTypeEnum.text,
          // 控件提示
          placeholder: '请输入输入框',
          // 是否必填
          required: false,
          // 是否禁用
          disabled: false,
          // 字段值name
          prop: 'nameValue',
          label: '输入框',
          trim: true // 去除前后空格
        },
        {
          type: FormTypeEnum.selector,
          placeholder: '请选择下拉',
          required: false,
          disabled: false,
          prop: 'menuType',
          label: '下拉单选',
          // 是否多选
          multi: false,
          // 下拉字典值列表
          itemList: MenuStatusList,
          // 下来字典值列表中的key value名称
          itemProp: {
            label: 'codeExplain',
            value: 'codeVal'
          }
        },
        {
          type: FormTypeEnum.selector,
          placeholder: '状态多选',
          required: false,
          disabled: false,
          prop: 'menuTypeMultiChoice',
          label: '状态多选',
          // 是否多选
          multi: true,
          // 下拉字典值列表
          itemList: MenuStatusList,
          // 下来字典值列表中的key value名称
          itemProp: {
            label: 'codeExplain',
            value: 'codeVal'
          }
        },
        {
          // 控件类型
          type: FormTypeEnum.password,
          // 控件提示
          placeholder: '请输入密码',
          // 是否必填
          required: false,
          // 是否禁用
          disabled: false,
          // 字段值name
          prop: 'password',
          label: '密码类型'
        },
        {
          // 控件类型
          type: FormTypeEnum.number,
          // 控件提示
          placeholder: '请输入数字',
          // 是否必填
          required: false,
          // 是否禁用
          disabled: false,
          // 字段值name
          prop: 'numberValue',
          label: '数字类型'
        },
        {
          // 控件类型
          type: FormTypeEnum.textarea,
          // 控件提示
          placeholder: '请输入文本域',
          // 是否必填
          required: false,
          // 是否禁用
          disabled: false,
          // 字段值name
          prop: 'textareaValue',
          label: '文本域类型',
          rows: 2 // 输入框行数，只对 type="textarea" 有效
        },
        {
          type: FormTypeEnum.cascader,
          placeholder: '级联选择',
          required: false,
          disabled: false,
          prop: 'cascaderValue',
          label: '级联选择',
          // 下拉字典值列表
          itemList: CascaderData,
          // itemProp对应el-cascader中的Props所有官方属性
          itemProp: {
            label: 'label',
            value: 'value',
            multiple: true
          }
        },
        {
          type: FormTypeEnum.checkbox,
          placeholder: '多选',
          required: false,
          disabled: false,
          prop: 'checkboxValue',
          label: '多选',
          // 下拉字典值列表
          itemList: CheckboxData,
          // 字典值列表中的key value名称
          itemProp: {
            label: 'label',
            value: 'value'
          }
        }
      ]
    }
  },
  methods: {
    onSubmit(formData) {
      console.log(this.queryForm)
      console.log(formData, '表单值')
    },
    onReset() {
      console.log('重置')
    }
  }
}
</script>

<style lang="less" scoped>
.base-form-container {
  padding: 10px;
}
</style>
