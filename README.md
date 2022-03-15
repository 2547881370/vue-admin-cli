# 启动、运行、打包相关命令
# Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

# 项目介绍
1、 包管理工具使用的是 `yarn`，当然你也可以使用 `npm`。

2、 全局使用了 `normalize.css` 做了一个样式初始化。

3、 `localStorage`、 `sessionStorage` 均有简单的封装：使用时，引入 `common` 中的 `local-storage.js` 或者 `session-storage.js` 中的方法。

- 避免使用 `window.localstorage` 或者 `window.sessionstorage` 的方法直接操作；

4、 `css` 预编译使用的是 `less`。

5、 -

6、 系统的名称在 `.env` 文件中配置/修改；

- 跟环境相关的配置/变量，定义在对应的环境变量配置文件中： `.env.development`、`.env.production`；
- 跟环境无关的系统配置/变量，定义在 `.env` 中；

7、 只显示一个 `tabview`。

8、 开发环境使用 `Mock` 数据；[mockjs 文档](https://github.com/nuysoft/Mock/wiki)

9、 国际化

# 相关说明
1、关于自定义的表单校验函数的说明

- 1、没必要每一个校验都单独写校验函数；
- 2、简单的校验直接写在rules里面；(比如说像校验是不是空这种，完全没必要单独写一个函数)
- 3、复杂的校验(有校验规则)，需要单独写函数的，就写在 src/common/utils/validate.js 中



+ 基础功能
  + 登录页面
  + 404页面
  + 路由权限
  + 按钮权限
  + mock
  + i18n
  + icon组件
  + baseForm组件
  + baseTable组件


+ 目录结构
  + assets [存放静态资源]
  + common
    + api [接口]
    + enum [全局枚举]
    + plugins [全局插件]
    + service [axios二次封装]
    + mixins [全局mixins]
    + utils [工具]
      + auth [设置和读取token公共方法]
      + bus [跨组件bus]
      + get-page-title [获取拼接页面title方法]
      + local-storage [localStorage增删改查公共方法]
      + md5 [md5加密]
      + session-storage [sessionStorage增删改查公共方法]
      + utils [工具类方法,包括日期的转换,tree的转换,国际化的获取等....]
      + validate [正则校验,以及elementForm表单的自定义校验规则]
  + config
    + setting.config [通用配置]
  + i18n [国际化]
  + layout
  + icons
  + router
  + store
  + views

+ 在使用本脚手架时,需要注意,当前脚手架已经接入了两个业务模块,如下
  + 登录页面
    + 注意 : 如果实际需求与当前页面的逻辑不符合,可自行重写;这里的登录主要做了把用户信息和token存储到了vuex和sessionStorage中
  + 路由权限,按钮权限
    + 重点关注mock的数据结构和字段, 建议接入后端接口时,双方约定结构和字段时,尽量与现在的mock的数据结构一致;
      ```js
          {
              menuId: string,
              menuName: string,
              parentId: string,
              orderNum: number,//菜单排序
              path : "/demo",//路径,
              menuType : "",// 1目录 2菜单 3按钮
              visible : 0, // 显示状态（0显示 1隐藏）
              menuStatus : 0,//菜单状态（0正常 1停用）
              icon : "",
              perms: string, // 权限标识,menuType为3的时候,必填
              children : [
                      {

                      }
              ]
          }
      ```
  + baseForm组件的使用demo
    ```js
    <template>
        <base-form inline :options="formOptions" @submit="onSubmit" @reset="onReset" v-model="queryForm"> </base-form>
    </template>

    {
        const MenuStatusList =[
            {
                codeExplain: '正常',
                codeVal: 1
            },
            {
                codeExplain: '停用',
                codeVal: 2
            }
        ]
        import BaseForm from '@/components/base-form/base-form.vue'
        import { FormTypeEnum } from '@/components/base-form/enums/base-form-enum'
        components: {
            BaseForm,
        },
        data(){
            return {
                queryForm:{},
                formOptions: [
                    {
                        // 控件类型
                        type: FormTypeEnum.text,
                        // 控件提示
                        placeholder: '请输入菜单名称',
                        // 是否必填
                        required: false,
                        // 是否禁用
                        disabled: false,
                        // 字段值name
                        prop: 'menuName'
                    },
                    {
                        type: FormTypeEnum.selector,
                        placeholder: '状态',
                        required: false,
                        disabled: false,
                        prop: 'menuType',
                        // 是否多选
                        multi: false,
                        // 下拉字典值列表
                        itemList: MenuStatusList,
                        // 下来字典值列表中的key value名称
                        itemProp: {
                            label: 'codeExplain',
                            value: 'codeVal'
                        }
                    }
                ]
            }
        },
        methods : {
            onSubmit(formData){
                console.log(formData,"表单值")
            },
            onReset(){
                console.log("重置")
            }
        }
    }
    ```
  + baseTable组件的使用demo
    ```js
    <template>
        <base-table
          :data="tableData"
          :loading="loading"
          rowKey="menuId"
          :option="tableOptions"
        >
          <template slot="table-slot-icon" slot-scope="scope">
            <svg-icon :icon-class="scope.row.icon" style="height: 30px;width: 16px;" />
          </template>
          <template slot="table-slot-menuStatus" slot-scope="scope">
            <el-tag type="primary" disable-transitions>{{ scope.row.menuStatus }}</el-tag>
          </template>
          <template slot="table-slot-option" slot-scope="scope">
            <el-button size="mini" @click="handleMenuEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" @click="handleMenuAddRow(scope.$index, scope.row)">新增</el-button>
            <el-button
              size="mini"
              :loading="scope.row.loading"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            ></template
          >
        </base-table>
    </template>

    import BaseTable from '@/components/base-table/base-table.vue'
    import { AlignEnum, ColumnTypeEnum } from '@/components/base-table/enums/base-table-enum'

    {
        components: {
            BaseTable
        },
        data(){
            tableData: [
                {
                    menuName : "demo1",
                    icon : "iconName",
                    orderNum : 1,
                    menuStatus : 1,
                }
            ],
            loading: false,
            // table配置
            tableOptions: {
                treeProps: { children: 'children' },
                column: [
                    {
                        // 列表类型
                        type: ColumnTypeEnum.text,
                        // 字段名称
                        prop: 'menuName',
                        // 对齐方式
                        align: AlignEnum.center,
                        label: '菜单名称',
                        width: 180
                    },
                    {
                        // 列表类型,如果类型为slot时,插槽的名称为 [table-slot-] + 当前列表的prop,例如上面的table-slot-icon
                        type: ColumnTypeEnum.slot,
                        // 字段名称
                        prop: 'icon',
                        // 对齐方式
                        align: AlignEnum.center,
                        label: '图标',
                        width: 100
                    },
                    {
                        // 列表类型
                        type: ColumnTypeEnum.text,
                        // 字段名称
                        prop: 'orderNum',
                        // 对齐方式
                        align: AlignEnum.center,
                        label: '排序',
                        width: 100
                    },
                    {
                        // 列表类型
                        type: ColumnTypeEnum.slot,
                        // 字段名称
                        prop: 'menuStatus',
                        // 对齐方式
                        align: AlignEnum.center,
                        label: '状态',
                        width: 100
                    },
                    {
                        // 列表类型
                        type: ColumnTypeEnum.slot,
                        // 字段名称
                        prop: 'option',
                        // 对齐方式
                        align: AlignEnum.center,
                        label: '操作'
                    }
                ]
        }
    }
    ```
  + 国际化使用demo
    ```js
        import Utils from '@/common/utils/utils.js'

        console.log(Utils.translate('login.password'))
    ```
  + icon组件使用demo
    ```js
        <svg-icon icon-class="icon名称" />
    ```
  + 按钮权限使用demo
    ```js
        <el-button
              v-permission="'sysmng-user-query-1'"
            >
              查询
        </el-button>
    ```
