<template>
  <header class="layout-header">
    <h3 class="system-name">{{ systemName }}</h3>
    <!-- 右侧-->
    <div class="right-control">
      <!-- 从右往左的顺序写 -->
      <!-- 退出登录 -->
      <div class="icon exit" @click.stop="exitSystem"></div>
      <!-- 登录人名 -->
      <div>
        <el-dropdown trigger="click">
          <div class="icon user">
            <div class="username-wrapper">
              <span class="user-name">{{ userInfo.userName }}</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <el-dropdown-item @click.native="updatePwd">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- 修改密码弹窗 -->
    <el-dialog
      class="pwd-dialog"
      title="密码修改"
      :visible.sync="pwdDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @closed="closedDialog('pwdForm')"
    >
      <el-form ref="pwdForm" :model="pwdForm" :rules="pwdRules" label-width="120px">
        <el-form-item label="原密码：" prop="oldPwd">
          <el-input type="password" v-model.trim="pwdForm.oldPwd" maxlength="16" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPwd1">
          <el-input type="password" v-model.trim="pwdForm.newPwd1" maxlength="16" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码确认：" prop="newPwd2">
          <el-input type="password" v-model.trim="pwdForm.newPwd2" maxlength="16" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.stop="doUpdatePwd('pwdForm')">确认修改</el-button>
      </div>
    </el-dialog>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
import * as USERAPI from '@/api/user.js'
import { confirm } from '@/decorator/confirm'
import { loadFromSession } from '@/common/session-storage'
import { hex_md5 } from '@/common/md5.js'
import { saveToLocal } from '@/common/local-storage'
export default {
  props: {
    unreadNumber: {
      type: Number
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.pwdForm.newPwd2 !== '') {
          this.$refs.pwdForm.validateField('newPwd2')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.pwdForm.newPwd1) {
        callback(new Error('两次新密码输入不一致!'))
      } else {
        callback()
      }
    }
    return {
      systemName: process.env.VUE_APP_SYS_NAME,
      userInfo: { name: '非法登录' },
      // 修改密码弹窗是否显示
      pwdDialogVisible: false,
      pwdForm: {
        oldPwd: '',
        newPwd1: '',
        newPwd2: ''
      },
      pwdRules: {
        oldPwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        newPwd1: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        newPwd2: [
          { required: true, validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // 存用户信息
    this.userInfo = loadFromSession('userInfo', {})
  },
  methods: {
    ...mapActions({
      userLogout: 'user/logout'
    }),
    // 点击设置按钮
    handlerSetting() {
      console.log('setting')
    },
    // 点击修改密码
    updatePwd() {
      this.pwdDialogVisible = true
    },
    closedDialog(formName) {
      this.$refs[formName].resetFields()
    },
    // 点击确认修改
    doUpdatePwd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 打开进度条
          const loading = this.$loading({ lock: true })
          return new Promise((resove, reject) => {
            USERAPI.changePwd({
              newPwd1: hex_md5(this.pwdForm.newPwd1),
              newPwd2: hex_md5(this.pwdForm.newPwd2),
              oldPwd: hex_md5(this.pwdForm.oldPwd)
            })
              .then(data => {
                if (data && data.code === '000000') {
                  // 成功
                  this.$message({
                    message: '密码修改成功！',
                    type: 'success'
                  })
                  this.userLogout()
                    .then(list => {
                      this.$router.push({ name: 'login' })
                      // 记住密码false , 密码清空
                      saveToLocal('password', '')
                      saveToLocal('remember', false)

                      // 为了重新实例化vue-router对象 避免bug
                      // location.reload()
                    })
                    .catch(err => {
                      console.log('退出登录error: ', err)
                    })
                } else {
                  // 失败
                  this.$message({
                    message: data.msg,
                    type: 'error'
                  })
                }
                resove()
              })
              .catch(() => {
                // 失败
                this.$message({
                  message: '系统异常，请联系管理员',
                  type: 'error'
                })
                reject()
              })
              .finally(() => {
                loading.close()
              })
          })
        } else {
          return false
        }
      })
    },
    // 点击退出按钮
    @confirm('是否确定退出登录？')
    exitSystem() {
      const loading = this.$loading({ lock: true })
      this.$emit('cancelHealthCheck')
      this.userLogout()
        .then(list => {
          this.$router.push({ name: 'login' })
          // 为了重新实例化vue-router对象 避免bug
          // location.reload()
        })
        .catch(err => {
          console.log('退出登录error: ', err)
        })
        .finally(() => {
          loading.close()
        })
    }
  }
}
</script>

<style scoped lang="less">
.layout-header {
  width: 100%;
  height: 60px;
  background-image: url('~@/assets/images/layout/header-bg.png');
  background-repeat: no-repeat;
  background-size: auto 100%;
  .logo {
    height: 40px;
    cursor: pointer;
    vertical-align: middle;
  }
  .system-name {
    display: inline;
    font-weight: 400;
    font-size: 18px;
    margin-left: 10px;
    color: #ffffff !important;
    line-height: 30px;
  }
  .right-control {
    display: flex;
    flex-direction: row-reverse;
    box-sizing: border-box;
    float: right;
    height: 40px;
    width: 400px;
    padding-right: 30px;
    padding-top: 5px;
    .icon {
      height: 30px;
      line-height: 30px;
      background-repeat: no-repeat;
      background-position: left center;
      background-size: contain;
      cursor: pointer;
      margin: 0 10px;
      text-align: center;
      padding-left: 30px;
    }
    .user {
      background-image: url('~@/assets/images/layout/user-img.png');
      outline: none;
      .username-wrapper {
        color: #fff;
      }
    }
    .setting {
      background-image: url('~@/assets/images/layout/setting-img.png');
    }
    .exit {
      background-image: url('~@/assets/images/layout/exit-img.png');
    }
    .notifications {
      font-size: 22px;
      margin-top: 1px;
      color: #64ffff;
      padding-right: 10px;
    }
  }
  .pwd-dialog {
    /deep/ .el-dialog {
      width: 500px;
    }
  }
}
@media (min-width: 1640px) {
  .layout-header {
    background-size: 100% 100%;
  }
}
</style>
