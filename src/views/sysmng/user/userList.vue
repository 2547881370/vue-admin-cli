<template>
  <div>
    <el-row>
      <el-col :span="22">
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-cascader
              ref="orgSelect"
              placeholder="请选择所属辖区"
              v-model="queryForm.deptIdsChecked"
              :options="deptTreeData"
              collapse-tags
              clearable
              :show-all-levels="false"
              :props="{
                expandTrigger: 'hover',
                checkStrictly: true,
                value: 'areaId',
                label: 'areaName'
              }"
              filterable
            >
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-select v-model="queryForm.status" placeholder="请选择用户状态" clearable>
              <el-option key="" label="全部" value="" />
              <el-option
                v-for="item of userStatusArr"
                :key="item.codeVal"
                :label="item.codeExplain1"
                :value="item.codeVal"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.keyQuery"
              placeholder="姓名/账号"
              maxlength="20"
              style="width: 300px;"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              v-permission="'sysmng-user-query-1'"
              icon="el-icon-search"
              type="primary"
              @click.stop="queryData(1)"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="2" class="hd-right">
        <el-button v-permission="'sysmng-user-add-1'" icon="el-icon-plus" type="primary" @click="addUserinformation">
          添加
        </el-button>
      </el-col>
    </el-row>

    <el-table :data="dataList" :element-loading-text="elementLoadingText">
      <el-table-column align="center" prop="userName" label="姓名" />
      <el-table-column align="center" prop="account" label="账号" />
      <el-table-column align="center" prop="userSexName" label="性别" />
      <el-table-column align="center" prop="areaName" label="所属辖区" />
      <el-table-column align="center" prop="userPhone" label="手机号" width="200" />
      <el-table-column align="center" prop="statusName" label="状态" />
      <el-table-column align="center" label="操作" width="200">
        <template #default="{ row }">
          <el-button
            v-permission="'sysmng-user-view-1'"
            type="text"
            style="color: #64FFFF;"
            @click="getInformation(row)"
          >
            查看
          </el-button>
          <el-button
            v-permission="'sysmng-user-edit-1'"
            type="text"
            style="color: #44C868"
            @click="setInformation(row)"
            v-if="row.userId !== sysCode.superUserId"
          >
            修改
          </el-button>
          <el-button
            v-permission="'sysmng-user-resetpwd-1'"
            v-if="row.userId !== sysCode.superUserId"
            type="text"
            style="color: #F0AB33"
            @click="resetPassword(row)"
          >
            重置密码
          </el-button>
          <el-button
            v-permission="'sysmng-user-delete-1'"
            v-if="row.status == 1 && row.userId !== sysCode.superUserId"
            type="text"
            style="color: #f56c6c"
            @click="cancellation(row)"
          >
            注销
          </el-button>
          <el-button
            v-permission="'sysmng-user-unlock-1'"
            v-else-if="row.status == 2 && row.userId !== sysCode.superUserId"
            type="text"
            style="color: #67c23a"
            @click="unlockUser(row)"
          >
            启用
          </el-button>
          <el-button
            v-permission="'sysmng-user-active-1'"
            v-else-if="row.userId !== sysCode.superUserId"
            type="text"
            style="color: #67c23a"
            @click="activateUser(row)"
          >
            激活
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paging">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { confirm } from '@/decorator/confirm'
import * as PublicTool from '@/common/public.js'
import * as COMMONAPI from '@/api/common.js'
import { getAreaByUserId } from '@/api/area'
import * as USERAPI from '@/api/user.js'
import { loadFromSession } from '@/common/session-storage'
import { sysCode } from '@/common/config.js'

