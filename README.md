# smc-web-new

编辑器安装插件： `ESLint`、 `Prettier`、`Vetur`

# 启动、运行、打包相关命令

## Project setup

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

### Lints and fixes files

```
yarn lint
```

# 内置功能

- svg-icon（svg 图标）
- 菜单权限、按钮权限
- 装饰器（防抖，节流，confirm）
- 前端 mock

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

# 相关说明

1、关于系统参数(各种下拉框选项、省市区...)，在初始化的时候会初始化加载，在 `store/modules/allConfig` 中初始化的 `action` 中添加相关的接口调用，并配置好； 参数/下拉框选项 de 使用例子如下：

```
import { mapState } from 'vuex'
computed: {
  ...mapState({
    userTypeArr: state => state.allConfig.userTypeArr
  })
}
```

2、关于自定义的表单校验函数的说明

- 1、没必要每一个校验都单独写校验函数；
- 2、简单的校验直接写在rules里面；(比如说像校验是不是空这种，完全没必要单独写一个函数)
- 3、复杂的校验(有校验规则)，需要单独写函数的，就写在 src/common/validate.js 中


3、关于图标的说明：

- 项目内置 `svg-icon` 组件，使用方法参照： `@/views/login/index.vue#L22`
- 路由菜单的图标：在 `router` 中，每一个路由对象的 `meta/icon` 中配置，如果 `icon` 是以 `svg-` 开头的话，就加载 `svg` 图标；否则就默认使用 `Element-UI` 图标
