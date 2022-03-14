<template>
  <div class="menu-edit-container" v-loading="editLoadingProp">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级菜单">
            <treeselect
              v-model="form.parentId"
              :options="menuOptions"
              :normalizer="normalizer"
              :show-count="true"
              placeholder="选择上级菜单"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="form.menuType">
              <el-radio v-for="item of menuTypeEnumList" :label="item.codeVal" :key="item.codeVal">{{
                item.codeExplain
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="form.menuType != menuTypeEnum.F">
          <el-form-item label="菜单图标" prop="icon">
            <el-popover placement="bottom-start" width="460" trigger="click" @show="$refs['iconSelect'].reset()">
              <IconSelect ref="iconSelect" @selected="selected" />
              <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
                <svg-icon
                  v-if="form.icon"
                  slot="prefix"
                  :icon-class="form.icon"
                  class="el-input__icon"
                  style="height: 32px;width: 16px;"
                />
                <i v-else slot="prefix" class="el-icon-search el-input__icon" />
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单编号" prop="menuCode">
            <el-input v-model="form.menuCode" placeholder="请输入菜单编号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序" prop="orderNum">
            <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.menuType != menuTypeEnum.F">
          <el-form-item prop="path">
            <span slot="label">
              <el-tooltip
                content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头"
                placement="top"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
              路由地址
            </span>
            <el-input v-model="form.path" placeholder="请输入路由地址" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.menuType != menuTypeEnum.M && form.menuType != menuTypeEnum.C">
          <el-form-item>
            <el-input v-model="form.perms" placeholder="请输入权限标识" maxlength="100" />
            <span slot="label">
              <el-tooltip content="权限字符，如：'system:user:list'" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
              权限字符
            </span>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.menuType != menuTypeEnum.F">
          <el-form-item>
            <span slot="label">
              <el-tooltip content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
              显示状态
            </span>
            <el-radio-group v-model="form.visible">
              <el-radio v-for="dict in menuShowHideEnumList" :key="dict.codeVal" :label="dict.codeVal">{{
                dict.codeExplain
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.menuType != menuTypeEnum.F">
          <el-form-item>
            <span slot="label">
              <el-tooltip content="选择停用则路由将不会出现在侧边栏，也不能被访问" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
              菜单状态
            </span>
            <el-radio-group v-model="form.menuStatus">
              <el-radio v-for="dict in menuStatusList" :key="dict.codeVal" :label="dict.codeVal">{{
                dict.codeExplain
              }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
import {
  MenuShowHide,
  MenuShowHideEnumList,
  MenuStatus,
  MenuStatusList,
  MenuTypeEnum,
  MenuTypeEnumCodeList
} from '@/views/sysmng/menu/menu'
import IconSelect from '@/components/IconSelect/index.vue'
import Treeselect from '@riophae/vue-treeselect'
import * as MenuApi from '@/api/menu'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import * as Public from '@/common/public'

export default {
  name: 'menuAddOrEditDialog',
  components: {
    IconSelect,
    Treeselect
  },
  props: {
    // menuId有值的时候,需要查询菜单详情,进行数据回显
    menuIdProp: {
      type: String,
      default: () => {
        return null
      }
    },
    // parentId有值的时候,表示在指定菜单下新增
    parentIdProp: {
      type: String,
      default: () => {
        return null
      }
    },
    editLoadingProp: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      form: {
        // 上级菜单
        parentId: null,
        // 菜单类型
        menuType: null,
        // 路由地址
        path: null
      },
      // 表单校验
      rules: {
        menuName: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
        orderNum: [{ required: true, message: '菜单顺序不能为空', trigger: 'blur' }],
        path: [{ required: true, message: '路由地址不能为空', trigger: 'blur' }],
        menuCode: [{ required: true, message: '菜单编号不能为空', trigger: 'blur' }]
      },
      // 菜单类型枚举
      menuTypeEnum: MenuTypeEnum,
      // 菜单类型枚举值集合
      menuTypeEnumList: MenuTypeEnumCodeList,
      // 菜单显示状态
      menuShowHide: MenuShowHide,
      // 菜单显示状态枚举集合
      menuShowHideEnumList: MenuShowHideEnumList,
      // 菜单状态
      menuStatus: MenuStatus,
      // 菜单状态枚举集合
      menuStatusList: MenuStatusList,
      // 菜单树选项
      menuOptions: []
    }
  },
  async mounted() {
    this.initData()
    await this.getTreeselect()
    await this.getMenuInfo()
  },
  methods: {
    initData() {
      if (Public.isContent(this.menuIdProp)) {
        return false
      }
      this.$set(this.form, 'menuType', MenuTypeEnum.M)
      this.$set(this.form, 'menuStatus', MenuStatus.normal)
      this.$set(this.form, 'visible', MenuShowHide.show)
    },

    // 查询菜单详情
    getMenuInfo() {
      return new Promise((resolve, reject) => {
        if (!Public.isContent(this.menuIdProp)) {
          return resolve()
        }
        this.$emit('update:editLoadingProp', true)
        MenuApi.szkjSysMenuInfo({
          menuId: this.menuIdProp
        })
          .then(response => {
            let { data } = response
            this.$set(this.form, 'menuName', data.menuName)
            this.$set(this.form, 'menuType', data.menuType)
            this.$set(this.form, 'menuStatus', data.menuStatus)
            this.$set(this.form, 'visible', data.visible)
            this.$set(this.form, 'parentId', data.parentId)
            this.$set(this.form, 'orderNum', data.orderNum)
            this.$set(this.form, 'path', data.path)
            this.$set(this.form, 'icon', data.icon)
            this.$emit('update:editLoadingProp', false)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
          .finally(() => {})
      })
    },

    // icon图标选择
    selected(name) {
      this.$set(this.form, 'icon', name)
    },

    submitForm() {
      this.$emit('submitHandler', this.form)
    },

    cancel() {
      this.$emit('update:close', false)
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.menuId,
        label: node.menuName,
        children: node.children
      }
    },

    // 查询菜单下拉树结构
    getTreeselect() {
      return new Promise((resolve, reject) => {
        MenuApi.getMenuTreeApi()
          .then(response => {
            this.menuOptions = []
            const menu = { menuId: 1, menuName: '主类目', children: [] }
            menu.children = response.data
            this.menuOptions.push(menu)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.menu-edit-container {
}
</style>