export default {
  props: {
    setInfoData: {
      type: [Function],
      default: null
    },
    setTemplateName: {
      type: [Function],
      default: null
    }
  },
  computed: {
    ...mapState({
      userTypeArr: state => state.allConfig.userTypeArr,
      userStatusArr: state => state.allConfig.userStatusArr
    })
  },
  data() {
    return {
      sysCode,
      selectRows: '',
      elementLoadingText: '正在加载...',
      // 全部辖区部门/单位List
      deptTreeData: [],
      queryForm: {
        // 辖区 id
        deptIdsChecked: [],
        areaId: null,
        keyQuery: '',
        status: ''
      },
      dataList: [],
      // 分页
      currentPage: 1,
      pageSizes: [10, 30, 50, 80],
      pageSize: 10,
      total: 0
    }
  },
  created() {
    this.getAllDeptTree()
    this.queryData()
  },
  methods: {
    ...mapActions({
      userLogout: 'user/logout'
    }),
    // 获取辖区
    getAllDeptTree() {
      // 加载树状数据
      getAreaByUserId(loadFromSession('userInfo')?.userId ?? '').then(({ data }) => {
        // 没有数据
        if (!PublicTool.isContent(data)) {
          this.deptTreeData = []
        } else {
          // 有数据
          this.deptTreeData = PublicTool.formatTree2(data, 'areaId', 'pid', loadFromSession('userInfo')?.areaId)
        }
      })
    },
    // 查询用户列表
    queryData(val) {
      if (val) {
        this.currentPage = val
      }
      // 打开进度条
      const loading = this.$loading({ lock: true })
      this.queryForm.page = this.currentPage
      this.queryForm.limit = this.pageSize
      this.queryForm.areaId = this.queryForm.deptIdsChecked?.[this.queryForm.deptIdsChecked?.length - 1]
      let param = { ...this.queryForm }
      USERAPI.queryUser(param)
        .then(({ data }) => {
          // 没有数据
          if (!PublicTool.isContent(data.list)) {
            this.dataList = []
            this.total = 0
          } else {
            // 有数据
            this.dataList = data.list
            this.total = data.total
          }
        })
        .catch(() => {
          // 提示错误信息，或者不做处理
        })
        .finally(() => {
          loading.close()
        })
    },
    // 添加按钮
    addUserinformation() {
      this.setTemplateName({
        templateName: 'addUser'
      })
    },
    /* 点击查看个人信息按钮 */
    getInformation(item) {
      this.setInfoData({
        infoData: item
      })
      // this.information(item)
      this.setTemplateName({
        templateName: 'viewUser'
      })
    },
    /* 修改用户信息按钮 */
    setInformation(item) {
      this.setInfoData({
        infoData: item
      })
      this.setTemplateName({
        templateName: 'editUser'
      })
    },
    setSelectRows(val) {
      this.selectRows = val
    },
    // 分页大小改变
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.queryData()
    },
    // 翻页
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryData()
    },
    // 重置密码
    @confirm('确定要重置该账号的密码吗？', '提示', () => {})
    async resetPassword(item) {
      try {
        let { code, msg } = await USERAPI.resetPwd(item.userId)
        this.$message({
          type: code != '000000' ? 'warning' : 'success',
          message: code != '000000' ? msg : '重置成功!'
        })
        if (code == '000000') {
          // 当前登录用户信息
          let curUserInfo = loadFromSession('userInfo', {})
          if (curUserInfo.userId == item.userId) {
            this.userLogout()
              .then(list => {
                this.$router.push({ name: 'login' })
              })
              .catch(err => {
                console.log('退出登录error: ', err)
              })
            return
          }
          this.queryData()
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 激活用户
    @confirm('确定要激活该账号吗？')
    async activateUser(item) {
      try {
        let { code, msg } = await USERAPI.updateUserStatus({
          userId: item.userId,
          status: '1'
        })
        this.$message({
          type: code != '000000' ? 'warning' : 'success',
          message: code != '000000' ? msg : '激活成功！'
        })
        if (code == '000000') {
          this.queryData()
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 解锁
    @confirm('确定要解锁该账号吗？')
    async unlockUser(item) {
      try {
        let { code, msg } = await USERAPI.updateUserStatus({
          userId: item.userId,
          status: '1'
        })
        this.$message({
          type: code != '000000' ? 'warning' : 'success',
          message: code != '000000' ? msg : '解锁成功！'
        })
        if (code == '000000') {
          this.queryData()
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 注销
    @confirm('确定要注销该账号吗？')
    async cancellation(item) {
      try {
        let { code, msg } = await USERAPI.updateUserStatus({
          userId: item.userId,
          status: '3'
        })
        this.$message({
          type: code != '000000' ? 'warning' : 'success',
          message: code != '000000' ? msg : '注销成功!'
        })
        if (code == '000000') {
          // 当前登录用户信息
          let curUserInfo = loadFromSession('userInfo', {})
          if (curUserInfo.userId == item.userId) {
            this.userLogout()
              .then(list => {
                this.$router.push({ name: 'login' })
              })
              .catch(err => {
                console.log('退出登录error: ', err)
              })
            return
          }
          this.queryData()
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hd-right {
  display: flex;
  justify-content: flex-end;
}
.paging {
  margin-top: 25px;
  float: right;
}
</style>
