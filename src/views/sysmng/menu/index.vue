<template>
  <div class="menu-container">
    <el-container>
      <el-header>
        <el-form :inline="true" :model="queryForm" ref="menuForm">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="menuStatus">
            <el-select v-model="queryForm.menuStatus" placeholder="状态">
              <el-option
                v-for="item of menuStatusList"
                :label="item.codeExplain"
                :value="item.codeVal"
                :key="item.codeVal"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="primary" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <div class="menu-button">
          <el-row :gutter="10">
            <el-col :span="1.5">
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleMenuAdd">新增</el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button type="primary" icon="el-icon-sort" size="mini" @click="handleOpenOrClose">展开/折叠</el-button>
            </el-col>
          </el-row>
        </div>

        <el-table
          ref="menuTableRef"
          :data="tableData"
          row-key="menuId"
          :tree-props="{ children: 'children' }"
          v-if="refreshTable"
          :default-expand-all="isExpandAll"
          v-loading="loading"
        >
          <el-table-column prop="menuName" label="菜单名称" width="180"> </el-table-column>
          <el-table-column prop="icon" label="图标" width="100"> </el-table-column>
          <el-table-column prop="orderNum" label="排序" width="100"> </el-table-column>
          <el-table-column prop="menuStatus" label="状态">
            <template slot-scope="scope">
              <el-tag type="primary" disable-transitions>{{ getMenuStatusName(scope.row.menuStatus) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleMenuEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" @click="handleMenuAddRow(scope.$index, scope.row)">新增</el-button>
              <el-button
                size="mini"
                :loading="scope.row.loading"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-dialog :title="title" :visible.sync="open" :destroy-on-close="true" width="680px" append-to-body>
      <MenuAddOrEditDialog
        v-if="open"
        :menuIdProp="menuIdProp"
        :parentIdProp="parentIdProp"
        :close.sync="open"
        @submitHandler="onSubmitForm"
        :editLoadingProp.sync="editLoadingProp"
      ></MenuAddOrEditDialog>
    </el-dialog>
  </div>
</template>

<script>
import { MenuComponentHandleStatus, MenuStatusList } from '@/views/sysmng/menu/menu'
import * as MenuApi from '@/api/menu.js'
import MenuAddOrEditDialog from '@/views/sysmng/menu/component/MenuAddOrEditDialog.vue'
import { confirm } from '@/decorator/confirm'
import { szkjSysMenuDelete } from '@/api/menu.js'
import * as Public from '@/common/public'

export default {
  name: 'sysmngMenu',
  components: {
    MenuAddOrEditDialog
  },
  data() {
    return {
      queryForm: {
        menuName: null,
        menuStatus: null
      },
      tableData: [],
      // 新增或修改菜单组件状态 : 新增, 修改
      menuAddOrUpDateComponentStatusProps: null,
      // 菜单状态枚举值
      menuStatusList: MenuStatusList,
      // 是否展开，默认全部折叠
      isExpandAll: false,
      // 重新渲染表格状态
      refreshTable: true,
      loading: false,
      // 弹框层图标
      title: '',
      // 是否显示弹出层
      open: false,
      // 菜单弹框组件状态 新增,修改,在某个已有的菜单下新增
      menuAddOrEditDialogStatus: null,
      // 修改菜单id
      menuIdProp: null,
      // 某个菜单下新增菜单,需要附带当前菜单的parentId
      parentIdProp: null,
      // 新增修改loading
      editLoadingProp: false,
      // 删除loading
      menuDeleteLoadingData: {}
    }
  },
  created() {
    this.onSubmit()
  },
  methods: {
    // 菜单状态翻译
    getMenuStatusName(value) {
      let findItem = MenuStatusList.find(item => {
        return item['codeVal'] === value
      })

      if (!Public.isContent(findItem)) {
        return ''
      }
      return findItem.codeExplain
    },

    // 菜单状态颜色
    getMenuStatusColor(value) {},

    // 搜索
    onSubmit() {
      this.getMenuTree()
    },

    // 重置
    onReset() {
      this.$refs['menuForm'].resetFields()
      this.onSubmit()
    },

    // 设置新增/修改菜单弹框组件prop
    setProp({ menuIdProp = null, parentIdProp = null } = {}) {
      this.menuIdProp = menuIdProp
      this.parentIdProp = parentIdProp
    },

    // 新增菜单
    handleMenuAdd() {
      this.setProp()
      this.setTitle('添加菜单')
      this.menuAddOrEditDialogStatus = MenuComponentHandleStatus.add
      this.$nextTick(() => {
        this.open = true
      })
    },

    setTitle(title) {
      this.title = title
    },

    // 展开/折叠
    handleOpenOrClose() {
      this.refreshTable = false
      this.isExpandAll = !this.isExpandAll
      this.$nextTick(() => {
        this.refreshTable = true
      })
    },

    // 修改菜单
    handleMenuEdit(index, row) {
      console.log(index, row)
      this.setProp({ menuIdProp: row.menuId })
      this.setTitle('修改菜单')
      this.menuAddOrEditDialogStatus = MenuComponentHandleStatus.update
      this.$nextTick(() => {
        this.open = true
      })
    },

    // 新增菜单
    handleMenuAddRow(index, row) {
      console.log(index, row)
      this.setProp({ menuIdProp: null, parentIdProp: row.parentId })
      this.setTitle('添加菜单')
      this.menuAddOrEditDialogStatus = MenuComponentHandleStatus.push
      this.$nextTick(() => {
        this.open = true
      })
    },

    // 删除菜单
    @confirm('是否确定删除')
    handleDelete(index, row) {
      row.loading = true
      console.log(index, row)
      MenuApi.szkjSysMenuDelete(row.menuId)
        .then(res => {
          this.onSubmit()
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          row.loading = false
        })
    },

    // 获取菜单列表
    getMenuTree() {
      this.loading = true
      return new Promise((resolve, reject) => {
        MenuApi.getMenuTreeApi(this.queryForm)
          .then(response => {
            let { data } = response
            Public.forEachTreeAddData({
              data: data,
              newData: {
                loading: false
              }
            })
            this.tableData = data
          })
          .catch(e => {
            reject(e)
          })
          .finally(() => {
            this.loading = false
            resolve()
          })
      })
    },

    // 新增/修改提交按钮
    onSubmitForm(form) {
      switch (this.menuAddOrEditDialogStatus) {
        case MenuComponentHandleStatus.add:
          form.isDeleted = 0
          break
        case MenuComponentHandleStatus.update:
          form.menuId = this.menuIdProp
          break
        case MenuComponentHandleStatus.push:
          form.isDeleted = 0
          break
      }

      this.editLoadingProp = true
      MenuApi.saveOrUpdateMenu(form)
        .then(response => {
          this.open = false
          this.$message({
            type: 'success',
            message: response.msg
          })
          this.onSubmit()
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.editLoadingProp = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.menu-container {
  width: 100%;
  height: 100%;

  /deep/ .el-header {
    padding: 0px 20px;
    box-sizing: border-box;
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  /deep/ .el-main {
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
    box-sizing: border-box;
    padding: 0px 16px;
  }

  .menu-button {
    padding-bottom: 10px;
  }

  /deep/ .el-table__expand-icon {
    position: relative;
    cursor: pointer;
    color: #64ffff;
    transition: transform 0.2s ease-in-out;
    height: 20px;
  }
}
</style>
